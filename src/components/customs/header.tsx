import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <nav className='flex w-full items-center justify-between p-4  text-white'>
      
        <span className='text-lg font-bold'>Zuno</span>
        <div className='gap-2 flex items-center'>
            <Button variant='default' className='ml-2'>Sign In</Button>
            <Button variant='outline'>Get Started</Button>
        </div>
      
    </nav>
  )
}

export default Header
