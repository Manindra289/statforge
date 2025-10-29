"use client"
import React, { useState } from 'react'
import HabitTitle from './HabitTitle'
import HabitItem from './HabitItem'
import { IoMdAdd } from "react-icons/io";
import Hero from './Hero';
import Spinner from './Spinner';
import GoodHabitForm from './GoodHabitForm';
import BadHabitForm from './BadHabitForm';

function Habit({tasks, color,title,children,section,userId}) {

    const [showForm, setShowForm] = useState(false);

    function toggleShowForm()
    {
        setShowForm((showForm)=> !showForm)
    }
  return (
    <div>
        <section className={`${color==='black'? 'bg-[#1F1E1E]' : 'bg-white'} rounded-3xl p-5 w-full  place-self-start mb-6 `}>
            <div className={`${color==='black'?'text-slate-50':'text-[#1F1E1E]'}`} >
            <HabitTitle>{title} </HabitTitle>
            <div className='max-h-[300px] overflow-scroll'>
            {tasks.length ===0 ? 
                <div className='text-center text-red-500 '> No Habits exist </div> :
                
                tasks.map((task)=> 
                {
                    if(section === "good")
                  return(  
                  <HabitItem  section={section} color={color} 
                action={task.goodHabits.habitName} category={task.goodHabits.category} key={task.habitId} habitId={task.habitId} 
                />
            )
                else
                      return(  <HabitItem  section={section} color={color} 
                action={task.badHabits.habitName}  key={task.habitId} habitId={task.habitId} 
                />)

                }
                
                
                )
                
            }
            </div>

        <div className={`border border-dashed ${color==="black"?"border-red-500 hover:bg-red-600" : " border-black hover:bg-green-400"  } cursor-pointer 
        shadow-lg rounded-lg  px-4 py-2 my-2 text-lg hover:shadow-2xl  trasnition-all duration-1000` }
         onClick={toggleShowForm}>
            <div className='flex items-center my-2 justify-center'>
                <IoMdAdd /> <div>Add a new habit</div>
            </div>
        </div>
        </div>
        </section>
        {showForm && 
        <Hero toggleChange={toggleShowForm}>
        {
            section==="good" ? <>
            <GoodHabitForm userId={userId} toggleChange={toggleShowForm}/>
            </> : <> <BadHabitForm userId={userId} toggleChange={toggleShowForm} /></>
        
        
        
        }

        {children}
        </Hero>}
    </div>
  )
}


export default Habit