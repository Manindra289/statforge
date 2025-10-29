import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../actions";
// import { addGoodHabitsToLogs } from "../actions";


export default function useFriendsData(userId){
    const {data, isLoading, error} = useQuery({
        enabled : userId? true : false, 
        queryKey:["friendsList"],
        queryFn : async() => await getFriends(userId),
        staleTime: 1000 * 60*60
    })
    return { isLoading, error, data };

}