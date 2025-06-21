'use client'

import React, { useContext, useState } from 'react'
import Header from '@/components/customs/header'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Link } from 'lucide-react'
import Lookup from '@/data/Lookup'
import { MessageContext } from '@/context/MessageContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Id } from '../../../../convex/_generated/dataModel'


const Page = () => {
    const [userInput, setUserInput] = useState("");
    const messageContext = useContext(MessageContext);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const { data: session , status  } = useSession();
    const createWorkSpace = useMutation(api.workspace.createWorkSpace)
    const router = useRouter()

// console.log("Session status:", status);
// console.log("Session data:", session);
// console.log("Session user ID:", session?.user?._id);
const onGenerate = async (input: string) => {
  if (status === "loading") {
    // Wait for session to load
    console.log("Session is loading, please wait...");
    return ;
  }

  if (!session || !session.user?._id) {
    setIsLoginDialogOpen(true);
    return;
  }

  // Don't update messages here, just create workspace and redirect
  const newMessage = { role: "user", content: input };

  try {
    const workspaceId = await createWorkSpace({
      messages: [newMessage],
      filedata: undefined,
      user: session.user._id as Id<"users">,
    });

    router.push(`/workspace/${workspaceId}`);
  } catch (error) {
    console.error("Error creating workspace:", error);
  }
};

    return (
        <div className=' min-h-screen'>
            <Header setIsLoginDialogOpen={setIsLoginDialogOpen} />
            <div className='w-full  text-white flex  justify-center'>
                <div className='flex items-center mt-36  flex-col  rounded-lg p-8  shadow-lg'>

                    <h1 className='text-3xl font-bold'>Welcome To Zuno</h1>
                    <p className='mt-1 text-lg'>Enter your prompt to make your ideas into reality</p>
                    <div className='max-w-2xl w-full mt-8'>
                        <div className='flex gap-2 relative'>
                            <Textarea id='thinkpad-textarea' name='thinkpad-textarea' className="w-[48rem] h-32 max-h-52 border-none resize-none outline-none  bg-transparent text-white placeholder:text-gray-400  pr-12 "
                                placeholder="Type your thoughts here..."
                                onChange={(e) => setUserInput(e.target.value)}
                                value={userInput}
                            />
                            {userInput && <ArrowRight onClick={() => onGenerate(userInput)} className='absolute right-2 top-2 text-white w-8 bg-indigo-500 p-2 h-8 rounded-md ' />}
                            <div className='absolute left-2 bottom-2 mt-2'>
                            <Link className='  text-white w-8  p-2 h-8 rounded-md ' />
                            </div>
                        </div>
                        <div className='mt-4 max-w-2xl w-full flex flex-wrap items-center justify-center gap-1'>
                            {Lookup.SUGGESTIONS.map((suggestion , index) => (
                                <span key={index} onClick={() => setUserInput(suggestion)} className='border text-sm  cursor-pointer hover:bg-gray-800 p-1 px-2 rounded-2xl '>{suggestion}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in to Zuno</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button 
                            onClick={() => signIn("github")} 
                            variant="outline"
                            className="w-full"
                        >
                            Sign in with GitHub
                        </Button>
                        <Button 
                            onClick={() => signIn("google")} 
                            variant="outline"
                            className="w-full"
                        >
                            Sign in with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page
