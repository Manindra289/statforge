"use client";

import { useState } from "react";
import { AddFriend, getUser, RemoveFriend } from "../_lib/actions";
import toast from "react-hot-toast";
import Hero from "./Hero";

export default function SearchButton({data,setData,userId,loading,setLoading, friendIds}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  function toggleShowForm()
  {
      setShowForm((showForm)=> !showForm)
  }
  
  // Function to validate email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSearch = async () => {
    // console.log("handleSearch is called. ")
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    try {
        const userData = await getUser(email);
        // console.log(userData);
        setData(userData); // ✅ set after data is fetched
        setLoading(false);
  } catch (err) {
    // throw new Error(err)
    setData(null);
    setLoading(false);
  }
    // setData(()=>{
    //     return getUser(email);
    // })
    // console.log("Searching for:", email);
    // 👉 you can call your API or backend search function here
  };
  // function handleSubmit(e)
  // {
  //   e.preventDefault();
  //   handleSearch();
  // }

  function handleAddFriend()
  {
    setLoading(true);
    const addFriend  = async()=>{
          await AddFriend(userId, data.userId);
        }
    toast.promise(addFriend, {
                        loading: 'Saving...',
                        success: <b>Added new friend</b>,
                        error: <b>Could not Add.</b>,
      })
      
      setLoading(false)

  }

  function handleRemoveFriend()
  {
    setLoading(true);
    const removeFriend  = async()=>{
          await RemoveFriend(userId, data.userId);
          
        }
    toast.promise(removeFriend, {
                        loading: 'Saving...',
                        success: <b>Removed the friend</b>,
                        error: <b>Could not Remove.</b>,
      })
    setLoading(false)
  }



  return (
    <div className="flex flex-col md:items-center  max-md:items-stretch  ">
      {/* <div className="flex items-center "> */}
        <div className="rounded-2xl p-2 flex gap-3 max-md:flex-col max-md:justify-end ">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="border border-gray-300 rounded-lg px-3 py-2 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            <div className="flex justify-center gap-2">
                <button 
                  disabled={loading}
                  onClick={handleSearch}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer ${loading ? 'bg-blue-600 cursor-not-allowed' : ''}`}
                  value="Search"
                >Submit </button>

                {data !== "" && data !== null  && !friendIds.includes(data.userId) && userId != data.userId &&
                <button disabled={loading} onClick={handleAddFriend} className={`bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition ${loading ? 'bg-green-600 cursor-not-allowed' : ''}`}>
                  Add friend 
                </button>}

                {data !== "" && data !== null  && friendIds.includes(data.userId) && userId != data.userId &&
                  <button disabled={loading} onClick={toggleShowForm} className={`bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition ${loading ? 'bg-red-600 cursor-not-allowed' : ''}`}>
                    Remove friend
                  </button>}
            </div>


        

        </div>
        
        
        
      
      {/* </div> */}
        

      {error && <p className="text-red-500">{error}</p>}
      
      {showForm && 
        <Hero toggleChange={toggleShowForm}>
          <div className="p-8">
          <h1 className="font-bold mb-4"> Are you sure to remove friend ? </h1>
          <div className="flex flex-row gap-4 justify-end ">
        <button onClick={toggleShowForm} className="block border rounded-full hover:bg-gray-300 border-gray-200 px-4 py-1"><b> No</b></button>
        <button className="block border rounded-full hover:bg-red-700 bg-red-600 text-white border-gray-200 px-4 py-1 "
        onClick={()=>{
        toggleShowForm();  
        handleRemoveFriend();
        // toast.promise(updateHabit(habitId,section) ,{
        //       loading: 'Loading...',
        //       success: <b>Habit deleted</b>,
        //       error: <b>Error Occured, Try again.</b>,
        // })
        }}        
        ><b>Delete</b></button>
       </div>
        </div>
        {/* {children} */}
        </Hero>}



    </div>
  );
}
