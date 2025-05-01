"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi2";

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center justify-center gap-0.5 border-b border-b-gray-200 md:border-0">
        <div className="w-full flex items-center justify-between  px-5 sm:px-16 md:px-28 lg:px-36 py-2">
           <img src='https://images.apollo247.in/images/icons/apollo247.svg' alt="logo" className="w-16 md:w-20"/>
           <button className="px-3 py-1.5 outline-none rounded-md bg-white md:border border-blue-500 font-medium text-sm flex items-center justify-between gap-2.5 transition transform active:scale-90">
            <span className="hidden md:inline-block text-blue-500 font-bold">Login</span>
            <span className="text-blue-500"><HiOutlineUserCircle size={25}/></span>
           </button>
        </div>
      <div className="hidden w-full md:flex justify-center items-center border-y border-y-gray-200 py-2.5">
        <nav className="flex items-center gap-5 font-semibold text-gray-900">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Doctors</Link>
        <Link href="/">Doctors</Link>
        <Link href="/">Doctors</Link>
        <Link href="/">Doctors</Link>
        <Link href="/">Doctors</Link>
        <Link href="/">Doctors</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
