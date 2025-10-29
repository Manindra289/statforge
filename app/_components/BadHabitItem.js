"use client"

import React, { useState } from 'react'
import CategoryButton from './CategoryButton';
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri';
import Hero from './Hero';
import { changeBadHabitCompletion, changeHealth } from '../_lib/actions';
import toast from 'react-hot-toast';

function BadHabitItem({isCompleted,action,id,userId})
{
    
    const[isDone, setIsDone] = useState(isCompleted)
    const [showHero, setShowHero] = useState(false);
    function toggleHero()
    {
        setShowHero(showHero=>!showHero);
    }
    return(
        <>
        <button onClick={()=>{
            
            toggleHero();

        }} className=' trasnition-all duration-1000'>
        <div className={`${isDone?'bg-red-200':'bg-slate-300 shadow-lg '} rounded-lg  px-4 py-2 my-2 text-lg hover:shadow-2xl  trasnition-all duration-1000`}>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-2 '>
                    <CategoryButton  isDone={isDone}>
                      {isDone?<RiCheckboxBlankCircleFill/>:  <RiCheckboxBlankCircleLine /> }
                    </CategoryButton>
                    <div>{isDone? <em className='line-through'>{action}</em>:<em >{action}</em> }
                        </div>
                </div>
            <div className={`${isDone? 'line-through':''}`}>
                -5 Hp
            </div>
        </div>
        <div className='ml-5 my-1 text-left'>
             {/* <CategoryItem category={category} /> */}
        </div>
        </div>
        </button>



        {    
        showHero&& isDone===false && <Hero toggleChange={toggleHero}>
            <div className="m-5">
            <h1 className="font-bold">Are you sure you have done bad habit ?</h1>
            <div className="flex justify-end ">
            <button className="hover:bg-green-300 px-2 my-2 border-2 rounded-md border-black" onClick={()=>{
                
                setShowHero(false);
                const updateCompletion = async ()=>{
                                    // const { error } = await supabase.from('goodHabitLogs').update({ completed: true }).eq('id', id) .select()
                                    // if(error)
                                    //     throw new Error("updateCompletion1 function is throwing error");
                                    await changeBadHabitCompletion(id,true);
                                    await changeHealth(userId,-5);
                                }
                    toast.promise(updateCompletion,{
                        loading: 'Saving...',
                        success: <b>Habit Info Updated.</b>,
                        error: <b>Could not save.</b>,
                    })
                setIsDone((isDone)=>!isDone)
                
                
            }}>YES</button>
            </div>

            </div>
            </Hero>
        }

        {    
        showHero&& isDone===true && <Hero toggleChange={toggleHero}>
            <div className="m-5">
            <h1 className="font-bold">Are you sure you want to cancel the bad habit ?</h1>
            <div className="flex justify-end ">
            <button className="hover:bg-green-300 px-2 my-2 border-2 rounded-md border-black" onClick={()=>{
                setShowHero(false);
                const updateCompletion = async ()=>{
                                    // const { error } = await supabase.from('goodHabitLogs').update({ completed: false }).eq('id', id) .select()
                                    // if(error)
                                    //     throw new Error("updateCompletion2 function is throwing error");
                                    await changeBadHabitCompletion(id,false);
                                    await changeHealth(userId,5);
                }
                // updateCompletion();
                toast.promise(updateCompletion,{
                        loading: 'Saving...',
                        success: <b>Habit Info Updated.</b>,
                        error: <b>Could not save.</b>,
                    })

                // const notify = () => toast('Good Job');
                
                // notify();
                
                setIsDone((isDone)=>!isDone)
                
                
                
            }}>YES</button>
            </div>

            </div>
            </Hero>
        }




        </>

    )


}
export default BadHabitItem;