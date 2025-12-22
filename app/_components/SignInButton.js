
import Image from "next/image";
import { demoSignInAction, signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <>
    <form action={signInAction}>

    <button className='flex items-center gap-6 px-10 py-4  text-lg border border-black hover:border-gray-600 rounded-lg font-bold'>
      <Image
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height='24'
        width='24'
      />
      <span>Continue with Google</span>
    </button>
    </form>
    <br/>

    <form action={demoSignInAction} className="mt-4">
      <button className="bg-yellow-400 px-8 py-6 text-white-800 text-lg font-semibold rounded-lg
        hover:bg-yellow-500 transition-all max-sm:text-lg max-sm:px-4 max-sm:py-3 ">
        View Demo
      </button>
    </form>
    </>
  )
}

export default SignInButton;
