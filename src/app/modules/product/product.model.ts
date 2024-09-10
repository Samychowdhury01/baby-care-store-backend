/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

    isFlashSale: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  },
);

productSchema.post('save', async function (doc: any, next) {
  delete doc._doc.isDeleted;
  next();
});
// pre hook to filter out deleted document
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});
// pre hook to filter out deleted document
productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

export const Product = model<TProduct>('Product', productSchema);
