import React from 'react'
import { GiSwordsEmblem,GiBrain,GiFeather } from "react-icons/gi";
import { GoPulse } from "react-icons/go";
import { FaDumbbell } from "react-icons/fa6";
export default function StatBar({
  percent,
  color = "bg-blue-600",
  bgColor,
  width,
  category,
  value,
  roundedValue
}) {
  percent = Number(percent);

  return (
    <div className="flex items-center gap-2 my-[4px]">
        <span>
        {/* <FaHeartbeat size={"1.15rem"}/>*/}
        <DisplayLogo size={"1.15rem"} category={category} />
        </span>
      <div className={`${bgColor} rounded-full h-2 max-sm:w-[10rem] w-[20rem]`} >
        <div
          className={`${color} rounded-full transition-all h-2 duration-[3000ms]`}
          style={{ width: `${percent}%`, height: "100%" }}
        ></div>
      </div>
     {value}/{roundedValue}
    </div>
  );
}

function DisplayLogo({category})
{
    if(category=="strength")
        return <FaDumbbell />
    else if(category=="intelligence")
        return <GiBrain />
    else if(category=="wisdom")
        return <GiFeather />
    else if(category=="vitality")
        return <GoPulse />
    else 
        return <GiSwordsEmblem />
}


// export default ProgressBar