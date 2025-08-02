import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  address: String
}, { timestamps: true });

export default mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
