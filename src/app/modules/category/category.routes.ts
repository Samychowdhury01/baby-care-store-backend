import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidationSchemas } from './category.validation';

const router = Router();

router.get('/', CategoryControllers.getCategories);
router.post(
  '/',
  validateRequest(categoryValidationSchemas.categoryValidationSchema),
  CategoryControllers.createCategory,
);

export const CategoryRoutes = router;
