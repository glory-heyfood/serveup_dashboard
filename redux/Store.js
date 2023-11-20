import { configureStore } from "@reduxjs/toolkit";
import gridSidebarSlice from "./features/gridSidebarSlice";
import toggleSideBarSlice from "./features/toggleSideBarSlice";


const store = configureStore({
	reducer: {
        gridSidebar : gridSidebarSlice,
        sidebar: toggleSideBarSlice
    },
});

export default store;
