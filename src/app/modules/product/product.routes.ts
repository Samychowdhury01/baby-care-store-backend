import { Router } from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = Router();

// get all product
router.get('/', ProductControllers.getProducts);
// get create sale products
router.post('/', auth(USER_ROLE.admin), ProductControllers.createProduct);
// get product by id
router.get('/:id', ProductControllers.getProductById);
// update product Info
router.put('/:id', auth(USER_ROLE.admin), ProductControllers.updateProduct);
// delete Product
router.delete('/:id', auth(USER_ROLE.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
