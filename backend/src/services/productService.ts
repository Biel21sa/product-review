import productRepository from "../repositories/productRepository";
import reviewRepository from "../repositories/reviewRepository";
import { IProductDocument } from "../repositories/productRepository";
import { IReviewDocument } from "../repositories/reviewRepository";
import { Types } from "mongoose";

class ProductService {
  async createProduct(
    productData: Omit<IProductDocument, "_id" | "createdAt">
  ): Promise<IProductDocument> {
    return await productRepository.create(productData);
  }

  async getAllProducts(): Promise<IProductDocument[]> {
    return await productRepository.findAll();
  }

  async getProductById(id: string): Promise<IProductDocument | null> {
    return await productRepository.findById(id);
  }

  async getReviews(productId: string): Promise<IReviewDocument[]> {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await reviewRepository.findByProductId(
      product._id as Types.ObjectId
    );
  }

  async getAverageRating(productId: string): Promise<number> {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    const reviews = await reviewRepository.findByProductId(
      product._id as Types.ObjectId
    );
    if (!reviews.length) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }
}

export default new ProductService();
