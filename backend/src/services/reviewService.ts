import reviewRepository from "../repositories/reviewRepository";
import productRepository from "../repositories/productRepository";
import { IReviewDocument } from "../repositories/reviewRepository";
import { Types } from "mongoose";

class ReviewService {
  async createReview(
    productId: string,
    reviewData: Omit<IReviewDocument, "_id" | "createdAt" | "productId">
  ): Promise<IReviewDocument> {
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    const reviewInput: Omit<IReviewDocument, "_id" | "createdAt"> = {
      ...reviewData,
      productId: product._id as Types.ObjectId,
    };
    return await reviewRepository.create(reviewInput);
  }

  async getReviewsByProduct(productId: string): Promise<IReviewDocument[]> {
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await reviewRepository.findByProductId(
      product._id as Types.ObjectId
    );
  }
}

export default new ReviewService();
