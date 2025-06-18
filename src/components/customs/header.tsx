'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type HeaderProps = {
    setIsLoginDialogOpen: (open: boolean) => void;
};

const Header = ({ setIsLoginDialogOpen }: HeaderProps) => {
    const { data: session } = useSession()

    return (
        <nav className='flex w-full items-center justify-between p-4 text-white'>
            <span className='text-lg font-bold'>Zuno</span>
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={session.user?.image || ''} alt="Profile" />
                            <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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