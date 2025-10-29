import Image from "next/image";
import ProfileChart from "./ProfileChart"
import ProfileStats from "./ProfileStats"
import ProgressBar from "./ProgressBar";
import avatar2 from "@/public/avatar.png"

function CombinedStat({data}) {

    const{strength,intelligence, vitality, wisdom, resistance,userName,userId,health ,avatar}= data;

    const maxValue = Math.max(strength, intelligence, vitality, wisdom, resistance);
        // 2️⃣ Round it up to the next hundred
    let roundedValue = Math.ceil(maxValue / 100) * 100;
    if(roundedValue<100)
            roundedValue = 100;

    const formattedData = [
    {
        "category": "Strength",
        "name":"STR",
        "score": strength,
        "fullScore": roundedValue
    },
    {
        "category": "Intelligence",
        "name":"INT",
        "score": intelligence,
        "fullScore": roundedValue
    },
    {
        "category": "Vitality" ,
        "name":"VIT",
        "score": vitality,
        "fullScore": roundedValue
    },
    {
        "category": "Wisdom" ,
        "name":"WIS",
        "score": wisdom,
        "fullScore": roundedValue
    },
    {
        "category": "Resistance",
        "name":"RES",
        "score": resistance,
        "fullScore": roundedValue
    }
    ]



  return (
    <section className='bg-white rounded-3xl p-5  mb-6 text-[#1F1E1E]'> 
        <h1 className="font-bold text-lg mx-5 text-center">{userName} </h1>
        <div className="lg:hidden flex justify-center gap-2 mb-2">
            {/* <Image src={avatar} alt='avatar' height={40} width={40}  className="rounded-full object-cover" />
             */}

            {avatar === null ? <Image src={avatar2} height={40} width={40}   className="rounded-full object-cover" alt="avatar" priority/>
                        : <Image src={avatar} height={40} width={40}  alt="avatar"  className="rounded-full object-cover" priority/>
            }

            <ProgressBar width={"10rem"} name={"Health"} percent={health}  color={"bg-red-600"} bgColor={"bg-gray-200"} />
        </div>
        <hr/>
        <section className="flex justify-evenly gap-5  max-lg:flex-col max-lg:items-center ">
            <div className="">
                <ProfileChart formattedData={formattedData} />
            </div>
            <div>
                <ProfileStats data={data} />
            </div>    
        </section> 
    </section>
  )
}

export default CombinedStat