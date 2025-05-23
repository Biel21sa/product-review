import { Request, Response } from "express";
import productService from "../services/productService";

class ProductController {
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const savedProduct = await productService.createProduct(req.body);
      return res.status(201).json(savedProduct);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.getAllProducts();
      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getProductReviews(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await productService.getReviews(req.params.productId);
      return res.json(reviews);
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async getProductAverageRating(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const averageRating = await productService.getAverageRating(
        req.params.productId
      );
      return res.json({ averageRating });
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
