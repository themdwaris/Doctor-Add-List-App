import connectDatabase from "@/lib/db";
import Doctor from "@/model/doctorModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDatabase();

  const data = await request?.formData();

  const name = data.get("name");
  const profession = data.get("profession");
  const address = data.get("address");
  const fees = Number(data.get("fees"));
  const experience = Number(data.get("experience"));
  const languages = JSON.parse(data.get("languages")||"[]");
  const imageUrl = data.get("imageUrl"); // already uploaded

  if (!name || !profession || !address || !fees || !experience || !languages) {
    return NextResponse.json({
      message: "Required fields missing",
      success: false,
    });
  }

  const newDoctor = new Doctor({
    name,
    profession,
    address,
    fees,
    experience,
    languages,
    avatar: imageUrl,
  });

  await newDoctor.save();

  return NextResponse.json({
    message: "Doctor Added Successfully",
    success: true,
    data:newDoctor
  });
}
