"use client"
import React from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    toast("inside logged out handler")
    try {
      toast.success('User Logged Out');
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
      toast.error('Error logging out');
    }
  };

    return (
        <div id="div1" className="div1 flex flex-col items-center w-[13%] pt-0 h-full overflow-hidden text-gray-400 bg-white ml-0 z-10 fixed">
            <a className="flex items-center justify-center py-3" href="">
                <img className="w-28 mt-3" src="/logo-images/ecohub-logo-no-bg.png" alt="logo" />
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] rounded-xl" href="/dashboard">
                <div className="flex py-4 pl-5 gap-2">
                    <img className="w-5 h-5" src="./logo-images/Dashboard-nav.svg" />
                    <span className="text-md font-medium">Dasboard</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] rounded-xl" href="/schedule">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/News-nav.svg" />
                    <span className="text-md font-medium">Schedule</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] rounded-xl" href="/booking">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Booking-nav.svg" />
                    <span className="text-md font-medium">Bookings</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] rounded-xl" href="/redeem">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Rewards-nav.svg" />
                    <span className="text-md font-medium">Redeem</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] absolute bottom-52 rounded-xl" href="/notification">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Notification-nav.svg" />
                    <span className="text-md font-medium">Notification</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] absolute bottom-36 rounded-xl" href="/support">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Support-nav.svg" />
                    <span className="text-md font-medium">Support</span>
                </div>
            </a>
            <a className="flex items-center w-[150px] h-12 mb-2 hover:text-white hover:bg-[#FFCB0A] absolute bottom-20 rounded-xl" href="/settings">
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Settings.svg" />
                    <span className="text-md font-medium">Settings</span>
                </div>
            </a>
            <div className="flex items-center w-[150px] h-12 mb-2 hover:text-[#E45A5A] hover:bg-[#ffa8a8] absolute bottom-4 rounded-xl cursor-pointer" onClick={handleLogout}>
                <div className="flex py-4 pl-4 gap-2">
                    <img className="w-6 h-6" src="./logo-images/Logout-nav.svg" alt="Logout Icon" />
                    <span className="text-md font-medium">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
