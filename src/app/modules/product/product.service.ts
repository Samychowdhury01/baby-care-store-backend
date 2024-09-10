import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.interface';

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const isProductExist = await Product.findById(id);

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return isProductExist;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
