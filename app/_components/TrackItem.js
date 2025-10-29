"use client"

import React, { useState } from 'react'
import {Rye} from "next/font/google"

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
});

function TrackItem({title,hrs,setHrs,mins,setMins }) {
  // const [hrs, setHrs] = useState("");
  const handleChangeHrs = (e) => {
  let val = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(val)) return;

    // Limit to 2 digits
    if (val.length > 2) {
      val = val.slice(0, 2);
    }
    

    // Cap at 12
    if (parseInt(val) > 23) {
      val = "23";
    }
    
    setHrs(val);    
  };

  // const [mins, setMins] = useState("");
      const handleChangeMins = (e) => {
    let val = e.target.value;
    // Only allow numbers
    if (!/^\d*$/.test(val)) return;

    // Limit to 2 digits
    if (val.length > 2) {
      val = val.slice(0, 2);
    }

    // Cap at 12
    if (parseInt(val) > 59) {
      val = "59";
    }
    setMins(val);    
  };



  return (
    <div className='flex flex-col text-center bg-white rounded-2xl px-5 py-3 max-md:w-[80%] '>
        <div className='font-bold'>{title}</div>
        <div className={`${rye.className} flex flex-row  text-center items-center text-2xl max-md:justify-center`}>
          <input type='text' value={hrs} className='rounded-2xl block p-2 w-14 outline-none' placeholder={"00"} onChange={handleChangeHrs} onBlur={()=>{
            if(hrs.length == 1)
              setHrs("0"+hrs)
          }} 
          />
          <span className='block'>:</span>
          <input type='text' value={mins} className='rounded-2xl block p-2 w-14 outline-none' placeholder={"00"} onChange={handleChangeMins} onBlur={()=>{
            if(mins.length == 1)
              setMins("0")
          }}  
          
          
          />
        </div>

    </div>
  )
}



export default TrackItem