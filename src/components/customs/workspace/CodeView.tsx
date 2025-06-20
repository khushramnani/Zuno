import React, { useContext, useEffect, useState } from 'react'
import { Sandpack } from "@codesandbox/sandpack-react";
import { SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole
  } from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessageContext } from '@/context/MessageContext';
import { Prompt } from '@/data/prompt';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { updateFileData } from '../../../../convex/workspace';
import { Id } from '../../../../convex/_generated/dataModel';
import { Loader, Loader2, Loader2Icon } from 'lucide-react';

const CodeView = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const {messages, setMessages} = useContext<any>(MessageContext)
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const convex = useConvex();
  const UpdateFiles=useMutation(api.workspace.updateFileData)
  const [dynamicDeps, setDynamicDeps] = useState({});

    useEffect(()=>{
    if(messages?.length > 0){
       const role= messages[messages.length-1].role;
        if(role === 'user'){
          GenerateAiCode()
        }
    }
  },[messages])

    const GetFiles=async()=>{
    setLoading(true)
    const result= await convex.query(api.workspace.getWorkSpace,{
      workspaceId:id as any
    })
    const mergeFiles= {...result?.filedata}
    setFiles(mergeFiles)
    setLoading(false)
  }

  useEffect(() => {
    if (!id) return;
    GetFiles();
  }, [id]);

  const GenerateAiCode = async()=>{
    setActiveTab('code');
    setLoading(true);
    const prompt = JSON.stringify(messages)+" "+Prompt.CODE_GEN_PROMPT
    const result = await axios.post('/api/gen-ai-code', {
      prompt: prompt
    })
    console.log("Generated code result:", result.data);
    const aiResp = result.data;

    const mergedFiles = {...files, ...aiResp?.files};
    setFiles(mergedFiles);

    // Set dynamic dependencies if present
    const aiDeps = aiResp?.dependencies || {};
    setDynamicDeps(aiDeps);

    await UpdateFiles({
      workspaceId: id as Id<'workSpaces'>,
      filedata: mergedFiles 
    })
    setLoading(false);

  }
  
  return (
    <div className='w-full h-full flex flex-col relative'>
      <div className='flex justify-start items-center rounded-t-sm p-2 bg-[#181818] gap-2 text-white'>
        <div className='bg-black  rounded-full text-sm flex gap-2 '>
        <button className={`py-1 px-4 rounded-l-full rounded-r-md ${activeTab === 'code' ? 'border bg-gray-900 ' : ''}`} onClick={() => setActiveTab('code')}>Code</button>
        <button className={`py-1 px-3 rounded-r-full rounded-l-md ${activeTab === 'preview' ? 'border bg-gray-900 ' : ''}`} onClick={() => setActiveTab('preview')}>Preview</button>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={'dark'}
        files={files}
        options={{
          externalResources:['https://unpkg.com/@tailwindcss/browser@4']
        }}
        customSetup={{
          dependencies:{
            ...Lookup.DEPENDENCY,
            ...dynamicDeps
          }
        }}
        
      >
        <SandpackLayout>
          {activeTab=='code'&& <>

      <SandpackFileExplorer style={{height:'80vh'}} initialCollapsedFolder={["components/","/public/"]} />
      <SandpackCodeEditor showInlineErrors={true} style={{height:'80vh'}}/>
      </>}

          {activeTab=='preview'&& <>
            <SandpackPreview style={{height:'80vh'}} showNavigator={true}/>
          </>}
        </SandpackLayout>
        
      </SandpackProvider>
            { loading&& <div className='p-10 bg-gray-950 opacity-80 gap-1 absolute  rounded-lg w-full h-full flex items-center justify-center'>
    <Loader className={`animate-spin  h-10 w-10 text-white `}/>
    <h2 className='text-white font-semibold text-xl'>Generating code...</h2>
  </div>}
      
    </div>
  )
}

export default CodeView
