'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '../ui/sidebar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useIsMobile } from "@/hooks/use-mobile";

type HeaderProps = {
    setIsLoginDialogOpen: (open: boolean) => void;
};

const Header = ({ setIsLoginDialogOpen }: HeaderProps) => {
    const { data: session } = useSession()
    const router = useRouter();
    const isMobile = useIsMobile();

    return (
        <nav className='flex w-full items-center justify-between p-4 text-white'>
            <div className='flex items-center gap-2 '>
            {session && !isMobile ? (<> <SidebarTrigger title='Open Sidebar' className=' cursor-e-resize '/> <hr className='h-6 border border-gray-700'/> </>) : null }
            <div className={`flex items-center gap-2 ${session ? 'pl-8' : ''}`}>
            <Image  src="/logo.png" alt="Zuno Logo" width={40} height={40} />
            <span onClick={() => router.push('/')} className={`md:text-xl text-lg cursor-pointer  zuno-regular`}>Zuno</span>
            </div>
            </div>
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={session.user?.image || ''} alt="Profile" />
                            <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push('/pricing')}>
                            My Subscriptions
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut()}>
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className='gap-2 flex items-center'>
                    <Button onClick={() => setIsLoginDialogOpen(true)} variant='default' className='ml-2'>
                        Sign In
                    </Button>
                    <Button onClick={() => setIsLoginDialogOpen(true)} variant='outline'>
                        Get Started
                    </Button>
                </div>
            )}
        </nav>
    )
}

export default Header