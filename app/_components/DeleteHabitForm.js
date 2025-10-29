"use client"
import toast from "react-hot-toast";
import { deleteBadHabit, deleteGoodHabit } from "../_lib/actions";
import { useQueryClient } from "@tanstack/react-query";


function DeleteHabitForm({habitName,toggleChange,section,habitId}) {
  const queryClient = useQueryClient();
  const updateHabit = async (habitId,section)=>{
      if(section === "good"){
          await deleteGoodHabit(habitId);
           queryClient.invalidateQueries({ 
                queryKey:["goodHabits"],
                exact: true,   
                refetchInactive: true
            });
      }
      else{
        await deleteBadHabit(habitId);
         queryClient.invalidateQueries({ 
                queryKey:["badHabits"],
                exact: true,   
                refetchInactive: true
            });
      }
  }
  


  return (
    <div>
    <div className="p-8">
       <div className="mb-4">Do you want to Delete the habit,<b> &ldquo;{habitName}&ldquo; </b>?</div>

       <div className=" flex flex-row gap-4 justify-end">
        <button onClick={toggleChange} className="block border rounded-full hover:bg-gray-300 border-gray-200 px-4 py-1"><b> No</b></button>
        <button className="block border rounded-full hover:bg-red-700 bg-red-600 text-white border-gray-200 px-4 py-1 "
        onClick={()=>{
        toggleChange();  
        
        toast.promise(updateHabit(habitId,section) ,{
              loading: 'Loading...',
              success: <b>Habit deleted</b>,
              error: <b>Error Occured, Try again.</b>,
        })
        }}        
        ><b>Delete</b></button>
       </div>
    </div>
    </div>
  )
}

export default DeleteHabitForm;