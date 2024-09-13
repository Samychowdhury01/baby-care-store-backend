import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { OrderRoutes } from '../modules/order/order.routes';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
