import connectDB from "@/lib/mongodb";
import Vendor from "@/lib/vendorModel";

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Vendor.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Vendor.findByIdAndDelete(params.id);
  return Response.json({ message: "Vendor deleted" });
}
