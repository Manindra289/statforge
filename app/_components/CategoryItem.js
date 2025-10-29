import React from 'react'

const CategoryItem = ({category}) => {

  let str = " text-xs font-bold border my-4 rounded-full p-2 ";
  if(category==='strength')
    str+="border-category-strength text-category-strength "
  else if(category==='intelligence')
    str+="border-category-intelligence text-category-intelligence "
  else if(category==='vitality')
    str+="border-category-vitality text-category-vitality "
  else if(category==='wisdom')
    str+="border-category-wisdom text-category-wisdom "
  else if(category==='resistance')
    str+="border-category-resistance text-category-resistance "
  else 
    str+="border-black text-black "
 return(
    <span className={str}>
        {category}
        </span>)
}

export default CategoryItem