"use client"
import HabitTitle from './HabitTitle'
import BadHabitItem from './BadHabitItem'
import Link from 'next/link';
import { addBadHabitstoLogs } from '../_lib/actions';
import Spinner from './Spinner';
import { useQuery } from '@tanstack/react-query';
import useBadHabits from '../_lib/hooks/useBadHabits';

function BadHabitSection({userId }) {
  // const tasks = await addBadHabitstoLogs(userId);

  // const {data, isLoading, error} = useQuery({
  //   enabled : userId? true : false, 
  //   queryKey:["BadHabits"],
  //   queryFn : () => addBadHabitstoLogs(userId)
  // })

  const {data, isLoading, error} = useBadHabits(userId);
  const tasks = data;
  // console.log("bad tasks : ", data)

  if(isLoading) return <Spinner/>
  if(error) throw new Error("good habits error")


  // if(!tasks.length)
  //   return null;



  return (
    <section className='bg-[#1F1E1E] rounded-3xl p-5 w-full place-self-start'>
        <div className='text-slate-50' >
            <HabitTitle>Bad Habits</HabitTitle>
        </div>
        {/* {tasks?.length ===0 ? <div className='text-yellow-400 underline'><Link href={"/habits"}>Create new habits </Link> </div>: 
        <div className={`flex flex-col max-h-64 ${tasks.length> 3 ? 'overflow-scroll':'' }`}>
        {isLoading ? <Spinner/> : tasks.map(task=> <BadHabitItem isCompleted={task.completed} key={task.id} action={task.badHabits.habitName} /> )}
        </div>
        
        } */}
        <div className={`flex flex-col max-h-72 ${tasks.length> 3 ? 'overflow-scroll':'' }`}>
        {

        tasks?.length ===0 ?
         <div className='text-yellow-400 text-md underline'><Link href={"/habits"}>Create new habits </Link> </div>
         :
        
        tasks.map(task=> <BadHabitItem userId={userId} isCompleted={task.completed} id={task.id} key={task.id} action={task.badHabits.habitName} /> )}
        </div>
        



        
    </section>
  )
}

export default BadHabitSection