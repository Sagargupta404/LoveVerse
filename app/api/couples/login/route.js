import { connectDB } from "@/lib/mongodb";
import Couple from "@/models/Couple";

export async function POST(req) {
  await connectDB();
  const { coupleId, pin } = await req.json();

  const couple = await Couple.findById(coupleId);

  if (!couple || couple.pin !== pin) {
    return Response.json({ error: "Invalid PIN" }, { status: 401 });
  }

  return Response.json(couple);
}