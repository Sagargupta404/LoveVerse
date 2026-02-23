import { connectDB } from "@/lib/mongodb";
import Couple from "@/models/Couple";

export async function GET() {
  await connectDB();
  const couples = await Couple.find({}, "partner1 partner2");
  return Response.json(couples);
}