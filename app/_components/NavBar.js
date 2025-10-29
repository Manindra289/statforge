import Link from 'next/link'
import Logo from './Logo'
import Profile from './Profile'
import { IoMenu } from "react-icons/io5";

import SignOut from './SignOut';
import MobileNavBar from './MobileNavBar';

function NavBar() {
  return (
    <>
    <header className=' border-b border-black z-10 border-primary-900 px-8 py-3 text-xl max-sm:text-lg '>
    <div className='flex justify-between items-center max-w-7xl mx-auto  px-2 py-1 rounded-xl'>
        <Logo/>
            <div className='flex gap-1 z-10 items-center max-sm:hidden'>
                <NavButton href={"/dashboard"}>Dashboard</NavButton>
                <NavButton href={"/habits"}>Habits</NavButton>
                <NavButton href={"/friends"}>Friends</NavButton>

                {/* <NavButton href={"/public"}>Public</NavButton> */}
                <Profile />
                <SignOut />      
            </div>

        <MobileNavBar />
    </div>
    </header>
    
    
    </>
    
  )
}



function NavButton({children, href})
{
    return <Link className='text-white p-3 hover:text-black text-lg hover:bg-slate-200 py-2 lg:px-6 rounded-full transition-all duration-[1000ms]' href={href}>
         {children} 
         </Link>
}

export default NavBar