import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { Category } from '../category/category.model';
import { Product } from '../product/product.model';
import { Order } from '../order/order.model';

const getUserDashboardDataFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.role === 'admin') {
    const categoriesCount = await Category.countDocuments({});
    const productsCount = await Product.countDocuments({});
    const orders = await Order.find({}).sort({
      createdAt: -1,
    });
    const pendingOrders = orders.filter(
      (order) => order.status === 'pending',
    ).length;
    const deliveredOrders = orders.filter(
      (order) => order.status === 'delivered',
    ).length;
    return {
      categoriesCount,
      productsCount: productsCount,
      ordersCount: orders.length,
      orders,
      pendingOrders,
      deliveredOrders,
    };
  }
  if (user.role === 'user') {
    const orders = await Order.find({ userId: id }).sort({
      createdAt: -1,
    }).populate({
        path: 'products',
        select : 'name image'
    });
    const pendingOrders = orders.filter(
      (order) => order.status === 'pending',
    ).length;
    const deliveredOrders = orders.filter(
      (order) => order.status === 'delivered',
    ).length;
    return {
      orders,
      pendingOrders,
      deliveredOrders,
    };
  }
};

export const UserServices = {
  getUserDashboardDataFromDB,
};
