import { USER_ROLE } from "./auth.constant";

export type TUserRole = keyof typeof USER_ROLE;


export type TLoginUser = {
    email: string;
    password: string;
  };
  

