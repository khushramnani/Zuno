'use client'

import React, { useContext, useState } from 'react'
import Header from '@/components/customs/header'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Link, Loader } from 'lucide-react'
import Lookup from '@/data/Lookup'
// import { MessageContext } from '@/context/MessageContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Id } from '../../../../convex/_generated/dataModel'
import { Github } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'


const Page = () => {
    const [userInput, setUserInput] = useState("");
    // const messageContext = useContext(MessageContext);
    const { toggleSidebar } = useSidebar();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();
    const createWorkSpace = useMutation(api.workspace.createWorkSpace)
    const router = useRouter()

    // console.log("Session status:", status);
    // console.log("Session data:", session);
    // console.log("Session user ID:", session?.user?._id);
    const onGenerate = async (input: string) => {
        setIsLoading(true);
        if (!input.trim()) {
            console.log("Input is empty, please enter a prompt.");
            setIsLoading(false);
            return;
        }



        if (status === "loading") {
            // Wait for session to load
            console.log("Session is loading, please wait...");
            return;
        }

        if (!session || !session.user?._id) {
            setIsLoginDialogOpen(true);
            return;

            setIsLoading(false);
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
        <div className='min-h-screen'>
            <Header setIsLoginDialogOpen={setIsLoginDialogOpen} />
            <div className='w-full text-white flex justify-center px-2 sm:px-0'>
                <div className='flex items-center mt-20 sm:mt-36 flex-col rounded-lg p-4 sm:p-8 shadow-lg w-full max-w-2xl'>

                    <h1 className='text-2xl sm:text-3xl font-bold text-center'>Welcome To <span className='zuno-bold'>Zuno</span></h1>
                    <p className='mt-1 text-base sm:text-lg font-mono text-center'>Enter your prompt to make your ideas into reality</p>
                    <div className='w-full mt-6 sm:mt-8'>
                        <div className='flex gap-2 relative'>
                            <Textarea id='thinkpad-textarea' name='thinkpad-textarea' className="w-full sm:w-[48rem] font-mono h-32 max-h-52 resize-none border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none bg-transparent text-white placeholder:text-gray-400 pr-12 text-base sm:text-lg"
                                placeholder="Type your thoughts here..."
                                onChange={(e) => setUserInput(e.target.value)}
                                value={userInput}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        if (userInput.trim()) {
                                            setIsLoading(true);
                                            onGenerate(userInput);
                                            setUserInput('');
                                            toggleSidebar()
                                        }
                                    }
                                }}
                            />
                            {userInput && isLoading ? (
                                <div className="absolute right-2 top-2 bg-indigo-500 p-2 rounded-md">
                                    <Loader className="text-white w-4 h-4 animate-spin" />
                                </div>
                            ) : (
                                <ArrowRight onClick={() => { onGenerate(userInput); toggleSidebar(); }} className='absolute right-2 top-2 text-white w-8 bg-indigo-500 p-2 h-8 rounded-md cursor-pointer' />
                            )}
                            <div className='absolute left-2 bottom-2 mt-2'>
                                <Link className='text-white w-8 p-2 h-8 rounded-md' />
                            </div>
                        </div>
                        <div className='mt-4 w-full flex flex-wrap items-center justify-center gap-1'>
                            {Lookup.SUGGESTIONS.map((suggestion, index) => (
                                <span key={index} onClick={() => setUserInput(suggestion)} className='border text-xs sm:text-sm cursor-pointer hover:bg-gray-800 p-1 px-2 rounded-2xl'>{suggestion}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-semibold mb-2">Sign in to <span className='zuno-regular'>Zuno</span></DialogTitle>
                        <p className="text-center text-gray-500 text-sm">Choose a provider to continue</p>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button
                            onClick={() => signIn("github")}
                            variant="outline"
                            className="w-full flex items-center gap-2 border-gray-700 hover:bg-gray-100"
                        >
                            <Github className='w-5 h-5 ' />
                            Sign in with GitHub
                        </Button>
                        <Button
                            onClick={() => signIn("google")}
                            variant="outline"
                            className="w-full flex items-center gap-2 border-gray-300 hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                                <g>
                                    <path fill="#4285F4" d="M21.805 10.023h-9.18v3.955h5.254c-.227 1.18-1.36 3.463-5.254 3.463-3.162 0-5.74-2.617-5.74-5.841s2.578-5.841 5.74-5.841c1.8 0 3.008.767 3.7 1.426l2.53-2.463C17.09 3.61 14.97 2.5 12.625 2.5 7.72 2.5 3.75 6.47 3.75 11.375s3.97 8.875 8.875 8.875c5.11 0 8.48-3.59 8.48-8.65 0-.58-.06-1.02-.15-1.577z" />
                                    <path fill="#34A853" d="M12.625 21.25c2.34 0 4.3-.77 5.73-2.09l-2.73-2.23c-.76.51-1.75.81-3 .81-2.31 0-4.27-1.56-4.97-3.66H4.8v2.29A8.87 8.87 0 0012.625 21.25z" />
                                    <path fill="#FBBC05" d="M7.655 14.08a5.34 5.34 0 010-3.41v-2.29H4.8a8.87 8.87 0 000 7.99l2.86-2.29z" />
                                    <path fill="#EA4335" d="M12.625 7.5c1.26 0 2.38.43 3.27 1.28l2.45-2.45C16.92 4.61 14.97 3.5 12.625 3.5c-3.16 0-5.74 2.617-5.74 5.841 0 1.01.26 1.97.72 2.79l2.86-2.29c.7-2.1 2.66-3.66 4.97-3.66z" />
                                </g>
                            </svg>

                            Sign in with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page
