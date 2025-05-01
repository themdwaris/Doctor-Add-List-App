"use client";
import AddDoctorForm from "@/components/AddDoctorForm";
import Link from "next/link";
import React from "react";


const Home = () => {
  return (
    <div className="w-full min-h-screen py-4">
      <div className="w-full flex items-center justify-center gap-3">
        <h1 className="text-center py-5 text-2xl font-bold text-blue-500">
          Add doctors
        </h1>
        <Link
          href={{pathname:"/destination"}}
          
          className="px-3 py-2 rounded-md cursor-pointer transition transform active:scale-90 text-white bg-blue-500 text-base font-medium"
          
        >
          Destination page
        </Link>
      </div>
      <div className="w-full max-w-4xl mx-auto rounded-2xl border border-blue-200 p-5">
        <AddDoctorForm />
      </div>
    </div>
  );
};

export default Home;
