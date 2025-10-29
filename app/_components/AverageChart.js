"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchMobileData, fetchSleepData, fetchStudyData } from "../_lib/actions"
import Spinner from "./Spinner";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function AverageChart({userId}) {
const {data:fetchedMobData,isLoading: isMobLoading,error:mobErr} = useQuery({
      enabled : userId? true : false, 
      queryKey:["completeMobileTrackerData"],
      queryFn: async ()=> await fetchMobileData(userId),
      staleTime: 1000 * 60 *60
})
const {data:fetchedSleData, isLoading:  isSleLoading,error:sleErr} = useQuery({
      enabled : userId? true : false, 
      queryKey:["completeSleepTrackerData"],
      queryFn: ()=> fetchSleepData(userId),
      staleTime: 1000 * 60*60
    })

const {data:fetchedStudData,  isLoading: isStuLoading,error:stuErr} = useQuery({
          enabled : userId? true : false, 
          queryKey:["completeStudyTrackerData"],
          queryFn: ()=> fetchStudyData(userId),
          staleTime: 1000 * 60*60
        }) 
    
    if(mobErr || sleErr || stuErr)
        throw new Error("Average chart error")

    if(isMobLoading || isSleLoading || isStuLoading)
        return <Spinner/>

    const MobTotal = fetchedMobData.reduce((sum, item) => sum + item.mobileNum, 0);
    const SleTotal = fetchedSleData.reduce((sum, item) => sum + item.sleepNum, 0);
    const StuTotal = fetchedStudData.reduce((sum, item) => sum + item.studyNum, 0);


    let MobileAverage = MobTotal/fetchedMobData.length;
    let SleepAverage = SleTotal/fetchedSleData.length;
    let StudyAverage = StuTotal/fetchedStudData.length;
    MobileAverage = MobileAverage.toFixed(2)
    SleepAverage = SleepAverage.toFixed(2)
    StudyAverage = StudyAverage.toFixed(2)

    const data = [{
        name : "Average Time (hrs)",
        Sleep : SleepAverage,
        Mobile : MobileAverage,
        Study : StudyAverage
    }]
    // console.log(data)
  return (
    <div  className="w-full max-w-7xl h-96 rounded-3xl my-8 ">
      <ResponsiveContainer>
        <BarChart data={data} margin={{left:-30}}>
        <XAxis dataKey="name" stroke="black" />
        <YAxis stroke="black" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="Sleep" fill="#5EB35F"  className="cursor-pointer" />
        <Bar dataKey="Mobile" fill="#D04639" className="cursor-pointer" />
        <Bar dataKey="Study" fill="#78C5F5" className="cursor-pointer" />
      </BarChart>
</ResponsiveContainer>

    </div>
  )
}

export default AverageChart