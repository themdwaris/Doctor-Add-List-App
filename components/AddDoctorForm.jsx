import uploadFile from "@/lib/uploadFile";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AddDoctorForm = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [fees, setFees] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    e.stopPropagation();
    try {
      const file = e.target.files[0];
      const userAvatar = await uploadFile(file);
      setImageUrl(userAvatar?.url);
      // setData((prev) => ({ ...prev, avatar: userAvatar?.url }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguages = (e) => {
    const { name } = e.target;
    if (languages.includes(name)) {
      setLanguages((prev) => prev.filter((lang) => lang !== name));
    } else {
      setLanguages((prev) => [...prev, name]);
    }
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    console.log("hello");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("profession", profession);
      formData.append("address", address);
      formData.append("fees", fees);
      formData.append("experience", experience);
      formData.append("languages", JSON.stringify(languages));
      imageUrl && formData.append("imageUrl", imageUrl);

      setLoading(true);
      const res = await axios.post("/api/add", formData);
      // console.log(res);

      if (res?.data?.success) {
        // console.log(res.data);
        toast.success("Doctor added successfully");
        setLoading(false);
        setName("");
        setProfession("");
        setAddress("");
        setFees("");
        setExperience("");
        setLanguages([]);
        setImageUrl("");
        setFile(null);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || error);
      console.log("Failed to add data::", error);
    }
  };

  return (
    <form
      onSubmit={handleAddForm}
      className="w-full max-w-3xl mx-auto flex flex-col gap-4 relative"
    >
      {loading && (
        <div className="absolute inset-0 backdrop-blur-xs flex items-center justify-center h-full">
          <Loader />
        </div>
      )}

      <div>
        <p className="text-base font-medium text-slate-500 mb-2">
          Upload Profile
        </p>
        <label
          htmlFor="add-profile"
          className="inline-block relative w-20 h-20 cursor-pointer rounded-full"
        >
          <input
            type="file"
            hidden
            name="file"
            id="add-profile"
            onChange={(e) => setFile(e.target.files[0])}
            onChangeCapture={handleImageUpload}
          />
          <img
            src={file ? URL.createObjectURL(file) : "/add-profile.jpg"}
            alt="add-profile-icon"
            className="w-20 h-20 rounded-full object-cover absolute transition transform active:scale-90"
          />
        </label>
      </div>

      <div>
        <p className="mb-3 text-base font-medium text-slate-500">Add Name</p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl px-3 py-2 outline-blue-900 border-none bg-black/5"
        />
      </div>

      <div>
        <p className="mb-3 text-base font-medium text-slate-500">
          Add Profession
        </p>
        <input
          type="text"
          placeholder="Profession"
          name="profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="w-full rounded-md px-3 py-2 outline-blue-900 border-none bg-black/10"
        />
      </div>

      <div>
        <p className="mb-3 text-base font-medium text-slate-500">
          Experience in years
        </p>
        <input
          type="number"
          placeholder="Experience"
          name="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="rounded-md px-3 py-2 outline-blue-900 border-none bg-black/10"
        />
      </div>

      <div>
        <p className="mb-3 text-base font-medium text-slate-500">
          Add Location
        </p>
        <input
          type="text"
          placeholder="Add loaction"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-md px-3 py-2 outline-blue-900 border-none bg-black/10"
        />
      </div>
      <div>
        <p className="mb-3 text-base font-medium text-slate-500">Fees</p>
        <input
          type="number"
          placeholder="Fees"
          name="fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          className="rounded-md px-3 py-2 outline-blue-900 border-none bg-black/10"
        />
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <div>
          <label
            htmlFor="English"
            className={`inline-block text-white cursor-pointer p-1 text-xs leading-3 ${
              languages.includes("English") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            English
          </label>
          <input
            type="checkbox"
            name="English"
            id="English"
            hidden
            onChange={handleLanguages}
          />
        </div>

        <div>
          <label
            htmlFor="Hindi"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Hindi") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Hindi
          </label>
          <input
            type="checkbox"
            name="Hindi"
            id="Hindi"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Urdu"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Urdu") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Urdu
          </label>
          <input
            type="checkbox"
            name="Urdu"
            id="Urdu"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Tamil"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Tamil") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Tamil
          </label>
          <input
            type="checkbox"
            name="Tamil"
            id="Tamil"
            hidden
            onChange={handleLanguages}
          />
        </div>

        <div>
          <label
            htmlFor="Punjabi"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Punjabi") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Punjabi
          </label>
          <input
            type="checkbox"
            name="Punjabi"
            id="Punjabi"
            hidden
            onChange={handleLanguages}
          />
        </div>

        <div>
          <label
            htmlFor="Gujrati"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Gujrati") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Gujrati
          </label>
          <input
            type="checkbox"
            name="Gujrati"
            id="Gujrati"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Bengali"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Bengali") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Bengali
          </label>
          <input
            type="checkbox"
            name="Bengali"
            id="Bengali"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Marathi"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Marathi") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Marathi
          </label>
          <input
            type="checkbox"
            name="Marathi"
            id="Marathi"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Kannada"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Kannada") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Kannada
          </label>
          <input
            type="checkbox"
            name="Kannada"
            id="Kannada"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Malyalam"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Malyalam") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Malyalam
          </label>
          <input
            type="checkbox"
            name="Malyalam"
            id="Malyalam"
            hidden
            onChange={handleLanguages}
          />
        </div>
        <div>
          <label
            htmlFor="Telgu"
            className={`inline-block text-white cursor-pointer px-1 py-0.5 text-xs  ${
              languages.includes("Telgu") ? "bg-blue-900" : "bg-blue-500"
            }`}
          >
            Telgu
          </label>
          <input
            type="checkbox"
            name="Telgu"
            id="Telgu"
            hidden
            onChange={handleLanguages}
          />
        </div>
      </div>
      <button
      disabled={loading}
        type="submit"
        className={`w-28 text-white px-6 py-2 bg-blue-500 cursor-pointer transition transform active:scale-90 mt-5 text-base font-bold ${loading&&"opacity-70"}`}
        onClick={handleAddForm}
      >
        Add
      </button>
    </form>
  );
};

export default AddDoctorForm;
