"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addGoodHabitsToLogs, addNewGoodHabit } from "../_lib/actions"
import toast from "react-hot-toast";

function useAddGoodHabits(data) {
    // const toastId = toast.loading("Data is loading");
    const queryClient = useQueryClient();
    const{mutate:addHabit, isPending,isIdle} = useMutation({
        mutationFn: (data)=>{
            const asyncfu = async()=>{
                await addNewGoodHabit(data);
            }
            asyncfu();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ 
                queryKey:["goodHabits"],
                exact: true,   
                refetchInactive: true
            });
            // else 
            // toast.success("New habit added")
            // toast.success("New habit added")
        },
        onError:(err)=>{
            toast.error("Failed to add Habit")
            console.log(err)
        },
    })

    return {addHabit,isPending,isIdle};
    
}

export default useAddGoodHabits