'use client'

import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessageProvider } from '@/context/MessageContext'
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
        <MessageProvider >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={false}
        >
            {children}
        </ThemeProvider>
        </MessageProvider>
    </div>
  )
}

export default Provider
