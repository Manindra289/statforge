"use client"
// import { useQuery,useQueryClient } from "@tanstack/react-query";
// import { addGoodHabitsToLogs, getGoodHabits } from "../_lib/actions";
// import GoodHabitForm from "./GoodHabitForm"
import Habit from "./Habit"
import Spinner from "./Spinner";
import useGoodHabits from "../_lib/hooks/useGoodHabits";

// import { useRouter } from "next/router";
// import Spinner from "./Spinner";


function GoodHabits({userId}) {
    // const goodTasks = await getGoodHabits(userId);
    
    // if(!goodTasks.length)
    //     return null;
     const {data,isLoading, error} = useGoodHabits(userId);
     if(isLoading)
      return <Spinner/>
    
     if(error)
      throw new Error("Good habits error");
    

  return (
    <Habit title={"Good Habits"} tasks={data} color="white" section={"good"} userId={userId}>
         {/* <GoodHabitForm /> */}
    </Habit>





    // <Habit title={"Good Habits"} tasks={goodTasks} color="white" section={"good"} >
    //      <GoodHabitForm/>
    // </Habit>
    // <Habit title={"Good Habits"} tasks={data} color="white" section={"good"} >
    //      <GoodHabitForm/>
    // </Habit>
  )
}

export default GoodHabits