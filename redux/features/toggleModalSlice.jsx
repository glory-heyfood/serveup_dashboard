import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	showModal: false,
	showEarnModal: false,
};

const modal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModal: (state, action) => {
			if (action.payload.modal === "earn") {
				state.showEarnModal = action.payload.payload;
			} else {
				state.showModal = action.payload;
			}
		},
	},
});

export const { toggleModal } = modal.actions;
export default modal.reducer;
