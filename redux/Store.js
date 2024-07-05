import { configureStore } from "@reduxjs/toolkit";
import gridSidebarSlice from "./features/gridSidebarSlice";
import toggleSideBarSlice from "./features/toggleSideBarSlice";
import toggleModalSlice from "./features/toggleModalSlice";
import businessSlice from "./features/business/businessSlice";
import employeeSlice from "./features/business/employeeSlice";
import storeSlice from "./features/business/storeSlice";
import menuSlice from "./features/stores/menuSlice";
import dineInSlice from "./features/stores/dineInSlice";
import kitchenSlice from "./features/stores/kitchenSlice";
import orderSlice from "./features/stores/orderSlice";

const store = configureStore({
  reducer: {
    gridSidebar: gridSidebarSlice,
    sidebar: toggleSideBarSlice,
    modal: toggleModalSlice,
    business: businessSlice,
    employee: employeeSlice,
    stores: storeSlice,
    menu: menuSlice,
    dineIn: dineInSlice,
    kitchen: kitchenSlice,
    order: orderSlice,
  },
});

export default store;
