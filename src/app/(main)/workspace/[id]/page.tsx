"use client"

import Header from "@/components/customs/header"
import ChatView from "@/components/customs/workspace/ChatView";
import CodeView from "@/components/customs/workspace/CodeView";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Page = () => {
    const [, setIsLoginDialogOpen] = useState(false);
    const isMobile = useIsMobile();
    if (isMobile) {
      return (
        <>
          <Header setIsLoginDialogOpen={setIsLoginDialogOpen}/>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center p-8 bg-black rounded shadow">
              <h1 className="text-2xl font-bold mb-4">Please open this page on a desktop device</h1>
              <p>This feature is only available on desktop screens.</p>
            </div>
          </div>
        </>
      );
    }
  
  return (
    // <SidebarProvider defaultOpen={false}>
      <div className="h-screen">
        <Header setIsLoginDialogOpen={setIsLoginDialogOpen}/>
        <div className="grid grid-cols-4 gap-1">
          <div className="pl-4 py-4 pr-1 rounded shadow h-full">
            {/* <HistorySidebar/> */}
            <ChatView/>
          </div>
          <div className="col-span-3 p-4 rounded shadow">
            <CodeView/>
          </div>
        </div>
      </div>
    // </SidebarProvider>
  )
}

export default Page
