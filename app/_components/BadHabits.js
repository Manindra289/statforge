"use client"
// import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getBadHabits } from "../_lib/actions";
import BadHabitForm from "./BadHabitForm"
import Habit from "./Habit"
import Spinner from "./Spinner";
import useBadHabits from "../_lib/hooks/useBadHabits";
// import Spinner from "./Spinner";


function BadHabits({userId}) {
    // const badTasks = await getBadHabits(userId);
    // console.log("Bad tasks : ")
    // console.log(badTasks)
    // if(!badTasks.length)
    //     return null;

    // const queryClient = useQueryClient();
    // const data = queryClient.getQueryData(["BadHabits"])
    // console.log("Cached data : ",data);
    // const {data, isLoading, error} = useQuery({
    //   enabled:userId? true : false,
    //   queryKey:["badTasks"],
    //   queryFn : ()=>getBadHabits(userId)
    // })

    // if(isLoading){
    //  return <Spinner/>
    // }
    // if(error)
    //   throw new Error("use query error")
    // if(!data)
    //   return <Spinner/>

    const {data,isLoading, error} = useBadHabits(userId);
     if(isLoading)
      return <Spinner/>
    
     if(error)
      throw new Error("Good habits error");

  return (

    <Habit title={"Bad Habits"} userId={userId} tasks={data} color="black"  section={"bad"}>
        {/* <BadHabitForm/> */}
    </Habit>
    // <Habit title={"Bad Habits"} tasks={badTasks} color="black"  section={"bad"}>
    //     <BadHabitForm/>
    // </Habit>
  )
}

export default BadHabits