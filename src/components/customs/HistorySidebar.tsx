'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { MessageCircleCode } from 'lucide-react'
import History from './workspace/History'
import { useConvex, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useSession } from 'next-auth/react'
import { Id } from '../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
const HistorySidebar = () => {
    const convex = useConvex();
    const {data: session, status} = useSession();
    const router = useRouter();
    const {toggleSidebar} = useSidebar();
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
    <Sidebar >
      <SidebarHeader>
        <span>⚡</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
            <Button onClick={createNewChat} className="bg-gray-700 text-white hover:bg-violet-900">
               <MessageCircleCode/> Create New Chat
                </Button>
        </SidebarGroup>
        <SidebarGroup >
            <History />
        </SidebarGroup>
        <SidebarGroup />
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
