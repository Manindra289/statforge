"use client"

import toast from "react-hot-toast";
import useUpdateUserData from "../_lib/hooks/useUpdateUserData";
import useUserData from "../_lib/hooks/useUserData";
import Spinner from "./Spinner";
import AverageChart from "./AverageChart";

function UserName({userId}) {
    const {userData, isUserLoading} = useUserData(userId);
    const { isUpdating, updateData } = useUpdateUserData();
    if (isUserLoading) 
        return <Spinner />;

    const {userName} = userData;

    if (isUserLoading) return <Spinner />;
    
    function handleUpdate(e, field) {
    const { value } = e.target;
    // console.log(value )
    // console.log(userName)
    if(value === userName)
        return;
    if(value.length < 4 ){
        e.target.value = userName;
        toast.error("Username should contain minimum 4 characters")
        return
    }
    if(value.length>15){    
        e.target.value = userName;
        toast.error("Username should contain maximum 15 characters")
        return
    }
    if (!value) 
        return;
    updateData({[field] : value, userId:userId});
  }
  function handleSubmit(e) {
      // e.preventDefault(); // prevent page reload

      const formData = new FormData(e.target);
      const value = formData.get("userName").trim(); // get input value
      // console.log(formData)
      // console.log(value);
      // console.log(userName);

      // Validation checks
      if (value === userName) return;

      if (value.length < 4) {
        toast.error("Username should contain minimum 4 characters");
        return;
      }

      if (value.length > 15) {
        toast.error("Username should contain maximum 15 characters");
        return;
      }

      if (!value) return;

      // Update the data
      updateData({ userName: value, userId });
    }




  return (
    <div className="flex flex-col ">
    
    <form onSubmit={handleSubmit}>
        Update Your userName : 
        <input type="text" className="bg-gray-400 px-2 rounded-lg py-1 mx-2 "
          id="userName"
          name="userName"
          minLength="4"
          maxLength="15"
          defaultValue={userName}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "userName")}
        />
        {/* Email : 
        <input type="text"
          id="userName"
          defaultValue={email}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "email")}
        /> */}
    </form>

    <AverageChart userId={userId}/>



    </div>
  )
}

export default UserName