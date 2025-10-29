"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import useAddGoodHabits from "../habits/useAddGoodHabits"
import { addGoodHabitsToLogs, addNewGoodHabit } from "../_lib/actions"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"


function GoodHabitForm({toggleChange,userId}) {

  const [category, setCategory] = useState("strength")
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState:{errors} } = useForm({
    shouldUseNativeValidation: true,
  })
  // const {addHabit,isPending,isIdle} = useAddGoodHabits();
  
  const onSubmit = (data)=>{
    // console.log("form data : ", data);
    const newData = {...data,habitName:data.habitName.trim(), category,userId};
    const updateHabit = async()=>{
      await addNewGoodHabit(newData);
      queryClient.invalidateQueries({ 
                queryKey:["goodHabits"],
                exact: true,   
                refetchInactive: true
            });
    }
    toast.promise(updateHabit,{
                        loading: 'Saving...',
                        success: <b>Habit Info Updated.</b>,
                        error: <b>Could not save.</b>,
      })


    toggleChange();
  }
  return (
   <div className="sm:px-8 sm:py-4  max-sm:p-2">
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1 className="font-bold text-3xl max-sm:text-xl text-center py-2 ">Create a New Habit </h1>
    <hr />
    <div className="my-3">
    <span className="font-bold text-lg">Habit Name : </span>  
    <input  type='text' maxLength={20} className="py-1 pl-2 border border-gray-400 rounded-lg bg-slate-100  ml-4 " 
    {...register("habitName", { 
    required:"Enter Habit Name ",
    message:"Max length reached",
    validate: (value)=>
      {
        if(value.trim().length < 5)
            return "Should be greater than 5 letters"
        if(value.trim().length > 20)
          return "Should be less than 20 letters"
      
        // return value.trim().length >5 || "Should be greater than 5 letters"
      }
    })} />
    </div>
    {errors.habitName && <p style={{ color: "red" }}>{errors.habitName.message}</p>}
    <div className="my-4">
    <span className="font-bold text-lg">Select Category : </span> <br/>
    <hr/>
      <div className="flex flex-col gap-4 py-2 my-2">
        <div>
        <input type="radio" value={"strength"} name="category" id="strength" className="hidden" /> 
        
        <label className="cursor-pointer" htmlFor={"strength"} onClick={()=>setCategory("strength")}> 
          {/* Strength  */}
            <CategoryRadio category={"strength"} selected={category} />
          </label>
        
        {/* <div className="font-bold italic">Ex : Exercise, lifting etc.</div> */}
        <DisplayExamples category={"strength"} selected={category} />
        
        </div>
        
        <div>

        <input type="radio" value={"intelligence"} name="category" id= "intelligence"  className="hidden"/>
        <label className="cursor-pointer" htmlFor={"intelligence"} onClick={()=>setCategory("intelligence")}> 
          <CategoryRadio category={"intelligence"} selected={category} />
           </label>
        
        <DisplayExamples category={"intelligence"} selected={category} />
           
        </div>



        <div>
        <input type="radio" value={"vitality"} name="category" id= "vitality"  className="hidden"/><label className="cursor-pointer" htmlFor={"vitality"} onClick={()=>setCategory("vitality")}>
          <CategoryRadio category={"vitality"} selected={category} />
            
            </label>
          <DisplayExamples category={"vitality"} selected={category} />
        </div>

        <div>
        <input type="radio" value={"wisdom"} name="category" id= "wisdom"  className="hidden"/> <label className="cursor-pointer" htmlFor={"wisdom"} onClick={()=>setCategory("wisdom")}> 
          <CategoryRadio category={"wisdom"} selected={category} /> 
          </label>
          <DisplayExamples category={"wisdom"} selected={category} />
        </div>
        <div>
        <input type="radio" value={"resistance"} name="category" id= "resistance"  className="hidden"/> <label className="cursor-pointer" htmlFor={"resistance"} onClick={()=>setCategory("resistance")}> 
          <CategoryRadio category={"resistance"} selected={category} /> 
        </label>
        <DisplayExamples category={"resistance"} selected={category} />
        </div>
      </div>
    </div>

     <div className="mt-4 flex flex-row gap-4 justify-end">
        <button onClick={toggleChange} className="block border rounded-full hover:bg-gray-300 border-gray-200 px-4 py-1 font-bold cursor-pointer">
        Cancel  
        </button>
        <input type="submit" className="block border rounded-full hover:bg-blue-700 bg-blue-600 text-white border-gray-200 px-4 py-1 font-bold cursor-pointer" value={"Submit"}/> 
         {/* <b> Submit </b> </input> */}
    </div>
    </form>
   </div>

  )
}
function CategoryRadio({category,selected}){

  let str = " text-sm font-bold border  my-4 rounded-full p-2 ";
  
  
  if(category==='strength')
    str+="border-category-strength text-category-strength "
  else if(category==='intelligence')
    str+="border-category-intelligence text-category-intelligence "
  else if(category==='vitality')
    str+="border-category-vitality text-category-vitality "
  else if(category==='wisdom')
    str+="border-category-wisdom text-category-wisdom "
  else if(category==='resistance')
    str+="border-category-resistance text-category-resistance "
  else 
    str+="border-black text-black "

  if(selected===category)
    str+="bg-slate-200"
 return(
    <span className={str}>
        {category}
    </span>)
}


