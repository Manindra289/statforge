"use client"
import React, { useState } from 'react'
import CategoryItem from './CategoryItem'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditForm from './EditForm';
import Hero from './Hero';
import DeleteHabitForm from './DeleteHabitForm';
function HabitItem({action,category,color,section, habitId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    function ToggleEditing()
    {
        setIsEditing((isEditing)=> {
            return !isEditing});

    }
    function ToggleDeleting()
    {
        setIsDeleting((isDeleting)=> {
            return !isDeleting}
        );

    }
  return (
    <>
    {isDeleting && <Hero toggleChange={ToggleDeleting}>
        {/* This is a hero  */}
        <DeleteHabitForm habitId={habitId} habitName={action} toggleChange={ToggleDeleting} section={section}/>
    </Hero>}
    <div className={`${color==="white" ? "bg-slate-300" : "bg-red-200" }  text-black shadow-lg rounded-lg  px-4 py-2 my-3 text-lg hover:shadow-2xl  trasnition-all duration-1000`}>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center gap-2 font-bold '>
                {action}
            </div>
            <div className='flex flex-row items-center gap-3'>
                <div className='border border-black p-[2px] rounded-md hover:bg-white hover:cursor-pointer' onClick={ToggleDeleting} >
                <MdDelete/>
                </div>
                {/* <div className='border border-black p-[2px] rounded-md hover:bg-white hover:cursor-pointer' onClick={ToggleEditing}>
                <MdEdit />
                </div> */}
            </div>
        </div>
        {category && <div className='my-1 text-left'>
             <CategoryItem category={category} />
        </div> } 
        
        </div>

        {isEditing && <EditForm/>}


        
        </>



  )
}

export default HabitItem