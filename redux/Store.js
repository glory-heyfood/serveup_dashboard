import { configureStore } from "@reduxjs/toolkit";
import gridSidebarSlice from "./features/gridSidebarSlice";


const store = configureStore({
	reducer: {
        gridSidebar : gridSidebarSlice
    },
});

export default store;
