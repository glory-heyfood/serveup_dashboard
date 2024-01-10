import { configureStore } from "@reduxjs/toolkit";
import gridSidebarSlice from "./features/gridSidebarSlice";
import toggleSideBarSlice from "./features/toggleSideBarSlice";
import toggleModalSlice from "./features/toggleModalSlice";
import businessSlice from "./features/business/businessSlice";
import employeeSlice from "./features/business/employeeSlice";
import storeSlice from "./features/business/storeSlice";


const store = configureStore({
	reducer: {
        gridSidebar : gridSidebarSlice,
        sidebar: toggleSideBarSlice,
        modal: toggleModalSlice,
        business: businessSlice,
        employee: employeeSlice,
        stores: storeSlice
    },
});

export default store;
