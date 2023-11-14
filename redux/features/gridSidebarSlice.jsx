import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {		
	showGridSidebar: true,
};

// The createAsyncThunk fetches the APIs from the backend
// This is where i consumed the APIs

// export const getFoodTabAsync = createAsyncThunk(
// 	"foodTab/getFoodTabAsync",
// 	async (payload, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.get(`${BASE_URL}/api/foodTab/`);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	},
// );


const gridSidebar = createSlice({
	name: "gridSidebar",
	initialState,
	reducers: {
		toggleGridSidebar: (state, action) => {
			console.log("heyy");
			console.log(action.payload);
			state.showGridSidebar = action.payload;
		},
		
	},

	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getFoodTabAsync.pending, (state) => {
	// 			state.loading = true;
	// 		})
	// 		.addCase(getFoodTabAsync.fulfilled, (state, action) => {
	// 			state.loading = false;
	// 		})
	// 		.addCase(getFoodTabAsync.rejected, (state, action) => {
	// 			state.loading = false;
	// 		})
	// 		.addCase(getFoodsRestaurantAsync.pending, (state) => {
	// 			state.loading = true;
	// 		})
	// 		.addCase(getFoodsRestaurantAsync.fulfilled, (state, action) => {
	// 			(state.loading = false), (state.data = action.payload);
	// 			console.log(state.data);
	// 		})
	// 		.addCase(getFoodsRestaurantAsync.rejected, (state, action) => {
	// 			state.loading = false;
	// 		});
	// },
});

export const { toggleGridSidebar } = gridSidebar.actions;
// export const {} = gridSidebar.actions;
export default gridSidebar.reducer;
