"use client"
import { useEffect, useState } from 'react'
import TrackItem from './TrackItem'
import { addTrackerData, getTrackerData, updateTrackerData } from '../_lib/actions';
import toast from 'react-hot-toast';
import useTrackerData from '../_lib/hooks/useTrackerData';
import Spinner from './Spinner';
import { useQueryClient } from '@tanstack/react-query';

function TrackList({userId}) {
    // maintain states, and ids
    // const {register, handleSubmit } = useForm();
    
    // const onSubmit = (data) => console.log(data);


    const [sleepHrs, setSleepHrs] = useState("");
    const [mobileHrs, setMobileHrs] = useState("");
    const [studyHrs, setStudyHrs] = useState("");

    const [sleepMins, setSleepMins] = useState("");
    const [mobileMins, setMobileMins] = useState("");
    const [studyMins, setStudyMins] = useState("");

    const [trackerId,setTrackerId] = useState();

    const sleepStr =sleepHrs+":"+sleepMins;
    const mobileStr= mobileHrs+":"+mobileMins;
    const studyStr = studyHrs+":"+studyMins;
    // const [trackerId, setTrackerId] = useState();
    
    
    const {data,isLoading,error} = useTrackerData(userId);
    const queryClient = useQueryClient();

    useEffect(() => 
    {
      if(isLoading) 
        return;
      if (!data) return;
      
      const updatedData = data[0];

      let [mhr, mMins] = updatedData.mobileStr.split(":")
      setMobileHrs(mhr)
      setMobileMins(mMins)
      let [shr, sMins] = updatedData.sleepStr.split(":")
      setSleepHrs(shr)
      setSleepMins(sMins)
      let [sthr, stMins] = updatedData.studyStr.split(":")
      setStudyHrs(sthr)
      setStudyMins(stMins)

      setTrackerId(updatedData.trackerId);
      
    }, [data,isLoading]);

    if(isLoading)
        return <Spinner/>
    
    if(error) throw new Error("Track data error")

    function handleSubmit(e)
    {
      e.preventDefault();
      // console.log(sleepHrs + " : "+sleepMins)
      // console.log(mobileHrs + " : "+mobileMins)
      // console.log(studyHrs + " : "+studyMins)

      // now combine each of them and send it to the server.
      let sleepNum = 0;
      let mobileNum = 0;
      let studyNum = 0;
      if(sleepHrs === "" && sleepMins==="" )
        sleepNum = 0;
      else if(sleepHrs==="")
        sleepNum = Number( praseInt( sleepMins/60 ).toFixed(1) )
      else if(sleepMins==="")
        sleepNum= parseInt(sleepHrs)
      else 
        sleepNum =  Number( (parseInt( sleepHrs) + (sleepMins)/60).toFixed(1) );
      
      if(mobileHrs === "" && mobileMins==="" )
        mobileNum = 0;
      else if(mobileHrs==="")
        mobileNum = Number( praseInt( mobileMins/60 ).toFixed(1) )
      else if(mobileMins==="")
        mobileNum= parseInt(mobileHrs)
      else 
        mobileNum =  Number( (parseInt( mobileHrs) + (mobileMins)/60).toFixed(1) );

      if(studyHrs === "" && studyMins==="" )
        studyNum = 0;
      else if(studyHrs==="")
        studyNum = Number( praseInt( studyMins/60 ).toFixed(1) )
      else if(studyMins==="")
        studyNum= parseInt(studyHrs)
      else 
        studyNum =  Number( (parseInt( studyHrs) + (studyMins)/60).toFixed(1) );

      // studyNum = Number( (parseInt( studyHrs) + (studyMins)/60).toFixed(1) );
      // console.log(sleepNum)
      // console.log(studyNum)
      // console.log(mobileNum)
      const sum = sleepNum+studyNum+mobileNum;
      if(sum>24){
          toast.error("Invaild data entered")

      }
      else{
        // trackerId
        const tempData = {
          trackerId,
          userId,
          sleepNum,
          mobileNum,
          studyNum,
          sleepStr,
          mobileStr,
          studyStr
        }
        const updateData = async() => 
        {
          await updateTrackerData(tempData);
        }

        // updateTrackerData(tempData);
        toast.promise(updateData,{
                        loading: 'Saving...',
                        success: ()=> {
                          queryClient.invalidateQueries(
                            {
                                queryKey:["completeSleepTrackerData"],
                                exact: true,   
                                refetchInactive: true
                            }
                          );
                          queryClient.invalidateQueries({
                            queryKey:["completeMobileTrackerData"],
                            exact: true,   
                            refetchInactive: true
                          });
                          queryClient.invalidateQueries({
                            queryKey:["completeStudyTrackerData"],
                            exact: true,   
                            refetchInactive: true
                          });

                          queryClient.invalidateQueries({ 
                            queryKey:["trackerData"],
                            exact: true,   
                            refetchInactive: true
                        });
                          

                          return (<b>Tracker data Updated.</b>)
                        },
                        error: <b>Could not save.</b>,
        })

      }
      

      
      
    }

  return (
    <form className='py-1 rounded-3xl bg-slate-300 my-12 pb-10' onSubmit={handleSubmit} >
    <div className="flex justify-evenly mx-auto my-10 max-md:flex max-md:flex-col max-md:items-center max-md:gap-5">
        
      <TrackItem title={"Sleep"} hrs={sleepHrs} setHrs={setSleepHrs} mins={sleepMins} setMins={setSleepMins} />
      <TrackItem title={"Study"} hrs={studyHrs} setHrs={setStudyHrs} mins={studyMins} setMins={setStudyMins} />
      <TrackItem title={"Mobile"} hrs={mobileHrs} setHrs={setMobileHrs} mins={mobileMins} setMins={setMobileMins} />
    </div>
    <div className='flex justify-center'> 
        <input type='submit' className='bg-white p-2 rounded-2xl hover:cursor-pointer font-bold px-4' value={"Submit time"} />    
    </div>
    </form>

  )
}

export default TrackList