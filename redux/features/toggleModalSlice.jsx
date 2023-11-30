import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	showModal: false,
	showEarnModal: false,
	showOuterModal: false,
};

const modal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModal: (state, action) => {
			switch (action.payload.modal) {
				case "earn":
					state.showEarnModal = action.payload.payload;
					break;
                case "outer":
                    state.showOuterModal = action.payload.payload
                    break;
				default:
					state.showModal = action.payload;
			}
		},
	},
});

export const { toggleModal } = modal.actions;
export default modal.reducer;
