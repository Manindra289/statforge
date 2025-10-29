import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png"
import SignInButton from "./_components/SignInButton";
import { auth } from "./_lib/auth";
import { getUser } from "./_lib/actions";

export default async function Page() {
  const session = await auth();
  // const user =  await getUser(session.user.email)
  return (
    <>
      <main className="mt-28 max-sm:mt-16"> 
      <Image src={bg} fill  alt="With house" className="object-cover object-top" />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl text-black mb-10 tracking-tight font-normal max-sm:text-3xl ">
          Build Yourself Here.
        </h1>
        {session ? <Link
        href="/dashboard"
        className="bg-yellow-400 px-8 py-6 text-white-800 text-lg font-semibold rounded-lg
        hover:bg-yellow-500 transition-all max-sm:text-lg max-sm:px-4 max-sm:py-3 ">
          Open Dashboard
      </Link> :  <div className="flex justify-center"> 
        <SignInButton/>
      </div> }
        
      {/* <div className="flex justify-center"> 
        <SignInButton/>
      </div> */}
      </div>
    </main>

    </>
  );
}
