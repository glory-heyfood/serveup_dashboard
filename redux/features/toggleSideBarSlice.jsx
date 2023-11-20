import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {		
	showSidebar: true,
};




const sidebar = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar: (state, action) => {	
            console.log(action.payload + "sidebar")					
			state.showSidebar = action.payload;
		},
		
	},

	
});

export const { toggleSidebar } = sidebar.actions;
export default sidebar.reducer;
