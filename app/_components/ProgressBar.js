import React from 'react'
import { FaHeartbeat } from "react-icons/fa";

export default function ProgressBar({
  name,
  percent,
  color = "bg-blue-600",
  bgColor,
  width,
}) {
  percent = Number(percent);

  return (
    <div className="flex items-center gap-2 my-[4px]">
      <div
        className={`${bgColor} rounded-full h-2`}
        style={{ width: width, }}
      >
        <div
          className={`${color} rounded-full transition-all h-2 duration-[3000ms]`}
          style={{ width: `${percent}%`, height: "100%" }}
        ></div>
      </div>
      <span> 
        <FaHeartbeat size={"1.15rem"}/>
        </span>
    </div>
  );
}



// export default ProgressBar