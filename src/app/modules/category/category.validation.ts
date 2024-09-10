import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'Name is required',
    }),
    image: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'Name is required',
    }),
    url: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'Name is required',
    }),
  }),
});

export const categoryValidationSchemas = {
  categoryValidationSchema,
};
