import React, { useContext, useEffect, useState } from 'react'

import { SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  
  } from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessageContext } from '@/context/MessageContext';
import { Prompt } from '@/data/prompt';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { CloudDownload, ExternalLink, Loader, TrendingUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { countToken } from './ChatView';
import JSZip from 'jszip';
// import SandPackPreviewClient from './SandPackPreviewClient';

const CodeView = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const {messages, setMessages} = useContext<any>(MessageContext)
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const {data: session} = useSession();
  const UpdateToken = useMutation(api.users.updadteUserToken);

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

    const token = Number(session?.user.token) - Number(countToken(JSON.stringify(aiResp)))
    await UpdateToken({
      userId: session?.user?._id as Id<'users'>,
      token: token
    });
    setLoading(false);

  }

  const handleExport = async () => {
    const zip = new JSZip();
    Object.entries(files).forEach(([filename, filedata]) => {
      zip.file(filename.replace(/^\//, ''), filedata.code || '');
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.zip';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [deploying, setDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');

  const handleDeploy = async (isShareButtonClicked: boolean) => {
    setDeploying(true);
    setDeployUrl('');
    const filesForApi: { [key: string]: { content: string } } = {};
    Object.entries(files).forEach(([filename, filedata]) => {
      filesForApi[filename.replace(/^\//, '')] = { content: filedata.code || '' };
    });
    const parameters = {
      files: filesForApi,
    };
    const apiUrl = 'https://codesandbox.io/api/v1/sandboxes/define?json=1';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parameters),
      });
      // const response = await axios.post(apiUrl, parameters, {
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // console.log(response);
      
      const data = await response.json();
      console.log("Deploy response data:", data);
      
      if (data.sandbox_id) {
        setDeployUrl(`https://https://codesandbox.io/embed/${data.sandbox_id}`);
        if (isShareButtonClicked) {
          // window.open(`https://${data.sandbox_id}.csb.app/`, '_blank');
          window.open(`https://codesandbox.io/p/sandbox/${data.sandbox_id}`, '_blank');
        }
      } else {
        alert('Failed to deploy.');
      }
    } catch (e) {
      alert('Error deploying: ' + (e as any).message);
    }
    setDeploying(false);
  };

  return (
    <div className='w-full h-full flex flex-col relative '>
      <div className='flex justify-between items-center rounded-t-sm p-2 bg-[#181818] gap-2 text-white'>
        

          <div className='bg-black  rounded-full text-sm flex gap-2 '>
          <button className={`py-1 px-4 rounded-l-full rounded-r-md ${activeTab === 'code' ? 'border bg-gray-900 ' : ''}`} onClick={() => setActiveTab('code')}>Code</button>
          <button className={`py-1 px-3 rounded-r-full rounded-l-md ${activeTab === 'preview' ? 'border bg-gray-900 ' : ''}`} onClick={() => setActiveTab('preview')}>Preview</button>
          </div>

          <div className='flex gap-2 items-center'>
<button onClick={handleExport} className='px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center gap-2'><CloudDownload className='h-4 w-4'/>Export</button>
          {deployUrl ? (
            <button
              onClick={() => handleDeploy(true)}
              className='px-4 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-md flex items-center gap-2'
              disabled={deploying}
            >
              {deploying ? 'Deploying...' : 'Share'}
              <ExternalLink className='h-4 w-4' />
            </button>
          ) : (
            <button
              onClick={() => handleDeploy(false)}
              className='px-4 py-1 bg-green-600 hover:bg-green-500 text-white rounded-md flex items-center gap-2'
              disabled={deploying}
            >
              {deploying ? 'Deploying...' : 'Deploy'}
              <TrendingUp className='h-4 w-4' />
            </button>
          )}
          </div>
          
        
      </div>
      <SandpackProvider
        template="react"
        theme={'dark'}
        files={files}
        autoSave='true'
        autoCorrect='true'
        options={{
          externalResources:['https://unpkg.com/@tailwindcss/browser@4' , 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css'],
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
      <SandpackCodeEditor  showTabs={false} className='scrollbar-hide' showInlineErrors={true} style={{height:'80vh'}}/>
      </>}

          {activeTab=='preview'&& <>
            {/* <SandPackPreviewClient/> */}
            <SandpackPreview style={{height:'80vh'}} showNavigator={true} />
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
