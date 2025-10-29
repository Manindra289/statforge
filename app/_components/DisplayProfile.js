import CombinedStat from "./CombinedStat";
import ProfileStats from "./ProfileStats"
import Spinner from "./Spinner";



function DisplayProfile({data,loading}) {

    if(loading)
        return <Spinner/>

    if(data ==="")
        return <div className="flex justify-center mt-20 min-h-60 ">Search for the user</div>

    if(data===null)
        return <div className="flex justify-center mt-20  ">User email not found</div>

    
  return (
    <div className="mx-5 my-2">
        {/* {console.log("this is data ")}
        {console.log(formattedData)}
        {data && 
        <ProfileStats data = {data}/>
        } */}
        <CombinedStat data={data} />
    </div>
  )
}

export default DisplayProfile