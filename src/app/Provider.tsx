'use client'

import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessageProvider } from '@/context/MessageContext'
import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import HistorySidebar from '@/components/customs/HistorySidebar';
interface ProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

const Provider: React.FC<ProviderProps> = ({children}) => {
   
  return (
    <div>
      <SessionProvider>
        <MessageProvider >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={false}
        >
          <SidebarProvider defaultOpen={false}>
            <div className="flex h-screen w-full">
            <HistorySidebar/>
            <main className="flex-1 overflow-y-auto">
            {children}
            </main>
            </div>
            </SidebarProvider>
        </ThemeProvider>
        </MessageProvider>
        </SessionProvider>
    </div>
  )
}

export default Provider
