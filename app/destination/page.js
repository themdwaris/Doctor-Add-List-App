"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { TiFilter } from "react-icons/ti";
import DoctorCard from "@/components/DoctorCard";
import axios from "axios";
import Loader from "@/components/Loader";

const Destination = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [fees, setFees] = useState([]);
  const [exps, setExps] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterByExp = (e) => {
    const { name } = e.target;
    if (exps.includes(name)) {
      setExps((prev) => prev.filter((exp) => exp !== name));
    } else {
      setExps((prev) => [...prev, name]);
    }
  };
  const filterByFees = (e) => {
    const { name } = e.target;
    if (fees.includes(name)) {
      setFees((prev) => prev.filter((fee) => fee !== name));
    } else {
      setFees((prev) => [...prev, name]);
    }
  };
  const filterByLanguage = (e) => {
    const { name } = e.target;
    if (languages.includes(name)) {
      setLanguages((prev) => prev.filter((lang) => lang !== name));
    } else {
      setLanguages((prev) => [...prev, name]);
    }
  };

  const fetchDoctors = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      search && params.append("search", search);
      exps.forEach((e) => params.append("experience", e));
      fees.forEach((f) => params.append("fees", f));
      languages.forEach((l) => params.append("language", l));
      sort && params.append("sort", sort);

      setLoading(true);
      const res = await axios.get(`/api/list?${params.toString()}`);
      if (res?.data?.success) {
        setDoctors(res.data.doctors);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      setTimeout(() => {
        fetchDoctors();
      }, 300);
    } else {
      fetchDoctors();
    }
  }, [exps, fees, languages, page, sort, search]);

  const clearFilter = () => {
    setExps([]);
    setFees([]);
    setLanguages([]);
    setSort("");
    setShowFilter(false);
  };

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 pt-6 sm:pt-10 ">
      <div className="min-w-60 mb-5 sm:h-screen sm:sticky sm:top-20">
        <div className="w-full flex items-center justify-between">
          <p
            className="flex items-center gap-2 text-xl text-gray-700 cursor-pointer my-2 sm:cursor-default"
            onClick={() => setShowFilter(!showFilter)}
          >
            <button className="px-3 py-1 rounded-lg border border-gray-300 cursor-pointer transition transform active:scale-90 flex items-center gap-1 justify-center">
              <span>
                <TiFilter size={25} />
              </span>
              <span className="text-sm font-semibold">Filters</span>
            </button>
            <span
              className={`w-2 sm:hidden inline-block transition-all ${
                showFilter && "rotate-90"
              }`}
            >
              <IoIosArrowForward size={20} />
            </span>
          </p>
          <span
            className="text-sm font-semibold text-red-900 cursor-pointer"
            onClick={clearFilter}
          >
            Clear All
          </span>
        </div>
        <div className={`${showFilter ? "" : "hidden"} sm:block`}>
          <div
            className={`border border-gray-300 py-2 pl-5 mt-6 flex flex-col gap-2`}
          >
            <p className="pb-1 text-gray-800 font-medium">EXPERINECE</p>
            <label htmlFor="EXP1" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="0-5"
                id="EXP1"
                className="w-3"
                checked={exps.includes("0-5")}
                onChange={filterByExp}
              />
              <span className="text-gray-900 text-sm font-light pl-1 leading-3">
                0-5
              </span>
            </label>
            <label htmlFor="exp2" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="6-10"
                id="exp2"
                className="w-3"
                checked={exps.includes("6-10")}
                onChange={filterByExp}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                6-10
              </span>
            </label>
            <label htmlFor="exp3" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="11-16"
                id="exp3"
                className="w-3"
                checked={exps.includes("11-16")}
                onChange={filterByExp}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                11-16
              </span>
            </label>
          </div>
          <div
            className={`border border-gray-300 py-2 pl-5 mt-6 flex flex-col gap-2`}
          >
            <p className="pb-1 text-gray-800 font-medium">Fees</p>
            <label htmlFor="p1" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="100-500"
                id="p1"
                className="w-3"
                checked={fees.includes("100-500")}
                onChange={filterByFees}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                100-500
              </span>
            </label>
            <label htmlFor="p2" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="500-1000"
                id="p2"
                className="w-3"
                checked={fees.includes("500-1000")}
                onChange={filterByFees}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                500-1000
              </span>
            </label>
            <label htmlFor="p3" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="1000+"
                id="p3"
                className="w-3"
                checked={fees.includes("1000+")}
                onChange={filterByFees}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                1000+
              </span>
            </label>
          </div>

          <div
            className={`border border-gray-300 py-2 pl-5 mt-6 flex flex-col gap-2`}
          >
            <p className="pb-1 text-gray-800 font-medium">Fees</p>
            <label htmlFor="english" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="English"
                id="english"
                className="w-3"
                checked={languages.includes("English")}
                onChange={filterByLanguage}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                English
              </span>
            </label>
            <label htmlFor="hindi" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="Hindi"
                id="hindi"
                className="w-3"
                checked={languages.includes("Hindi")}
                onChange={filterByLanguage}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                Hindi
              </span>
            </label>
            <label htmlFor="urdu" className="flex items-center gap-1">
              <input
                type="checkbox"
                name="Urdu"
                id="urdu"
                className="w-3"
                checked={languages.includes("Urdu")}
                onChange={filterByLanguage}
              />
              <span className="text-gray-900 text-sm font-light pl-1">
                Urdu
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grow">
        <div className="w-full max-w-3xl flex justify-between gap-2">
          <div className="md:pl-8 w-full max-w-[400px] flex justify-start items-center px-2 py-2 rounded-md bg-slate-100">
            <span className="text-black/60">
              <BiSearchAlt size={20} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 outline-none border-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            name="priceWise"
            id=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border-[1.5px] font-semibold text-gray-500 border-blue-500 rounded-md w-[140px] sm:w-fit outline-blue-400 hover:bg-blue-100"
          >
            <option hidden className="font-semibold">
              Availablity
            </option>
            <option value="">Relavent</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {doctors && !loading && doctors?.length === 0 && (
          <div className="w-full max-w-3xl h-[60%] flex items-center justify-center py-6">
            <h1 className="text-xl font-semibold text-gray-900">
              No Doctor Found
            </h1>
          </div>
        )}
        {loading ? (
          <div className="w-full max-w-3xl h-[80%] md:h-[60%] flex items-center justify-center py-6">
            <Loader />
          </div>
        ) : (
          <div className="mt-6 w-full flex flex-col gap-5 mb-8">
            {doctors &&
              doctors?.length > 0 &&
              doctors?.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
          </div>
        )}

        {doctors && doctors?.length < 6 ? null : (
          <div className="my-10 w-full max-w-3xl flex items-center justify-center gap-5">
            <button
              disabled={page === 1}
              className={`px-2 py-1 rounded-md bg-blue-950 text-sm font-semibold cursor-pointer transition transform active:scale-90 text-white ${
                page === 1 && "opacity-70"
              }`}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span className="text-base font-semibold">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              className={`px-2 py-1 rounded-md bg-blue-950 text-sm font-semibold cursor-pointer transition transform active:scale-90 text-white ${
                page >= totalPages && "opacity-70"
              }`}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destination;
