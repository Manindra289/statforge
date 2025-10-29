import CombinedChart from "../_components/CombinedChart";
import CombinedSection from "../_components/CombinedSection"
import MobileChart from "../_components/MobileChart";
import NavBar from "../_components/NavBar"
import TrackList from "../_components/TrackList"
import { getUser } from "../_lib/actions";
import { auth } from "../_lib/auth";

async function page() {
  const session = await auth();
  const user =  await getUser(session.user.email)
  if (!session) {
    redirect("/")   // sends user to login page
  }
  // console.log(user);
  return (
    <>
    <NavBar avatar={user.avatar} userId={user.userId}  userName={user.userName} />
      <div className=" flex-1 px-8 max-sm:px-4 py-12 max-lg:py-6">
        <main className="max-w-7xl mx-auto w-full ">
    <div className="grid grid-cols-2 relative gap-12 justify-items-center max-lg:gap-6 max-md:flex max-md:flex-col ">
      <CombinedSection userId={user.userId}/>
    </div>
      <TrackList userId={user.userId}/>

      <CombinedChart userId={user.userId}/>
      
    </main>
    </div>
    </>
  )
}

export default page