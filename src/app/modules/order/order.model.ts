import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delivered'],
    default: 'pending',
  },
});

export const Order = model<TOrder>('Order', orderSchema);
