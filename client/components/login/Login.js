import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
// import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="bg-[#dee1fa] h-screen flex flex-col gap-4 items-center justify-center text-black">
      <h1 className="text-xl font-bold text-black lg:text-2xl">Log In</h1>
      <input label="email" placeholder="Email" className=" rounded-md p-1 px-2 text-black w-1/6"></input>
      <input label="password" type="password" placeholder="Password" className=" rounded-md p-1 px-2 text-black w-1/6"></input>
      <button className="border-2 border-balck rounded-lg p-1 px-4 bg-gradient-to-tr from-[#4e5587] to-gray-800 text-white hover:text-slate-200 w-1/6" onClick={() => {router.push('./material-requisition')}}>Log In</button>
      <p className="text-gray-700 cursor-pointer" onClick={() => router.push("/signup")}>New here? <span className="text-blue-700">Sign Up</span></p>
    </div>
  )
}
