"use client"

import Header from "@/components/customs/header"
import ChatView from "@/components/customs/workspace/ChatView";
import CodeView from "@/components/customs/workspace/CodeView";
import { useState } from "react";
import { SidebarProvider } from '@/components/ui/sidebar'
import HistorySidebar from '@/components/customs/HistorySidebar'

const Page = () => {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  console.log(process.env.NEXT_PUBLIC_MAX_TOKENS);
  
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
