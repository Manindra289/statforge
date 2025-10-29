import Image from "next/image"
import ProgressBar from "./ProgressBar"
import avatar2 from "@/public/avatar.png"
import { getHealth, getUser } from "../_lib/actions";
import { auth } from "../_lib/auth";
import Link from "next/link";
import { HiUser } from "react-icons/hi2";

async function Profile() {

  // const[dropDown, setDropDown] = useState(false)

  // function ToggleDropDown()
  // {
  //     setDropDown(dropDown=> !dropDown)
  // }
   const session = await auth();

    const {avatar,userId,userName} =  await getUser(session.user.email)
    if (!session) {
      redirect("/")   // sends user to login page
    } 
    // avatar={user.avatar} 
    // userId={user.userId}  userName={user.userName}


  const arr = await getHealth(userId);
  const health = arr[0].health;
  let name = userName;
  if(name.length > 15)
    name = userName.slice(0,12)+"...";



  return (
    <Link href="/profile">
      <div className="lg:hidden rounded-full hover:bg-slate-200  cursor-pointer hover:text-black transition-all duration-[1000ms] right-10 font-bold text-3xl text-white ">
        {/* <HiUser /> */}

        {avatar === null ? <Image src={avatar2} height={40} width={40}   className="rounded-full object-cover" alt="avatar" priority/>
            : <Image src={avatar} height={40} width={40}  alt="avatar"  className="rounded-full object-cover" priority/>
        }
      </div>

    <div className=" cursor-pointer max-lg:hidden rounded-lg bg-white flex h-full justify-between w-[18rem] px-2 gap-4 py-3 mr-1">
        <div className="flex flex-col rounded-full">
            {/* <ProgressBar width={"10rem"} name={"XP"} percent={"10"}  color={"bg-green-600"} bgColor={"bg-gray-200"} /> */}
            {/* USERNAME SHOULD BE LESS THAN 10 CHARACTERS  */}
            <p className="text-center font-bold max-w-[10rem]">{ name }</p>
            {}
            <ProgressBar width={"10rem"} name={"Health"} percent={health}  color={"bg-red-600"} bgColor={"bg-gray-200"} />
        </div>
        <div className="relative h-14 w-14 ">
            {avatar === null ? <Image src={avatar2} height={60} width={60}   className="rounded-full object-cover" alt="avatar" priority/>
            : <Image src={avatar} height={60} width={60}  alt="avatar"  className="rounded-full object-cover" priority/>
            }
        </div>
    </div>
    </Link>
    
    
  )
}

export default Profile