
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import logo from '../../public/logo.png'

function Logo() {
  return (
    <Link className='flex items-center gap-3 z-10 hover:bg-slate-200 text-xl max-sm:text-lg pl-2 pr-4 py-2 rounded-full translate-all duration-[1000ms]' href={"/"} >
        <div  className='max-sm:hidden'>
          <Image src={logo} alt='Logo' className="h-auto w-auto" height={50} width={50}  priority/>
        </div>
        <div  className='sm:hidden'>
          <Image src={logo} alt='Logo' className="h-auto w-auto" height={30} width={30} priority />
        </div>
        <span className='font-semibold'>StatForge<span className='text-sm align-top'>®</span> </span>
    </Link>
  )
}

export default Logo