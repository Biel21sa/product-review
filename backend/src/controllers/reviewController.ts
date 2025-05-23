import { Request, Response } from "express";
import reviewService from "../services/reviewService";

class ReviewController {
  async createReview(req: Request, res: Response): Promise<Response> {
    try {
      const savedReview = await reviewService.createReview(
        req.params.productId,
        req.body
      );
      return res.status(201).json(savedReview);
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async getProductReviews(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await reviewService.getReviewsByProduct(
        req.params.productId
      );
      return res.json(reviews);
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ReviewController;
