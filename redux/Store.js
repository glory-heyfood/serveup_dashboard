import { configureStore } from "@reduxjs/toolkit";
import gridSidebarSlice from "./features/gridSidebarSlice";
import toggleSideBarSlice from "./features/toggleSideBarSlice";
import toggleModalSlice from "./features/toggleModalSlice";


const store = configureStore({
	reducer: {
        gridSidebar : gridSidebarSlice,
        sidebar: toggleSideBarSlice,
        modal: toggleModalSlice
    },
});

export default store;
