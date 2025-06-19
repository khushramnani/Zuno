import React, { useState } from 'react'
import { Sandpack } from "@codesandbox/sandpack-react";
import { SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole
  } from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
const CodeView = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  
  return (
    <div className='w-full h-full flex flex-col'>
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
         externalResources: [
            'https://unpkg.com/react@18/umd/react.production.min.js',
            'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
            'https://unpkg.com/prop-types@15/prop-types.min.js',
          ]

        }}  
      >
        <SandpackLayout>
          {activeTab=='code'&& <>

      <SandpackFileExplorer style={{height:'80vh'}} initialCollapsedFolder={["components/","/public/"]} />
      <SandpackCodeEditor  style={{height:'80vh'}}/>
      </>}

          {activeTab=='preview'&& <>
            <SandpackPreview style={{height:'80vh'}} showNavigator={true}/>
          </>}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

export default CodeView
