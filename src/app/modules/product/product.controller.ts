import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await ProductServices.createProductIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product created successfully',
    success: true,
    data: result,
  });
});
// get all products from db
const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    success: true,
    data: result,
  });
});


// get single product from db
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    success: true,
    data: result,
  });
});

// update product from db
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ProductServices.updateProductIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    success: true,
    data: result,
  });
});

// delete product from db
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    success: true,
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
