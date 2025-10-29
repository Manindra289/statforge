"use client"

import { useState } from "react";
import { getUserData } from "../_lib/actions";
import DisplayProfile from "./DisplayProfile";
import FriendItem from "./FriendItem";
import SearchButton from "./SearchButton";
import SearchSection from "./SearchSection";

function CombinedFriendSection({friendsList,userId}) {
    const [data,setData] = useState("");
    const [loading,setLoading] = useState(false);
    // console.log(friendsList)
    const friendIds = friendsList.map(user => user.friendUserId.userId);
    const handleClick = async(userId)=>
    {
        setLoading(true);
        try {
            const userData = await getUserData(userId);
            console.log(userData);
            setData(userData); // ✅ set after data is fetched
            setLoading(false);
          } catch (err) {
            // throw new Error(err)
            setData(null);
            setLoading(false);
          }
    }

  return (
    <section className="flex gap-4 max-lg:flex max-lg:flex-col-reverse">
            <section className="lg:w-[20%] bg-black rounded-2xl pb-3"> 
                <h1 className='text-white text-center font-bold py-3 '>Friends List</h1>
                <div className=' overflow-y-auto max-h-[70vh]'>
                {friendsList.map((friend)=>
                        <div key={friend.friendUserId.userId} onClick={()=> handleClick(friend.friendUserId.userId) }> 
                            <FriendItem  health={friend.friendUserId.health} userName = {friend.friendUserId.userName} avatar = {friend.friendUserId.avatar} />
                        </div>
                  )}
                </div>
              </section>
            <section className="lg:w-[80%] bg-gray-400">
              <div className='bg-yellow-100 py-3 rounded-xl'>
                <SearchButton data={data} setData={setData} userId={userId} loading={loading} setLoading={setLoading} friendIds={friendIds} />
                <DisplayProfile data={data} loading={loading} />
            </div>
            </section>
          </section>
  )
}

export default CombinedFriendSection