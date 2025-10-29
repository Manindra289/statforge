
import avatar2 from "@/public/avatar.png"
import ProgressBar from '../_components/ProgressBar';
import Image from "next/image";
export default function FriendItem({userName,health, avatar})
{
  let name = userName;
  if(name.length > 15)
    name = userName.slice(0,12)+"...";

  return(
    <div className=" cursor-pointer rounded-lg bg-white flex justify-between  items-center  px-2 gap-4 py-3 mx-3 my-2">
            <div className="">
                {/* <ProgressBar width={"10rem"} name={"XP"} percent={"10"}  color={"bg-green-600"} bgColor={"bg-gray-200"} /> */}
                {/* USERNAME SHOULD BE LESS THAN 10 CHARACTERS  */}
                <p className="items-center font-bold">{ name }</p>
                {/* <ProgressBar width={"8rem"} name={"Health"} percent={health}  color={"bg-red-600"} bgColor={"bg-gray-200"} /> */}
            </div>
            <div className=" ">
              {avatar === null ? <Image src={avatar2} height={50} width={50}  className="rounded-full  " alt="avatar"/>
                : <Image src={avatar} height={50} width={50}  className=" rounded-full" alt="avatar"/>
                }
            </div>
        </div>
)

}