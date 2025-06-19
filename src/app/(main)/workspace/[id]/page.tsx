"use client"

import Header from "@/components/customs/header"
import ChatView from "@/components/customs/workspace/ChatView";
import CodeView from "@/components/customs/workspace/CodeView";
import { useState } from "react";

const Page = () => {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
<>
<div className="h-screen">
    <Header setIsLoginDialogOpen={setIsLoginDialogOpen}/>

    <div className="grid grid-cols-4 gap-2">
        <div className=" p-4  rounded shadow h-full">
            <ChatView/>
        </div>

        <div className=" col-span-3 p-1 rounded shadow">
           <CodeView/>
        </div>

        
    </div>
</div>
    
</>
  )
}

export default Page
