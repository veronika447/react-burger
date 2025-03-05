import type { RootState, AppDispatch } from "../components/app/store";

export type ThunkAPI = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
};

export type IngredientType = {
  _id: string;
  name: string;
  type: "sauce" | "bun" | "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
};

export type User = {
  name: string;
  email: string;
};

type Response = {
  success: boolean;
};

export type LoginRes = Response & {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type ChangeUserDataRes = Response & {
  user: User;
};

export type CheckEmailRes = Response & {
  message: string;
};

export type LogoutRes = Response & {
  message: string;
};

export type OrderNumberRes = Response & {
  order: {
    number: number;
  };
};

export type RefreshTokenRes = Response & {
  accessToken: string;
  refreshToken: string;
};

export type RegisterRes = Response & {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type ResetPasswordRes = Response & {
  message: string;
};

export type GetIngredientsRes = Response & {
  data: IngredientType[];
};

export type Order = {
  ingredients: string[];
  _id: string;
  name: string;
  status: "done" | "pending" | "created";
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type Orders = Array<Order>;

export type OrderFeedData = {
  success: boolean;
  orders: Orders;
  total: number;
  totalToday: number;
};

export type OrderRes = Response & {
  orders: Orders;
};
