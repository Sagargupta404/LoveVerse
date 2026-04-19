import { connectDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

export async function POST() {
  await connectDB();

  let visit = await Visit.findOne();

  if (!visit) {
    visit = await Visit.create({ count: 1 });
  } else {
    visit.count += 1;
    await visit.save();
  }

  return Response.json({ count: visit.count });
}