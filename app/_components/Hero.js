"use client"
import React, { useState } from 'react'



function Hero({children,toggleChange}) {

    const [showHero, setShowHero ] = useState(true);
    
    function ToggleShowHero() {
        setShowHero(false);
        toggleChange();
    }
    function doNothing(event){
        event.stopPropagation();
    }

  return (
    <>
    {showHero && 
    <section className='fixed overflow-x-scroll overflow-y-scroll top-0 left-0 z-10 w-full h-full backdrop-blur-sm  cursor-pointer' onClick={ToggleShowHero}>

        {/* Blur section */}
        <div className='mx-auto  flex justify-center items-center  mt-12   rounded-2xl backdrop-blur-3xl' >
            <div className='bg-white border  border-gray-400  rounded-lg text-black hover:cursor-auto ' onClick={doNothing}>
                {children}
            </div>
        </div>
    </section>}
    </>
  )
}
export default Hero;
