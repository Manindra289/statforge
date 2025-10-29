import { useQuery } from "@tanstack/react-query"
import { addTrackerData } from "../actions"


export default function useTrackerData(userId)
{
    const {data, isLoading, error} = useQuery({
    enabled : userId? true : false, 
    queryKey:["trackerData"],
    queryFn : async () => await addTrackerData(userId),
    staleTime: 1000 * 60*60
    })
     return {data,isLoading,error}
}