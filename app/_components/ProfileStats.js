import React from 'react'
import StatBar from './StatBar';

function ProfileStats({data}) {
    const{strength,intelligence, vitality, wisdom, resistance }= data;
    const maxValue = Math.max(strength, intelligence, vitality, wisdom, resistance);
        // 2️⃣ Round it up to the next hundred
    let roundedValue = Math.ceil(maxValue / 100) * 100;
    if(roundedValue<100)
            roundedValue = 100;

  return (
    <div className='px-4'>
    <h1>Strength</h1>
    <StatBar roundedValue={roundedValue} width={"10rem"} category={"strength"} value={strength} percent={(strength/roundedValue)*100}  color={"bg-category-strength"} bgColor={"bg-gray-200"} /> 
    <h1>Intelligence</h1>
    <StatBar roundedValue={roundedValue} width={"10rem"} category={"intelligence"} value={intelligence}  percent={(intelligence/roundedValue)*100}  color={"bg-category-intelligence"} bgColor={"bg-gray-200"} />
    <h1>Vitality</h1>
    <StatBar roundedValue={roundedValue} width={"10rem"} category={"vitality"}  value={vitality} percent={(vitality/roundedValue)*100}  color={"bg-category-vitality"} bgColor={"bg-gray-200"} />
    <h1>Wisdom</h1>
    <StatBar roundedValue={roundedValue} width={"10rem"} category={"wisdom"}  value={wisdom}  percent={(wisdom/roundedValue)*100}  color={"bg-category-wisdom"} bgColor={"bg-gray-200"} />
    <h1>Resistance</h1>
    <StatBar roundedValue={roundedValue} width={"10rem"} category={"resistance"}  value={resistance} percent={(resistance/roundedValue)*100}  color={"bg-category-resistance"} bgColor={"bg-gray-200"} />
    </div>

  )
}

export default ProfileStats