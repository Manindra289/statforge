
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
    

    <form action={demoSignInAction}>
      <button className="px-10 py-4 text-lg border rounded-lg font-bold bg-gray-100 hover:bg-gray-200">
        View Demo
      </button>
    </form>
    </>
  )
}

export default SignInButton;
