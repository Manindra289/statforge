import React from 'react'

function CategoryButton({children,category,isDone}) {
    //  border-[#A855F7] text-[#9435ed]
    let str= 'text-md rounded-full border m-[1px]  '
    // bg-none
    
    if(category ==='strength'){
        str=str+" border-category-strength"
        str += isDone?' text-category-strength':' text-slate-300'
    }
    else if(category==='intelligence')
    {
        str=str+" border-category-intelligence"
        str += isDone?' text-category-intelligence':' text-slate-300'

    }
    else if(category==='vitality')
    {
        str=str+" border-category-vitality"
        str += isDone?' text-category-vitality':' text-slate-300'
        
    }
    else if(category==='wisdom')
    {
        str=str+" border-category-wisdom"
        str += isDone?' text-category-wisdom':' text-slate-300'
        
    }
    //resistance
    else if(category==="resistance"){
        str=str+" border-category-resistance"
        str += isDone?' text-category-resistance':' text-slate-300'
        // str=str+" border-black "
        // str += isDone?' text-category-Strength':' text-slate-300'
    }
    else {
        str=str+" border-red-500"
        str += isDone?' text-red-500':' text-slate-300'

    }
    



  return (
    <div className={str}>
        {children}
    </div>
  )
}

export default CategoryButton