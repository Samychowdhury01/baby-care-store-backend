import { Types } from "mongoose";

export type TProduct = {
    name: string;
    image: string;
    price: number;
    rating: number;
    description: string;
    features: string[];
    categoryId: Types.ObjectId;
    isFlashSale?: boolean;
    isDeleted?: boolean
}