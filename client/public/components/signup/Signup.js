import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../context/authService";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async () => {
    try {
      // const response = await axios.post('http://localhost:7000/api/signup', {
      //   email,password,role
      // });
      // console.log("Pickup scheduled successfully:", response.data);

      // Call the signUp function from authService.js
      toast.success("User Created");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error.message);
      toast.error(error.message);
      // Handle error (display message to the user, etc.)
    }
  };

  return (
    <div className="h-screen">
      <div className="bg-white h-screen flex flex-col gap-4 items-center justify-center">
        <h1 className="text-xl font-bold text-black lg:text-2xl">Sign Up</h1>
        <p className="-mt-3 text-black">
        Join Us in Building a Cleaner Tomorrow
        </p>
        <input
          label="email"
          placeholder="Email"
          className="border-2 border-black rounded-md p-1 px-2 text-black w-1/6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          label="password"
          placeholder="Password"
          className="border-2 border-black rounded-md p-1 px-2 text-black w-1/6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <select
          className="border-2 border-black rounded-md p-1 px-2 text-black w-1/6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled default selected>
            Select Your Role
          </option>
          <option>Client</option>
          <option>Waste Manager</option>
        </select>
        <button
          className="border-2 border-blue-500 bg-[#009743] rounded-lg p-1 px-2 w-1/6 hover:bg-[#2a724a] hover:text-white"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p
          className="text-gray-700 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Have an account? <span className="text-red-500">Log In.</span>
        </p>
      </div>
    </div>
  );
}
