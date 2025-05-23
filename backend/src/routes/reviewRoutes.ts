import express, { Router, Request, Response, NextFunction } from "express";
import ReviewController from "../controllers/reviewController";

const router: Router = express.Router({ mergeParams: true });
const controller = new ReviewController();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/",
  asyncHandler((req: Request, res: Response) =>
    controller.createReview(req, res)
  )
);
router.get(
  "/",
  asyncHandler((req: Request, res: Response) =>
    controller.getProductReviews(req, res)
  )
);

export default router;