function DisplayExamples({category,selected})
{

  if(category ===  "strength"){
    return (
      <div className={` ${selected===category ? '' : 'hidden'} my-2`}>
    <h1 className="font-bold ">Example Habit Types</h1>
    <ul className="italic ml-4">
      <li>🏋️ Workout or do push-ups</li>
      <li>🚴 Go for a run / cycling</li>
      <li>🧗 Physical activity / sports</li>
      <li>🥗 Stick to a healthy meal</li>
    </ul>
    </div>
    )}
  
  else if(category === "intelligence"){
    return (
      <div className={` ${selected===category ? '' : 'hidden'}  my-2`}>
    <h1 className="font-bold ">Example Habit Types</h1>
    <ul className="italic ml-4">
      <li>📚 Study or read a book chapter</li>
      <li>💻 Learn programming or a new skill</li>
      <li>✍️ Write notes, blog, or journal</li>
      <li>🎧 Listen to educational podcasts</li>
    </ul>
    </div>
    )}
  else if(category === "vitality"){
    return (
      <div className={` ${selected===category ? '' : 'hidden '} my-2`}>
    <h1 className="font-bold ">Example Habit Types</h1>
    <ul className="italic ml-4">
      <li>😴 Get 7–8 hours of sleep</li>
      <li>🥦 Eat a balanced diet</li>
      <li>☀️ Morning sunlight / walk</li>
      <li>🧃 Avoid junk or sugary drinks</li>
    </ul>
    </div>
    )}
  
  else if(category ===  "wisdom"){
    return (
      <div className={` ${selected===category ? '' : 'hidden'}  my-2` }>
    <h1 className="font-bold ">Example Habit Types</h1>
    <ul className="italic ml-4">
      <li>🧘 Meditate or practice breathing</li>
      <li>📔 Reflect or gratitude journaling</li>
      <li>🕊️ Practice patience or empathy</li>
      <li>🛏️ Sleep early / wake up on time</li>
    </ul>
    </div>
    )}
  else if(category ===  "resistance"){
    return (
      <div className={` ${selected===category ? '' : 'hidden'}  my-2`}>
    <h1 className="font-bold ">Example Habit Types</h1>
    <ul className="italic ml-4">
      <li>🕐 Stick to daily schedule</li>
      <li>🧊 Take a cold shower</li>
      <li>🚫 Avoid instant rewards (like unnecessary breaks)</li>
      <li>💭 Stay calm under pressure / no complaining</li>
    </ul>
    </div>
    )}
  else 
    return <div >Category error</div>
}


export default GoodHabitForm