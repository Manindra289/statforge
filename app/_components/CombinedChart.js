"use client"
import { useState } from "react";
import { CgArrowLeftR } from "react-icons/cg";
import { CgArrowRightR } from "react-icons/cg";
import SleepChart from "./SleepChart";
import StudyChart from "./StudyChart";
import MobileChart from "./MobileChart";

function CombinedChart({userId}) {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const monthDays = getMonthDays(year, month);

    // console.log(month," ",year)

  return (
    <section className='bg-white rounded-3xl p-5 w-full  place-self-start mb-6'>
        <div className='text-[#1F1E1E]'>
            {/* <h1>This is combined chart</h1> */}
            <div className=" flex justify-end  gap-2  my-4 mx-4">
            <div className="flex items-center gap-2 font-bold"> 
                <CgArrowLeftR onClick={()=>setMonth(month=> 
                    {
                        if(month == 0){
                            // setYear((year)=>year-1);
                            return 11;
                        }
                        else 
                            return month-1
                        })} className="cursor-pointer text-2xl"/> 
                    <h1>{getMonthName(month).toUpperCase()}</h1> 
                    {today.getMonth() === month ? <> </> : <CgArrowRightR onClick={()=>setMonth(month=>{ 

                        if(month == 11){
                            return 0;
                        }
                        else 
                            return month+1
                    
                
                }
                    )} className="cursor-pointer text-2xl"/>}
                    
                    
            </div>
            <div className="flex items-center gap-2 font-bold"> 
                <CgArrowLeftR  onClick={()=>setYear(year=> year-1)} className="cursor-pointer text-2xl" />
                    <h1> {year} </h1> 
            
            {today.getFullYear() === year ? <> </> : <CgArrowRightR onClick={()=>setYear(year=> year+1)} className="cursor-pointer text-2xl" />}
            </div>
            </div>

            
            <SleepChart userId={userId} month={month} year={year} monthDays={monthDays} />
            <StudyChart userId={userId} month={month} year={year} monthDays={monthDays}/>
            <MobileChart userId={userId} month={month} year={year} monthDays={monthDays} />
            
        </div>
    </section>
  )
}

function getMonthDays(year, month) {
  // month: 0 = Jan, 9 = Oct
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 30 or 31
  const daysArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, hours: 0 }); // default 0 hours
  }

  return daysArray;
}

function getMonthName(num) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[num];
}

export default CombinedChart