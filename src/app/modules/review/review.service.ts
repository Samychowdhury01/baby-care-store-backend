import { TReview } from "./review.interface"
import { Review } from "./review.model"

const getReviewsFromDB = async () => {
  const result = await Review.find()
  return result
}

const createReviewIntoDB = async (payload:TReview) => {
    const result = await Review.create(payload);
    return result
}

export const ReviewServices ={
    getReviewsFromDB,
    createReviewIntoDB
}