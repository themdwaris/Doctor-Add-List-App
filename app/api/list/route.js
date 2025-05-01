
import connectDatabase from "@/lib/db";
import Doctor from "@/model/doctorModel";

import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDatabase();

  const { searchParams } = new URL(req.url);
  
  
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 6;
  const search = searchParams.get('search')?.trim()
  const sort = searchParams.get("sort"); // "lowToHigh" or "highToLow"
  const languages = searchParams.getAll("language"); // ["English", "Hindi"]
  const expRanges = searchParams.getAll("experience"); // ["0-2", "3-5"]
  const feeRanges = searchParams.getAll("fees"); // ["0-500", "500-1000"]

  const filter = {};

  // Language filter
  if (languages.length > 0) {
    filter.languages = { $in: languages };
  }

  // Experience filter using OR logic for ranges
  if (expRanges.length > 0) {
    const expOr = expRanges.map((range) => {
      const [min, max] = range.split("-").map(Number);
      return max ? { experience: { $gte: min, $lte: max } } : { experience: { $gte: min } };
    });
    filter.$or = expOr;
  }

  // Fees filter
  if (feeRanges.length > 0) {
    const feeOr = feeRanges.map((range) => {
      const [min, max] = range.includes("+")
        ? [parseInt(range), null]
        : range.split("-").map(Number);
      return max
        ? { fees: { $gte: min, $lte: max } }
        : { fees: { $gte: min } };
    });

    // Combine with experience OR filter
    if (filter.$or) {
      const combined = [];
      for (const expCond of filter.$or) {
        for (const feeCond of feeOr) {
          combined.push({ $and: [expCond, feeCond] });
        }
      }
      filter.$or = combined;
    } else {
      filter.$or = feeOr;
    }
  }

   // 🔍 Search by name/profession
   if (search) {
    const searchFilter = [
      { name: { $regex: search, $options: "i" } },
      { profession: { $regex: search, $options: "i" } },
    ];
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchFilter }];
      delete filter.$or;
    } else {
      filter.$or = searchFilter;
    }
  }

  const sortOption =
    sort === "lowToHigh" ? { fees: 1 } : sort === "highToLow" ? { fees: -1 } : {};

  const total = await Doctor.countDocuments(filter);
  const doctors = await Doctor.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({
    success: true,
    doctors,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}
