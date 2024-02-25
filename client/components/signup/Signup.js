import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const handleSignUp = async () => {
  //   try {
  //     // const response = await axios.post('http://localhost:7000/api/signup', {
  //     //   email,password,role
  //     // });
  //     // console.log("Pickup scheduled successfully:", response.data);

  //     // Call the signUp function from authService.js
  //     toast.success("User Created");
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.error("Error during signup:", error.message);
  //     toast.error(error.message);
  //     // Handle error (display message to the user, etc.)
  //   }
  // };

  return (
    <div className="h-screen">
      <div className="bg-[#dee1fa] h-screen flex flex-col gap-4 items-center justify-center">
        <h1 className="text-xl font-bold text-black lg:text-2xl">Sign Up</h1>
        <input
          label="email"
          placeholder="Email"
          className=" rounded-md p-1 px-2 text-black w-1/6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          label="password"
          placeholder="Password"
          className=" rounded-md p-1 px-2 text-black w-1/6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="border-2 border-balck rounded-lg p-1 px-4 bg-gradient-to-tr from-[#4e5587] to-gray-800 text-white hover:text-slate-200 w-1/6"
          onClick={() => {}}
        >
          Sign Up
        </button>
        <p
          className="text-gray-700 cursor-pointer"
          onClick={() => router.push("/signin")}
        >
          Have an account? <span className="text-blue-700">Log In.</span>
        </p>
      </div>
    </div>
  );
}
