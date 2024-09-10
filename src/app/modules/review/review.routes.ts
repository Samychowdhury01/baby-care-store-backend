import { Router } from "express";
import { ReviewControllers } from "./review.controller";

const router = Router();

router.get('/', ReviewControllers.getReviews)
// create a review
router.get('/', ReviewControllers.createReview)



export const ReviewRoutes = router