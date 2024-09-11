import { FilterQuery, Query, Types } from 'mongoose';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search(searchableFields: string[]) {
  //   const searchTerm = this?.query?.searchTerm;
  //   if (searchTerm) {
  //     this.modelQuery = this.modelQuery.find({
  //       $or: searchableFields.map(
  //         (field) =>
  //           ({
  //             [field]: { $regex: searchTerm, $options: 'i' },
  //           }) as FilterQuery<T>,
  //       ),
  //     });
  //   }

  //   return this;
  // }

  search() {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        name: { $regex: searchTerm, $options: 'i' },
      } as FilterQuery<T>);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // Copy the query object

    // Fields to exclude from filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Apply categoryId filter if it exists
    if (queryObj.categoryId) {
      if (typeof queryObj.categoryId === 'string') {
        queryObj.categoryId = new Types.ObjectId(queryObj.categoryId);
      } else {
      // Apply the categoryId filter directly
        this.modelQuery = this.modelQuery.find({
          categoryId: queryObj.categoryId,
        } as FilterQuery<T>);
      }
      // Remove categoryId from the queryObj to prevent reapplying
      delete queryObj.categoryId;
    }

    // Apply remaining filters
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
