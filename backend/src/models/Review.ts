import mongoose, { Schema, Document, Types } from "mongoose";

interface IReview extends Document {
  productId: Types.ObjectId;
  author?: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

const ReviewSchema: Schema<IReview> = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  author: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
