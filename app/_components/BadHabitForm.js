"use client"

import { useQueryClient } from "@tanstack/react-query";
import { addNewBadHabit } from "../_lib/actions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function BadHabitForm({toggleChange,userId}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState:{errors} } = useForm({
        shouldUseNativeValidation: true,
      })

  const onSubmit = (data)=>{
    // console.log("form data : ", data);
    const newData = {...data,habitName:data.habitName.trim(),userId};
    const updateHabit = async()=>{
      await addNewBadHabit(newData);
      queryClient.invalidateQueries({ 
                queryKey:["badHabits"],
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
    <div className="sm:px-8 sm:py-4 max-sm:p-2">
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1 className="font-bold text-3xl max-sm:text-xl text-center py-2 ">Add a New Habit </h1>
    <hr />
    <div className="my-3">
    <span className="font-bold text-lg">Habit Name : </span>  
    <input  type='text' className="py-1 pl-2 border border-gray-400 rounded-lg bg-slate-100  ml-4"
    {...register("habitName", { 
    required:"Enter Habit Name ",
    message:"Max length reached",
    validate: (value)=>
      {
        if(value.trim().length < 5)
            return "Should be greater than 5 letters"
        if(value.trim().length > 30)
          return "Should be less than 30 letters"
      
        // return value.trim().length >5 || "Should be greater than 5 letters"
      }
    })} />
    </div>
    {errors.habitName && <p style={{ color: "red" }}>{errors.habitName.message}</p>}
     <div className="mt-4 flex flex-row gap-4 justify-end">
        <button onClick={toggleChange}  className="block border rounded-full hover:bg-gray-300 border-gray-200 px-4 py-1 font-bold cursor-pointer">
        Cancel
        </button>
        <input type="submit" className="block border rounded-full hover:bg-red-700 bg-red-600 text-white border-gray-200 px-4 py-1 font-bold cursor-pointer" value={"Submit"}/> 
         {/* <b> Submit </b> </input> */}
    </div>
    </form>
   </div>
  )
}

export default BadHabitForm