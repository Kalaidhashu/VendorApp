import connectDB from "@/lib/mongodb";
import Vendor from "@/lib/vendorModel";

export async function GET() {
  try {
    await connectDB();
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    return Response.json(vendors);
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch vendors" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const vendor = await Vendor.create(data);
    return Response.json(vendor);
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: "Failed to add vendor" }), { status: 500 });
  }
}
