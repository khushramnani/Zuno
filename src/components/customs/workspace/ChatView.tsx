'use client';
import { MessageContext } from '@/context/MessageContext';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Link, Loader } from 'lucide-react';
import axios from 'axios';
import { Prompt } from '@/data/prompt';
import { Id } from '../../../../convex/_generated/dataModel';


// interface Message {
//   role: 'user' | 'ai';
//   content: string;
// }

export const countToken=(inputtext : string)=>{
  return inputtext.trim().split(/\s+/).filter((word) => word !== '').length;
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
  const [isLoading, setIsLoading] = useState(false);
  const convex = useConvex();
  const UpdateMessages = useMutation(api.workspace.updateMessages);
  const UpdateToken = useMutation(api.users.updadteUserToken);
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
    console.log(session?.user);
    
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
    setIsLoading(true);
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

    const token = Number(session?.user.token) - Number(countToken(JSON.stringify(aiResponse)))
    await UpdateToken({
      userId: session?.user?._id as Id<'users'>,
      token: token
    });
    
    setLoading(false)
    setIsLoading(false);
  }

  const onGenerate = (input: any) => {
    if (!input.trim()) {
      console.log('Input is empty, please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
    setIsLoading(false);
  };

  return (
    <div className='relative h-[85vh] flex flex-col scrollbar-hide'>
      <div className='flex-1 overflow-y-auto rounded-lg shadow-md scrollbar-hide'>
        {Array.isArray(messages) && messages?.map((msg: any, index: number) => {
        return (
            <div key={index} className={`rounded-lg m-2 flex gap-5 items-start justify-end scrollbar-hide`}>
            
            {loading && index === messages.length - 1 && msg.role === 'user' ? (
              // Show skeleton for AI response after user message
              <div className="flex flex-col gap-2 w-full">
              <span
                className="bg-violet-900 text-white px-2 py-2 pl-3 rounded-tl-2xl rounded-l-2xl rounded-tr-2xl max-w-[90%] self-start break-words"
                style={{ alignSelf: 'flex-end', display: 'inline-block' }}
              >
                {msg.content}
              </span>
              <div className="flex gap-2 items-center mt-2">
                <div className="flex-1">
                <div className="shadcn-skeleton h-4 w-3/4 mb-2 rounded bg-gray-600 animate-pulse" />
                <div className="shadcn-skeleton h-4 w-1/2 rounded bg-gray-600 animate-pulse" />
                </div>
              </div>
              </div>
            ) : msg.role === 'user' ? (
              <span
              className="bg-violet-900 text-white px-2 py-2 pl-3 rounded-tl-2xl rounded-l-2xl rounded-tr-2xl max-w-[90%] self-start break-words"
              style={{ alignSelf: 'flex-end', display: 'inline-block' }}
              >
              {msg.content}
              </span>
            ) : (
              <span
              className="bg-gray-700 text-white rounded-tr-2xl rounded-r-2xl rounded-tl-2xl px-4 py-2 w-full break-words"
              style={{ alignSelf: 'flex-start', display: 'block' }}
              >
              {msg.content}
              </span>
            )}
            </div>

        );
      })}
      {/* {loading && <div className='text-center text-gray-400'>Fetching AI response...</div>} */}
    </div>
    <div className='flex gap-2 relative'>
      <Textarea
      id='thinkpad-textarea'
      name='thinkpad-textarea'
      className='w-[48rem] mt-2 bg-gray-800 h-24 max-h-52 border-none resize-none text-white placeholder:text-gray-400 pr-12 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none'
      placeholder='Type your thoughts here...'
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (userInput.trim()) {
          setIsLoading(true);
          onGenerate(userInput);
          setUserInput('');
        }
        }
      }}
      />
      {isLoading ? (
      <div className="absolute right-2 top-2 bg-indigo-500 p-2 rounded-md">
  <Loader className="text-white w-4 h-4 animate-spin" />
</div>
      ) : (
      <ArrowRight
        onClick={() => {
        if (userInput.trim()) {
          setIsLoading(true);
          onGenerate(userInput);
          setUserInput('');
        }
        }}
        className='absolute right-2 top-2 text-white w-8 bg-indigo-500 p-2 h-8 rounded-md cursor-pointer'
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