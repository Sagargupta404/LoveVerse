import { connectDB } from "@/lib/mongodb";
import Couple from "@/models/Couple";

export async function POST(req) {
  try {
    await connectDB();
    const { partner1, partner2, pin } = await req.json();

    const newCouple = await Couple.create({
      partner1,
      partner2,
      pin,
      quizScore: 0,
      importantDates: []
    });

    return Response.json(newCouple);
  } catch (error) {
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}