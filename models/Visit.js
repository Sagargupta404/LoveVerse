import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Visit ||
  mongoose.model("Visit", VisitSchema);