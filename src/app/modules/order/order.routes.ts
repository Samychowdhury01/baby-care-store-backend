import { Router } from 'express';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchemas } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = Router();
// create order
router.post(
  '/',
  validateRequest(orderValidationSchemas.orderCreateValidationSchema),
  auth(USER_ROLE.user),
  OrderControllers.createOrder,
);
// get all orders (for ADMIN)
router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrders);

// get a specific user's order (for User)
router.get('/:userId', auth(USER_ROLE.user), OrderControllers.getUserOrders);

// update order status
router.put('/:orderId', auth(USER_ROLE.admin), OrderControllers.updateOrderStatus);
export const OrderRoutes = router;
