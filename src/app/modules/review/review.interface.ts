import { Types } from "mongoose";

export type TReview = {
    name : string;
    review: string;
    productId: Types.ObjectId
}