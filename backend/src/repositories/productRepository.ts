import Product from "../models/Product";
import { Document } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  description?: string;
  price: number;
  category?: string;
  createdAt?: Date;
}

class ProductRepository {
  async create(
    productData: Omit<IProductDocument, "_id" | "createdAt">
  ): Promise<IProductDocument> {
    const product = new Product(productData);
    return await product.save();
  }

  async findAll(): Promise<IProductDocument[]> {
    return await Product.find();
  }

  async findById(id: string): Promise<IProductDocument | null> {
    return await Product.findById(id);
  }
}

export default new ProductRepository();
