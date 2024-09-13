/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { role } from './user.constant';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: role,
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// hashing password before saving into DB
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.sault_rounds));
  next();
});

// set empty string password property
userSchema.post('save', function (doc: any, next) {
  // Convert the document to an object and remove the fields
  delete doc._doc.password;

  next();
});

// statics method to find out user exist or not
userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({
    _id: id,
  });
  return existingUser;
};

// statics method to compare the password
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, TUserModel>('User', userSchema);
