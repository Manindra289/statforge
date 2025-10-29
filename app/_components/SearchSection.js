"use client"
import { useState } from 'react'
import SearchButton from './SearchButton'
import DisplayProfile from './DisplayProfile'
import useFriendsData from '../_lib/hooks/useFriendsData';
import Spinner from './Spinner';

function SearchSection({userId}) {
    const [data,setData] = useState("");
    const [loading,setLoading] = useState(false);

    // const { isLoading, error, data:friendsList } = useFriendsData(userId);
    // if(isLoading)
    //     return <Spinner/>
    // if(error)
    //     throw new Error(error)

  return (
    <div className='bg-yellow-100 h-[100%] rounded-xl'>
        <SearchButton data={data} setData={setData} userId={userId} loading={loading} setLoading={setLoading} />
        <DisplayProfile data={data} loading={loading} />
    </div>
  )
}

export default SearchSection