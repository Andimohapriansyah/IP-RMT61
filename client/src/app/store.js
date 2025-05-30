import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import menuReducer from "./features/menu/menuSlice";
import ordersReducer from "./features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    orders: ordersReducer,
  },
});
