import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';

const createProductIntoDB = async (payload: TProduct) => {
  const isProductExist = await Product.findOne({ name: payload.name });

  if (isProductExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product already exist');
  }
  const category = await Category.findById(payload.categoryId);
  if (!category) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const url = `/${query.categoryUrl}`;

  // to return categorized product
  if (url) {
    const category = await Category.findOne({ url: url });
    if (!category) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
    }
    query.categoryId = category._id;
    delete query.categoryUrl;
  }

  // query builder
  const productsQuery = new QueryBuilder(
    Product.find().populate({
      path: 'categoryId',
      select: 'name url',
    }),
    query,
  )
    .search()
    .filter()
    .paginate()
    .fields();
  const result = await productsQuery.modelQuery;
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
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
