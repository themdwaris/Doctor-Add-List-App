import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

const DoctorCard = ({doctor}) => {
  const address= doctor?.address?.split(" ")
  return (
    <div className="p-5 rounded-lg border border-gray-300 max-w-3xl grid grid-cols-1 md:grid-cols-2 items-start">
      <div className="flex gap-2.5">
        <img
          src={doctor?.avatar}
          alt="profile"
          className="w-20 object-contain rounded-lg"
        />
        <div className="flex flex-col gap-1.5 pt-2">
          <p className="text-balance font-bold text-black/90">
            {doctor?.name}
          </p>
          <p className="text-sm text-gray-400 font-semibold">
            {doctor?.profession}
          </p>
          <p className="text-sm text-gray-400 font-semibold">{doctor?.address}</p>
          <p className="text-sm text-gray-400 font-semibold">
            Apollo 24/7 Clinic | {address[address?.length-1]}
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="hidden md:block">
          <p className="mb-3 text-center">
            <span className="text-base font-bold text-black/90">₹{doctor?.fees}</span> |
            <span className="text-xs font-semibold text-orange-900">
              &nbsp;$60 Cashback
            </span>
          </p>
          <button className="w-full px-3 py-1.5 rounded-lg border border-blue-500 text-blue-500 flex flex-col items-center cursor-pointer transition transform  active:scale-90">
            <span className="text-sm font-bold">Consult Online</span>
            <span className="text-xs ">Available in 15 minutes</span>
          </button>
        </div>
        <div className="w-full flex items-center justify-between gap-4 mt-5">
          <button className="bg-blue-500 text-white p-3 w-full rounded-lg cursor-pointer transition transform active:scale-90 flex items-center justify-center gap-1">
            <span>
              <IoCallOutline size={18} />
            </span>
            <span className="text-sm font-semibold">Call To Book</span>
          </button>
          <button className="text-blue-500 bg-white border border-blue-500 p-3 w-full rounded-lg cursor-pointer transition transform active:scale-90 flex items-center justify-center gap-1">
            <span>
              <LuCalendarDays size={18} />
            </span>
            <span className="text-sm font-semibold">Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
