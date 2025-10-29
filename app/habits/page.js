
import { Suspense,lazy } from "react";



import NavBar from "../_components/NavBar"
import { getUser } from "../_lib/actions";
import { auth } from "../_lib/auth";
import Spinner from "../_components/Spinner";


const GoodHabits = lazy(() => import("../_components/GoodHabits"));
const BadHabits = lazy(() => import("../_components/BadHabits"));
export const metadata = {
  title: "Habits | StatForge",
  icons: {
    icon: "/logo.png",
  },
};


async function page() {
  const session = await auth();
  const user =  await getUser(session.user.email)
  if (!session) {
      redirect("/")   // sends user to login page
  }
  const {avatar,userId,userName} = user;
    
  // const tasks = await getGoodHabits(user.id);

  return (
<>
    <NavBar avatar={avatar} userId={userId}  userName={userName}/>
    <div className=" flex-1 px-8 max-sm:px-4 py-12 max-lg:py-6">
        <main className="max-w-7xl mx-auto w-full">
        <Suspense fallback={<Spinner/>}>
            <GoodHabits userId={userId} />
          </Suspense>
          
          <Suspense fallback={<Spinner/>}>
              <BadHabits userId={userId}  />
          </Suspense>
        </main>
    </div>
</>
  )
}

export default page