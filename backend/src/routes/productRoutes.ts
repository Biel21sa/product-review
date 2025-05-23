import express, { Router, Request, Response } from "express";
import ProductController from "../controllers/productController";

const router: Router = express.Router();
const controller = new ProductController();

function asyncHandler(
  fn: (req: Request, res: Response, next: express.NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/",
  asyncHandler((req: Request, res: Response) =>
    controller.createProduct(req, res)
  )
);
router.get(
  "/",
  asyncHandler((req: Request, res: Response) =>
    controller.getAllProducts(req, res)
  )
);
router.get(
  "/:productId",
  asyncHandler((req: Request, res: Response) =>
    controller.getProductById(req, res)
  )
);
router.get(
  "/:productId/reviews",
  asyncHandler((req: Request, res: Response) =>
    controller.getProductReviews(req, res)
  )
);
router.get(
  "/:productId/average-rating",
  asyncHandler((req: Request, res: Response) =>
    controller.getProductAverageRating(req, res)
  )
);

export default router;
