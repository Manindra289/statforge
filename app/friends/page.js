import React from 'react'
import NavBar from '../_components/NavBar'
import { auth } from '../_lib/auth';
import { getFriends, getUser } from '../_lib/actions';
import CombinedFriendSection from '../_components/CombinedFriendSection';
async function Page() {
   const session = await auth();
    const {avatar,userId,userName} =  await getUser(session.user.email)
    if (!session) {
      redirect("/")   // sends user to login page
    }

    const friendsList = await getFriends(userId)

    // now get the friends list by using useQuery


  return (
    <>
    <NavBar avatar={avatar} userId={userId}  userName={userName}/>
    <div className=" flex px-8 max-sm:px-4 py-12 max-lg:py-6">
        <main className="max-w-7xl mx-auto w-full">
        <CombinedFriendSection friendsList={friendsList} userId={userId}/>
        </main>
    </div>
</>
  )
}



export default Page