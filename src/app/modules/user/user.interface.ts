import { Model } from "mongoose";
import { TUserRole } from "../Auth/auth.interface";

export type TUser = {
    name: string;
    email: string;
    password: string;
    role?: TUserRole
    }

 // for custom statics method
export interface TUserModel extends Model<TUser> {
    isUserExist(id: string): Promise<TUser | null>;
    isPasswordMatched(
      plainPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  }