"use client"
import Link from 'next/link';
import GoodHabitItem from './GoodHabitItem';
import HabitTitle from './HabitTitle';
import Spinner from './Spinner';
import { addGoodHabitsToLogs } from '../_lib/actions';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import useGoodHabits from '../_lib/hooks/useGoodHabits';


function GoodHabitSection({userId}) {

  // const tasks = await addGoodHabitsToLogs(userId);
  // const {data, isLoading, error} = useQuery({
  //   enabled : userId? true : false, 
  //   queryKey:["GoodHabits"],
  //   queryFn : () => addGoodHabitsToLogs(userId)
  // })

  const {data,isLoading, error} = useGoodHabits(userId);
  // const tasks = data;

  // console.log("tasks : ", data)

  if(isLoading) return <Spinner/>
  if(error) throw new Error("good habits error")
  
  const tasks = data.sort((a, b) => {
  return a.completed - b.completed;
  });
  const completedCount = tasks.filter(habit => habit.completed).length;


  // if(!tasks.length)
  //   return null;
  return (
    <section className='bg-white rounded-3xl p-5 w-full  place-self-start'>
      
        <div className='text-[#1F1E1E]'>
            <HabitTitle>Good Habits  { 
              tasks.length>0 &&
              <span className='italic text-sm max-sm:text-xs '>- Completed {completedCount} out of {tasks.length}</span>
            }</HabitTitle>
        </div>
        
        <div className={`flex flex-col max-h-72 ${tasks.length> 3 ? 'overflow-scroll':'' }`}>
        {
        tasks.length ===0 ? 
        <div className='text-yellow-400 text-md underline'><Link href={"/habits"}>Create new habits </Link> </div>
        : 
        tasks.map( (task) => 
            <GoodHabitItem isCompleted={task.completed} action={task.goodHabits.habitName} category={task.goodHabits.category} currentStreak={task.goodHabits.currentStreak}  id={task.id} key={task.id} /> 
      )
        }
        </div>



{/* 
            <GoodHabitItem isCompleted={true} action={"Go to Gym"} category={"Strength"} reward={"10"}/>
            <GoodHabitItem isCompleted={false} action={"complete blockchain"} category={"Intelligence"} reward={"20"}/>
            <GoodHabitItem isCompleted={false} action={"No anime"} category={"Resistance"} reward={"20"}/>
            <GoodHabitItem isCompleted={false} action={"No anime"} category={"Resistance"} reward={"20"}/> */}
        
    </section>
  )
}

export default GoodHabitSection