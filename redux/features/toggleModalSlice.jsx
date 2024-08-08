import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showEarnModal: false,
  showOuterModal: false,
  campaignModal: false,
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
          state.showOuterModal = action.payload.payload;
          break;
        default:
          state.showModal = action.payload;
      }
    },
    toggleCampaignModal: (state, action) => {
		console.log(action.payload)
      state.campaignModal = action.payload;
    },
  },
});

export const { toggleModal, toggleCampaignModal } = modal.actions;
export default modal.reducer;
