import Review from "../models/Review";
import { Document, Types } from "mongoose";

export interface IReviewDocument extends Document {
  productId: Types.ObjectId;
  author?: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

class ReviewRepository {
  async create(
    reviewData: Omit<IReviewDocument, "_id" | "createdAt">
  ): Promise<IReviewDocument> {
    const review = new Review(reviewData);
    return await review.save();
  }

  async findByProductId(productId: Types.ObjectId): Promise<IReviewDocument[]> {
    return await Review.find({ productId });
  }
}

export default new ReviewRepository();
