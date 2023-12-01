import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {		
	showMarketingGridSidebar: true,
    showLoyaltyGridSidebar: true,
    showWebsiteGridSidebar :true,
    showMobileAppGridSidebar:true
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
		toggleMarketingGridSidebar: (state, action) => {		
			state.showMarketingGridSidebar = action.payload;
		},
		
        toggleLoyaltyGridSidebar: (state, action) => {		
			state.showLoyaltyGridSidebar = action.payload;
		},

        toggleWebsiteGridSidebar: (state, action) => {		
			state.showWebsiteGridSidebar = action.payload;
		},   
        toggleMobileAppGridSidebar: (state, action) => {		
			state.showMobileAppGridSidebar = action.payload;
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

export const { toggleMarketingGridSidebar, toggleLoyaltyGridSidebar,toggleWebsiteGridSidebar, toggleMobileAppGridSidebar } = gridSidebar.actions;
// export const {} = gridSidebar.actions;
export default gridSidebar.reducer;
