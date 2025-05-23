import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
