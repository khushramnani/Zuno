'use client';
import { MessageContext } from '@/context/MessageContext';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Link } from 'lucide-react';
import axios from 'axios';
import { Prompt } from '@/data/prompt';
import { Id } from '../../../../convex/_generated/dataModel';
import Image from 'next/image';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const ChatView = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('ChatView must be used within a MessageProvider');
  }
  const { messages, setMessages } = context;
  const { data: session, status } = useSession();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const UpdateMessages = useMutation(api.workspace.updateMessages);
  const router = useRouter();
  const { id } = useParams();

  console.log('ChatView session:', session); // Debug session
  console.log('ChatView workspace id:', id); // Debug id

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user?._id) {
      console.warn('No session or user ID, redirecting to /Thinkpad');
      router.push('/Thinkpad');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (!session || !session.user?._id || !id) return;
    GetWorkspaceData();
  }, [session, id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.getWorkSpace, {
        workspaceId: id as any,
      });
      // console.log("Workspace data:", result);
      setMessages(result?.messages || []);
      console.log("Messages set:", messages);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(()=>{
    if(messages.length > 0){
       const role= messages[messages.length-1].role;
        if(role === 'user'){
          GetAiResponse()
        }
    }
  },[messages])
  const GetAiResponse= async ()=>{
    setLoading(true)
    const PROMPT= JSON.stringify(messages)+ Prompt.aiChat
    const result = await axios.post('/api/ai-chat',{
       prompt:PROMPT
    })
    const aiResponse={role:'ai',content:result.data.result}
    setMessages((prev: any )=>[...prev,aiResponse]);
    // console.log("ai:",result.data.result)
    await UpdateMessages({
      messages: [...messages,aiResponse],
      workspaceId:id as any
    })
    setLoading(false)
  }

  const onGenerate = (input: any) => {
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className='relative h-[85vh] flex flex-col scrollbar-hide'>
      <div className='flex-1 overflow-y-auto rounded-lg shadow-md scrolbar-hide'>
        {Array.isArray(messages) && messages?.map((msg: any, index: number) => {
        return (
          <div key={index} className={` rounded-lg m-2 flex gap-5 items-start justify-end `}>
            {/* {msg.role === 'user' && (
              <Image
              src={session?.user.image ? session.user.image : ""}
              alt='User'
              width={35}
              height={35}
              className='rounded-full'
              />
            )} */}
            {msg.role === 'user' ? (
              <span
                className=" bg-violet-900  text-white px-2 py-2 pl-3 rounded-tl-2xl rounded-l-2xl rounded-tr-2xl max-w-[90%] self-start break-words"
                style={{ alignSelf: 'flex-end', display: 'inline-block' }}
              >
                {msg.content}
              </span>
            ) : (
              <span
                className=" bg-gray-700 text-white rounded-tr-2xl rounded-r-2xl rounded-tl-2xl px-4 py-2   w-full break-words"
                style={{ alignSelf: 'flex-start', display: 'block' }}
              >
                {msg.content}
              </span>
            )}

          </div>

        );
      })}
      {loading && <div className='text-center text-gray-400'>Fetching AI response...</div>}
    </div>
    <div className='flex gap-2 relative'>
      <Textarea
        id='thinkpad-textarea'
        name='thinkpad-textarea'
        className='w-[48rem] bg-gray-800 h-24 max-h-52 border-none resize-none outline-none text-white placeholder:text-gray-400 pr-12'
        placeholder='Type your thoughts here...'
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        />
        {userInput && (
          <ArrowRight
            onClick={() => onGenerate(userInput)}
            className='absolute right-2 top-2 text-white w-8 bg-indigo-500 p-2 h-8 rounded-md'
          />
        )}
        <div className='absolute left-2 bottom-2 mt-2'>
          <Link className='text-white w-8 p-2 h-8 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default ChatView;