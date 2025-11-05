"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { fetchStudyData } from "../_lib/actions";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
function getMonthDays(year, month) {
  // month: 0 = Jan, 9 = Oct
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 30 or 31
  const daysArray = [];

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, hours: 0 }); // default 0 hours
  }

  return daysArray;
}
function StudyChart({userId,month,year,monthDays}) {
    const [data, setData] = useState([]);
    const {data:fetchedData, isLoading,error} = useQuery({
      enabled : userId? true : false, 
      queryKey:["completeStudyTrackerData"],
      queryFn: ()=> fetchStudyData(userId),
      staleTime: 1000 * 60*60
    }) 
    useEffect(()=>{
      if(!fetchedData)
        return;
          // const today = new Date();
          // const monthDays = getMonthDays(today.getFullYear(), today.getMonth());

           const formatted = monthDays.map((dayObj) => {
                const entry = fetchedData.find(
                    (item) => new Date(item.date).getDate() === dayObj.day &&
                            new Date(item.date).getMonth() === month &&
                            new Date(item.date).getFullYear() === year
                );
            return {
                day: dayObj.day,
                hours: entry ? entry.studyNum : 0, // 0 if not entered
            };
            });
            setData(formatted);
    },[fetchedData,monthDays,month,year]);
    if(isLoading)
          return <Spinner/>;
    
  //   useEffect(() => {
  //       const func = async ()=>
  //       {
  //           const today = new Date();
  //           const monthDays = getMonthDays(today.getFullYear(), today.getMonth());

  //          const fetchedData =  await fetchSleepData(userId);

  //          const formatted = monthDays.map((dayObj) => {
  //               const entry = fetchedData.find(
  //                   (item) => new Date(item.date).getDate() === dayObj.day &&
  //                           new Date(item.date).getMonth() === today.getMonth()
  //               );
  //           return {
  //               day: dayObj.day,
  //               hours: entry ? entry.sleepNum : 0, // 0 if not entered
  //           };
  //           });
  //   //         const formatted = fetchedData.filter(item => new Date(item.date).getMonth() === today.getMonth())
  //   //   .map(item => ({
  //   //     day: new Date(item.date).getDate(),
  //   //     hours: item.sleepNum,
  //   //   }));
  //           console.log("formatted data")
  //           console.log(formatted)
  //           setData(formatted);
  //       }
  //       func();
  // }, [userId]);

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
        <div className="bg-white border border-gray-300 p-2 rounded">
          <p>Day : {label}</p>
          <p>Studied : {payload[0].value} hrs</p>
        </div>
      );
    }
    return null;
  };


      return (

        <div className="w-full h-80 bg-[rgb(0,0,49)]  pb-12 pt-4 pr-4 rounded-3xl my-8  ">
        <h3 className="text-xl font-semibold mb-2 text-white text-center">Monthly Study Data</h3>
        <ResponsiveContainer>
        <BarChart data={data}  margin={{ left: -20}}  >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" /> */}
        <XAxis dataKey="day"  stroke="white"  />
        <YAxis stroke="white" />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        {/* <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={3} /> */}
         <Bar dataKey="hours" fill="#78C5F5" className="cursor-pointer" />
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default StudyChart;