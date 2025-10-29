import { useQuery } from "@tanstack/react-query";
import { addGoodHabitsToLogs } from "../actions";


export default function useGoodHabits(userId){
    const {data, isLoading, error} = useQuery({
        enabled : userId? true : false, 
        queryKey:["goodHabits"],
        queryFn : async() => await addGoodHabitsToLogs(userId),
        staleTime: 1000 * 60*60
    })
    return { isLoading, error, data };

}