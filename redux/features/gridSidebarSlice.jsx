import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {		
	showMarketingGridSidebar: true,
    showLoyaltyGridSidebar: true,
    showWebsiteGridSidebar :true,
    showMobileAppGridSidebar:true,
    showMenusGridSidebar:true,
    showPayoutGridSidebar:true,
    showDineInGridSidebar: true,
    showKitchenSidebar: true,
};




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
        toggleMenusGridSidebar : (state,action) => {
            state.showMenusGridSidebar = action.payload;
        },
        togglePayoutGridSidebar : (state,action) => {            
            state.showPayoutGridSidebar = action.payload;
        },
        toggleDineInGridSidebar: (state, action) => {
            state.showDineInGridSidebar = action.payload;
        },
        toggleKitchenSidebar: (state, action)=>{
            state.showKitchenSidebar = action.payload
        }
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

export const { toggleMarketingGridSidebar, toggleLoyaltyGridSidebar,toggleWebsiteGridSidebar, toggleMobileAppGridSidebar, toggleMenusGridSidebar, togglePayoutGridSidebar, toggleDineInGridSidebar, toggleKitchenSidebar } = gridSidebar.actions;
// export const {} = gridSidebar.actions;
export default gridSidebar.reducer;
