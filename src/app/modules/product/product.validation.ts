import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be in string format',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be in number format',
      })
      .positive(),
    description: z.string(),
    image: z.string({
      required_error: 'Image is required',
      invalid_type_error: 'Image must be in url format',
    }),
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be in number format',
      })
      .positive(),
    features: z
      .string({
        required_error: 'Features is required',
        invalid_type_error: 'Features must be in string format',
      })
      .array(),
    categoryId: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be in string format',
    }),
    isFlashSale: z
      .boolean({
        invalid_type_error: 'isFlashSale must be in boolean format',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be in boolean format',
      })
      .optional(),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be in string format',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be in number format',
      })
      .positive()
      .optional(),
    description: z.string().optional(),
    image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image must be in url format',
      })
      .optional(),
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be in number format',
      })
      .positive()
      .optional(),
    features: z
      .string({
        required_error: 'Features is required',
        invalid_type_error: 'Features must be in string format',
      })
      .array()
      .optional(),
    categoryId: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be in string format',
      })
      .optional(),
    isFlashSale: z
      .boolean({
        invalid_type_error: 'isFlashSale must be in boolean format',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be in boolean format',
      })
      .optional(),
  }),
});

export const productValidationSchemas = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
