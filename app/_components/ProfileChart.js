"use client"

import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

function ProfileChart({formattedData}) {

  const fullScore = formattedData[0].fullScore;
  return (
    
    <RadarChart outerRadius={90} width={300} height={300} data={formattedData} >
        <PolarGrid stroke="#555"     />
        <PolarRadiusAxis className="hidden"  domain={[0, fullScore]} />
        <PolarAngleAxis dataKey="name" stroke="#555"  />
        <Radar  dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.9} />
    </RadarChart>
  )
}

export default ProfileChart