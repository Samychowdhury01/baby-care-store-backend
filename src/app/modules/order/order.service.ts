import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Types } from 'mongoose';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};
const getUserOrdersFromDB = async (id: string) => {
  const userId = new Types.ObjectId(id);
  const orders = await Order.find({
    userId,
  }).populate({
    path: 'products',
    select: 'name image',
  });
  if (!orders) {
    throw new AppError(httpStatus.NOT_FOUND, 'order not fond');
  }
  return orders;
};

const getAllOrdersFromDB = async () => {
  const orders = await Order.find();
  return orders;
};

const updateOrderStatusIntoDB = async (id: string) => {
  const isOrderExist = await Order.findById(id);
  if (!isOrderExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'order not fond');
  }
  const updateStatus = await Order.findByIdAndUpdate(id, {
    status: 'delivered',
  });
  return updateStatus;
};
export const OrderServices = {
  createOrderIntoDB,
  getUserOrdersFromDB,
  getAllOrdersFromDB,
  updateOrderStatusIntoDB,
};
