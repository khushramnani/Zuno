import { useConvex, useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import Link from 'next/link';

const TokenBar = () => {
    
    const { data: session } = useSession();
    const [currtoken, setCurrToken] = useState<number>(80);
    const defaultToken = Number(process.env.NEXT_PUBLIC_MAX_TOKENS) || 50000; 
    
    useEffect(() => {

      if (session?.user) {
        setCurrToken(Number(session.user.token));
      }

       const timer = setTimeout(() => setCurrToken(Number(session?.user.token)), defaultToken)
       return () => clearTimeout(timer)


    }, [session]);

    // Dynamically set maxToken
    const maxToken = Math.max(defaultToken, currtoken);

    return (
      <div>
        <h4 className='text-sm pb-1 text-muted-foreground'>Token Usage</h4>
        <p>{currtoken}/{maxToken}</p>
        <Progress className='w-full ' value={currtoken} max={maxToken} />
        <Link href='/pricing'>
          <Button className='w-full mt-2 rounded-full' variant={'ghost'}>Buy Tokens</Button>
        </Link>
      </div>
    );
}

export default TokenBar


