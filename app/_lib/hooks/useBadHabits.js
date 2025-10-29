import { useQuery } from "@tanstack/react-query"
import { addBadHabitstoLogs } from "../actions"


export default function useBadHabits(userId)
{
    const {data, isLoading, error} = useQuery({
    enabled : userId? true : false, 
    queryKey:["badHabits"],
    queryFn : async() => await addBadHabitstoLogs(userId),
    staleTime: 1000 * 60*60
})

     return {data,isLoading,error}
}