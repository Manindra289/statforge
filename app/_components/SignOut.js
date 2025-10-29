"use client"

import { useState } from "react";
import Hero from "./Hero"
import {HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { signOutAction } from "../_lib/actions";
function SignOut() {

    const [showHero, setShowHero] = useState(false);
    function toggleHero()
    {
        setShowHero(showHero=>!showHero);
    }

  return (
    <>
    <div onClick={toggleHero} className=' rounded-full hover:bg-slate-200 p-3 cursor-pointer hover:text-black transition-all duration-[1000ms] right-10 font-bold text-3xl text-white  '><HiOutlineArrowRightStartOnRectangle/></div>
    {showHero && <Hero toggleChange={toggleHero}>
            <div className="m-5">
            <h1 className="font-bold">Do you want sign out ?</h1>
            <div className="flex justify-end ">
            <button className="hover:bg-green-300 px-2 my-2 border-2 rounded-md border-black" 
            onClick={()=>{
                setShowHero(false);
                signOutAction();
            }}>YES</button>
            </div>

            </div>

    </Hero>}

    </>
  )
}

export default SignOut