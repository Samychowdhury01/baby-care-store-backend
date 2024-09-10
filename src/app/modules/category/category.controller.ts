import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await CategoryServices.createCategoryIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  getCategories,
  createCategory,
};
