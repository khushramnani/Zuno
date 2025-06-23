'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { ChevronLeft, MessageCircleCode } from 'lucide-react'
import History from './workspace/History'
import Link from 'next/link'
import { useConvex } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useSession } from 'next-auth/react'
import { Id } from '../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import TokenBar from './TokenBar'
const HistorySidebar = () => {
    const convex = useConvex();
    const {data: session} = useSession();
    const router = useRouter();
    // const {toggleSidebar} = useSidebar();
    const createNewChat = async () => {
        const response = await convex.mutation(api.workspace.createWorkSpace,{
            messages: [],
            filedata: {},
            user: session?.user?._id as Id<'users'>
        })

        console.log("New workspace created:", response);
        if (response) {
            router.push(`/workspace/${response}`);
        } else {
            console.error("Failed to create new workspace");
        }
    }
  return (
    <Sidebar collapsible='offcanvas'>
      <SidebarHeader>
        <div className='flex items-center justify-between p-2 text-lg font-bold text-white'> 
    <span>⚡</span>
        {/* <SidebarTrigger title='Close Sidebar' className=' cursor-e-resize '/> */}
        <Link href='/Thinkpad' className='text-white hover:text-violet-500'>
        <Button variant='ghost' className='flex items-center gap-2'>
          <ChevronLeft/>
          <span>Back to Thinkpad</span>
        </Button>
        </Link>
        </div>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
            <Button onClick={createNewChat} className="bg-gray-700 text-white hover:bg-violet-900">
               <MessageCircleCode/> Create New Chat
                </Button>
        </SidebarGroup>
        <div className='flex items-center justify-between flex-col gap-5 h-[70vh] overflow-y-auto scrollbar-hide'>
        <SidebarGroup >
            <History  />
        </SidebarGroup>
        <SidebarGroup>
          <TokenBar/>
          </SidebarGroup>
          </div>
      </SidebarContent>
      <SidebarFooter >
        <div className='flex justify-between items-center p-2 text-sm text-gray-500'>
            <span>Powered by Zuno</span>
            <span>v1.0.0</span>
        </div>
        </SidebarFooter>
    </Sidebar>
  )
}

export default HistorySidebar
