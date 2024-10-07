import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { UserControllers } from './user.controller';

const router = Router();

router.get(
  '/dashboard',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUserDashboardData,
);

export const UserRoutes = router;
