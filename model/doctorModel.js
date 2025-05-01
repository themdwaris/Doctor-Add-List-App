import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  address: { type: String, required: true },
  fees: { type: Number, required: true, default: 0 },
  experience: { type: Number, required: true, default: 0 },
  languages: { type: Array, required: true, default: [] },
  avatar:{type:String,default:""}
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
