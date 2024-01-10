import { handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	data: [],
};

export const createStoreAsync = createAsyncThunk(
	"employee/create",
	async (payload) => {
		const response = await handleAPI(
			axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/create`,
				payload,
			),
		);
		console.log(response);
		return response;
	},
);

export const getAllStoresAsync = createAsyncThunk(
	"employee/getAll",
	async (payload) => {
		const response = await handleAPI(
			axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/all/${payload}`,
			),
		);
		console.log(response);
        window.localStorage.setItem("serveup_store", JSON.stringify(response.data[0]))
		return response;
	},
);

const store = createSlice({
	name: "store",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder

			.addCase(createStoreAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(createStoreAsync.fulfilled, (state, action) => {
                state.loading = false;
                const newStore = action.payload.data[0];                            
                state.data = [...state.data, newStore];				
			})
			.addCase(createStoreAsync.rejected, (state, action) => {
				state.loading = false;
			})
            .addCase(getAllStoresAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllStoresAsync.fulfilled, (state, action) => {
				state.loading = false;                
				state.data = action.payload.data[0]
			})
			.addCase(getAllStoresAsync.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const {} = store.actions;
export default store.reducer;
