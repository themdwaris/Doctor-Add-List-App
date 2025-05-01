import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;

// console.log(process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-files");
  //    const res = await fetch(url,{
  //     method:"post",
  //     body:formData
  //    })
  //    const data = await res.json()
  //    return data
  try {
    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = res?.data;
    return data;
  } catch (error) {
    console.log("Failed to upload avatar:", error);
  }
};

export default uploadFile;
