

import NavBar from "../_components/NavBar";
import { getUser, getUserData } from "../_lib/actions";
import { auth } from "../_lib/auth";
import ProfileChart from "../_components/ProfileChart";
import { supabase } from "../_lib/supabase";
import ProfileStats from "../_components/ProfileStats";
import UserName from "../_components/UserName";
import CombinedStat from "../_components/CombinedStat";

async function Page()
{
    const session = await auth();
    const user =  await getUser(session.user.email)
    if (!session) {
          redirect("/")   // sends user to login page
    }
    const {avatar,userId,userName} = user;    
    const data = await getUserData(userId);

    


    return <>
    <NavBar avatar={avatar} userId={userId}  userName={userName}/>
    <div className=" flex flex-col px-8 py-12 max-lg:py-6">
   
        <main className="max-w-7xl mx-auto w-full flex justify-center items-center">
            {/* <section className='bg-white rounded-3xl p-5   mb-6 text-[#1F1E1E]'> 
                <h1 className="font-bold text-lg mx-5">{userName} </h1>
                <hr/> */}

                <CombinedStat data = {data}/>

            {/* </section> */}

        </main>

    <main className="max-w-7xl mx-auto w-full flex justify-center items-center">
        <section className='bg-white rounded-3xl p-5  mb-6 text-[#1F1E1E]'> 
            <div className='text-[#1F1E1E]'>
                <UserName userId={userId}/>
            </div>
    </section>
    </main>


    </div>
</>
}
export default Page;
