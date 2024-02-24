import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
// import axios from "axios"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import {firebaseauth} from "../../firebase"
import toast, { Toaster } from 'react-hot-toast';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseauth)

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password)
      .then(()=>{
        toast.success("User Logged In")
        router.push('/dashboard')
      }
      )
    }catch(e){
      console.log(e);
      toast.error(e)
    }
  }
  const router = useRouter()


  return (
    <div className="bg-white h-screen flex flex-col gap-4 items-center justify-center text-black">
      <h1 className="text-xl font-bold text-black lg:text-2xl">Log In</h1>
      <p className="-mt-3 text-black">Let's Keep Our World Clean Together!</p>
      <input label="email" placeholder="Email" className="border-2 border-black rounded-md p-1 px-2 text-black w-1/6"></input>
      <input label="password" type="password" placeholder="Password" className="border-2 border-black rounded-md p-1 px-2 text-black w-1/6"></input>
      <button className="border-2 border-balck rounded-lg p-1 px-4 text-black bg-[#009743] hover:bg-[#2a724a] hover:text-white w-1/6" onClick={handleSignIn}>Log In</button>
      <p className="text-gray-700 cursor-pointer" onClick={() => router.push("/signup")}>New here? <span className="text-red-400">Sign Up</span></p>
    </div>
  )
}
