import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const getAllCategoriesFromDB = async () => {};

const createCategoryIntoDB = async (payload: TCategory) => {
  const isNameAvailable = await Category.findOne({ name: payload.name });
  if (isNameAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'category is already available with this name',
    );
  }
  const result = await Category.create(payload);
  return result;
};

export const CategoryServices = {
  getAllCategoriesFromDB,
  createCategoryIntoDB,
};
