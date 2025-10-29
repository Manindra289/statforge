import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../actions"


function useUserData(userId) {
    const {data:userData,isLoading:isUserLoading,error}=useQuery({
        enabled : userId? true : false,
        queryKey:["userData"],
        queryFn :async () => await getUserData(userId),
        staleTime: 1000 * 60*60
    })
    return {userData, isUserLoading}
}

export default useUserData