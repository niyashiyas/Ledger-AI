"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"
import {Navbar} from "../../components/navbar/Navbar"


export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col h-screen bg-[#b9bef5] text-black items-center justify-between p-24 py-0">
      <Navbar/>
    </main>
  );
}
