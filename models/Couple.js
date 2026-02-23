import mongoose from "mongoose";

const CoupleSchema = new mongoose.Schema({
  partner1: String,
  partner2: String,
  pin: String, // plain pin (simple version)
  quizScore: Number,
  importantDates: Array,
});

export default mongoose.models.Couple || mongoose.model("Couple", CoupleSchema);