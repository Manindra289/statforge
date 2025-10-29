"use client"
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import CategoryButton from "./CategoryButton";
import Hero from "./Hero";
import { changeCompletion } from "../_lib/actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function GoodHabitItem({isCompleted,action,category,id,currentStreak})
{
    const queryClient = useQueryClient();
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

        }}>
        <div className={`${isDone?'bg-[#98FB98]':'bg-slate-300 shadow-lg '} rounded-lg  px-4 py-2 my-2 text-md hover:shadow-2xl  trasnition-all duration-1000
        
        
        `}>
            <div className='flex flex-row justify-between relative'>
                <div className='flex flex-row items-center gap-2 '>
                    <CategoryButton category={category} isDone={isDone}>
                      {isDone?<RiCheckboxBlankCircleFill/>:  <RiCheckboxBlankCircleLine /> }
                    </CategoryButton>
                    <div>{isDone? <em className='line-through'>{action}</em>:<em >{action}</em> }
                        </div>
                    
                    <div className=" absolute right-0">🔥{currentStreak}</div>

                </div>
            <div className={`${isDone? 'line-through':''}`}>
                {/* {reward}XP */}
            </div>
        </div>
        <div className='ml-5 my-2 text-left'>
             <CategoryItem category={category} />
        </div>
        </div>
        </button>
        
        {    
        showHero&& isDone===false && 
        <Hero toggleChange={toggleHero}>
            <div className="m-5">
            <h1 className="font-bold">Are you sure you have completed the task ?</h1>
            <div className="flex justify-end ">
            <button className="hover:bg-green-300 px-2 my-2 border-2 rounded-md border-black" onClick={()=>{
                setShowHero(false);
                const updateCompletion = async ()=>{
                    // const { error } = await supabase.from('goodHabitLogs').update({ completed: true }).eq('id', id) .select()
                    // if(error)
                    //     throw new Error("updateCompletion1 function is throwing error");
                    await changeCompletion(id,true);
                }
                // updateCompletion();

                toast.promise(updateCompletion,{
                        loading: 'Loading...',
                        success: <b>Task completed.</b>,
                        error: <b>Error Occured, Try again.</b>,
                    })
                setIsDone((isDone)=>!isDone)
                queryClient.invalidateQueries({ 
                queryKey:["goodHabits"],
                exact: true,   
                refetchInactive: true
            });
                
            }}>YES</button>
            </div>

            </div>
            </Hero>
        }




        {    
        showHero&& isDone===true && <Hero toggleChange={toggleHero}>
            <div className="m-5">
            <h1 className="font-bold">Are you sure you want to cancel the task ?</h1>
            <div className="flex justify-end ">
            <button className="hover:bg-green-300 px-2 my-2 border-2 rounded-md border-black" onClick={()=>{
                
                setShowHero(false);
                const updateCompletion = async ()=>{
                    // const { error } = await supabase.from('goodHabitLogs').update({ completed: false }).eq('id', id) .select()
                    // if(error)
                    //     throw new Error("updateCompletion2 function is throwing error");
                    await changeCompletion(id,false);
                }
                // updateCompletion();
                toast.promise(updateCompletion,{
                        loading: 'Loading...',
                        success: <b>Task removed</b>,
                        error: <b>Error Occured, Try again.</b>,
                    })

                setIsDone((isDone)=>!isDone)
                queryClient.invalidateQueries({ 
                queryKey:["goodHabits"],
                exact: true,   
                refetchInactive: true
            });


            }}>YES</button>
            </div>

            </div>
            </Hero>
        }
        </>

    )


}
export default GoodHabitItem;