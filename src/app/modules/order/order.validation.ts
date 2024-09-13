import { string, z } from 'zod';

const orderCreateValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be string',
    }),
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be string',
    }),
    totalAmount: z.number({
      required_error: 'total Amount is required',
      invalid_type_error: 'total Amount  must be number',
    }),
    quantity: z.number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be number',
    }),
    products: z.array(z.string())
  }),
});

export const orderValidationSchemas = {
    orderCreateValidationSchema
}