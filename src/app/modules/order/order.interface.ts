import { Types } from 'mongoose';

export type TOrder = {
  username: string;
  userId: Types.ObjectId;
  totalAmount: number;
  quantity: number;
  status?: 'pending' | 'delivered';
};
