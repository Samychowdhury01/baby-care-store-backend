import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router()

// get all product
router.get('/', ProductControllers.getProducts);
// get flash sale products
router.post('/', ProductControllers.createProduct)
// get product by id
router.get('/', ProductControllers.getProductById);
// update product Info
router.put('/', ProductControllers.updateProduct);
// delete Product
router.delete('/', ProductControllers.deleteProduct);

export const ProductRoutes = router