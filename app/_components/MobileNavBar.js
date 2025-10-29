"use client"
import { useEffect, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { ImCross } from "react-icons/im";
import Link from "next/link";
import SignOut from "./SignOut";
function MobileNavBar() {
    const [showNav, setShowNav ] = useState(false)
    useEffect(()=>{
            document.body.style.overflow = "auto"
    },[])
    

  return (
    <>
    <div onClick={()=>{
        setShowNav(true)
        document.body.style.overflow = "hidden"
    }} className='sm:hidden px-2 py-2 text-xl hover:bg-slate-200 rounded-full translate-all duration-1000 cursor-pointer'>
        <IoMenu />
    </div>

    {showNav && 
    <div className='sm:hidden'>
        <section className="sm:hidden fixed inset-0 w-full h-screen bg-gray-400 z-20 min-h-[400px] ">

        <div className="flex justify-between p-3 mt-4">
            <Link href="/" ><h1 className="font-bold">StatForge</h1></Link>
            <div onClick={()=>{
                setShowNav(false)
                document.body.style.overflow = "auto"
            }} className="px-2 py-2 text-lg hover:bg-slate-200 rounded-full translate-all duration-1000 cursor-pointer">
                <ImCross />
            </div>
        </div>
        <hr/>
        <div className="flex flex-col mt-4">
        <Link className=' p-3 hover:text-black text-lg hover:bg-slate-200 py-2 lg:px-6 rounded-lg transition-all duration-[1000ms]'    
            href="/dashboard">
         Dashboard
         </Link>
               <Link className=' p-3 hover:text-black text-lg hover:bg-slate-200 py-2 lg:px-6 rounded-lg transition-all duration-[1000ms]' 
               href="/habits">
         Habits
         </Link>
        <Link className=' p-3 hover:text-black text-lg hover:bg-slate-200 py-2 lg:px-6 rounded-lg transition-all duration-[1000ms]' 
        href="/friends">
         Friends
         </Link>
            <Link className=' p-3 hover:text-black text-lg hover:bg-slate-200 py-2 lg:px-6 rounded-lg transition-all duration-[1000ms]' 
            href="/profile">
         Profile 
         </Link>
        </div>

        <div className="absolute bottom-0 mb-5 pb-10 ml-3">
                <SignOut/>
        </div>

        </section>
    </div>}

    </>

  )
}

export default MobileNavBar