import { useConvex } from 'convex/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { Trash } from 'lucide-react';

const History = () => {
    const {data: session, status} = useSession();
          const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const convex = useConvex();
    const {toggleSidebar} = useSidebar()
    type Workspace = {
        _id: Id<"workSpaces">;
        _creationTime: number;
        filedata?: any;
        messages: { role: string; content: string; }[];
        user: Id<"users">;
    };
    
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [onHover , setOnHover] = useState<boolean>(false);
    useEffect(()=>{
        getAllWorkSpaces();
    },[session])
    
    const getAllWorkSpaces = async () => {
        if (!session || !session.user?._id) return [];
        const response = await convex.query(api.workspace.getWorkSpacesHistory, {
            userId: session.user?._id as Id<'users'>
        });
        console.log("Workspaces:", response);
        setWorkspaces(response);
    }
    

    const deleteWorkSpace = async (workspaceId: Id<'workSpaces'>) => {
        try {
            await convex.mutation(api.workspace.deleteWorkSpace, {
                workspaceId: workspaceId
            });
            setWorkspaces(prev => prev.filter(ws => ws._id !== workspaceId));
        } catch (error) {
            console.error("Error deleting workspace:", error);
        }
    }

  return (
    <div >
      {/* <h2 className="text-lg font-semibold">History</h2> */}
      <p className="text-sm text-muted-foreground">Chats</p>

      <div className='mt-4 overflow-y-auto scrollbar-hide flex flex-col gap-2 max-h-[70vh] '>
        {workspaces && workspaces.map((workspace, index) => {
          return (
        <span
          key={workspace._id}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={toggleSidebar}
          className="p-2 mb-2 border-b flex justify-between text-base items-center text-left text-gray-300 rounded-md border-gray-700 hover:bg-gray-800"
        >
          <Link className='' href={`/workspace/${workspace._id}`}>
            {workspace?.messages[0]?.content}
          </Link>
          {hoveredIndex === index ? (
            <Trash
          className='cursor-pointer w-4 hover:scale-125'
          onClick={e => {
            e.stopPropagation();
            deleteWorkSpace(workspace._id);
          }}
            />
          ) : null}
        </span>
          );
        })}
      </div>
      </div>
    // </div>
  )
}

export default History
