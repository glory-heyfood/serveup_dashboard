import { handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  btnLoading: false,
  earningData: [],
  rewardData: [],
  storeIds: [],
  stores: [],
};

export const createEarningRuleAsync = createAsyncThunk(
  "loyalty/earning/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/create-earning-rule`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const updateEarningRuleAsync = createAsyncThunk(
  "loyalty/earning/update",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/update-earning-rule`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const toggleEarningRuleStatusAsync = createAsyncThunk(
  "loyalty/earning/update-status",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/toggle-earning-rule-status`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const createRewardAsync = createAsyncThunk(
  "loyalty/reward/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/create-reward`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const updateRewardAsync = createAsyncThunk(
  "loyalty/reward/update",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/update-reward`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const toggleRewardStatusAsync = createAsyncThunk(
  "loyalty/reward/update-status",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/toggle-reward-status`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getAllRewardAndEarnings = createAsyncThunk(
  "loyalty/get/reward-earning",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/get-rewards-and-earnings`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteEarningRuleAsync = createAsyncThunk(
  "loyalty/delete/earning",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/delete-earning-rule`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteRewardAsync = createAsyncThunk(
  "loyalty/delete/reward",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/delete-reward`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const updateEarningAndRewardStoreIdsAsync = createAsyncThunk(
  "loyalty/update/reward-and-async",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/reward/business/update-rewards-and-earnings-storeIds`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

const loyalty = createSlice({
  name: "loyalty",
  initialState,
  reducers: {
    updateStoreIds: (state, action) => {
      state.storeIds = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createEarningRuleAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(createEarningRuleAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.btnLoading = false;
        const incomingData = action.payload.data.response;
        const initalData = state.earningData;
        // Find the index of the item to update
        const indexToUpdate = initalData.findIndex(
          (dats) => dats.id === incomingData.id
        );

        if (indexToUpdate !== -1) {
          // Create a new array with the item updated at its original index
          const updatedData = [
            ...initalData.slice(0, indexToUpdate), // Items before the index
            incomingData, // Updated item
            ...initalData.slice(indexToUpdate + 1), // Items after the index
          ];

          // Update the state with the new array
          state.earningData = updatedData;
        } else {
          // If the item is not found, you can handle it here (e.g., add it to the array)
          state.earningData = [...initalData, incomingData];
        }
      })
      .addCase(createEarningRuleAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateEarningRuleAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateEarningRuleAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        const incomingData = action.payload.data.response;
        const initalData = state.earningData;
        // Find the index of the item to update
        const indexToUpdate = initalData.findIndex(
          (dats) => dats.id === incomingData.id
        );

        if (indexToUpdate !== -1) {
          // Create a new array with the item updated at its original index
          const updatedData = [
            ...initalData.slice(0, indexToUpdate), // Items before the index
            incomingData, // Updated item
            ...initalData.slice(indexToUpdate + 1), // Items after the index
          ];

          // Update the state with the new array
          state.earningData = updatedData;
        } else {
          // If the item is not found, you can handle it here (e.g., add it to the array)
          state.earningData = [...initalData, incomingData];
        }
      })
      .addCase(updateEarningRuleAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(toggleEarningRuleStatusAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(toggleEarningRuleStatusAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        const incomingData = action.payload.data.response;
        const initalData = state.earningData;
        // Find the index of the item to update
        const indexToUpdate = initalData.findIndex(
          (dats) => dats.id === incomingData.id
        );

        if (indexToUpdate !== -1) {
          // Create a new array with the item updated at its original index
          const updatedData = [
            ...initalData.slice(0, indexToUpdate), // Items before the index
            incomingData, // Updated item
            ...initalData.slice(indexToUpdate + 1), // Items after the index
          ];

          // Update the state with the new array
          state.earningData = updatedData;
        } else {
          // If the item is not found, you can handle it here (e.g., add it to the array)
          state.earningData = [...initalData, incomingData];
        }
      })
      .addCase(toggleEarningRuleStatusAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(toggleRewardStatusAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(toggleRewardStatusAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        const incomingData = action.payload.data.response;
        const initalData = state.rewardData;
        // Find the index of the item to update
        const indexToUpdate = initalData.findIndex(
          (dats) => dats.id === incomingData.id
        );

        if (indexToUpdate !== -1) {
          // Create a new array with the item updated at its original index
          const updatedData = [
            ...initalData.slice(0, indexToUpdate), // Items before the index
            incomingData, // Updated item
            ...initalData.slice(indexToUpdate + 1), // Items after the index
          ];

          // Update the state with the new array
          state.rewardData = updatedData;
        } else {
          // If the item is not found, you can handle it here (e.g., add it to the array)
          state.rewardData = [...initalData, incomingData];
        }
      })
      .addCase(toggleRewardStatusAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(createRewardAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(createRewardAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.rewardData.push(action.payload.data.response);
      })
      .addCase(createRewardAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateRewardAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateRewardAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        const incomingData = action.payload.data.response;
        const initalData = state.rewardData;
        // Find the index of the item to update
        const indexToUpdate = initalData.findIndex(
          (dats) => dats.id === incomingData.id
        );

        if (indexToUpdate !== -1) {
          // Create a new array with the item updated at its original index
          const updatedData = [
            ...initalData.slice(0, indexToUpdate), // Items before the index
            incomingData, // Updated item
            ...initalData.slice(indexToUpdate + 1), // Items after the index
          ];

          // Update the state with the new array
          state.rewardData = updatedData;
        } else {
          // If the item is not found, you can handle it here (e.g., add it to the array)
          state.rewardData = [...initalData, incomingData];
        }
      })
      .addCase(updateRewardAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(deleteEarningRuleAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(deleteEarningRuleAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.earningData = state.earningData.filter(
          (dat) => dat.id !== action.payload.data.response.id
        );
      })
      .addCase(deleteEarningRuleAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(deleteRewardAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(deleteRewardAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.rewardData = state.rewardData.filter(
          (dat) => dat.id !== action.payload.data.response.id
        );
      })
      .addCase(deleteRewardAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateEarningAndRewardStoreIdsAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(
        updateEarningAndRewardStoreIdsAsync.fulfilled,
        (state, action) => {
          state.btnLoading = false;
        }
      )
      .addCase(
        updateEarningAndRewardStoreIdsAsync.rejected,
        (state, action) => {
          state.btnLoading = false;
        }
      )
      .addCase(getAllRewardAndEarnings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRewardAndEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.earningData = action.payload.data.response.earning_rules;
        state.rewardData = action.payload.data.response.rewards;
        let stores = [];
        if (state.earningData.length > 0) {
          stores = state.earningData[0].store_ids
            ? state.earningData[0].store_ids
            : [];
        } else if (state.rewardData.length > 0) {
          stores = state.rewardData[0].store_ids
            ? state.rewardData[0].store_ids
            : [];
        } else {
          stores = [];
        }
        state.storeIds = stores;
        state.stores = action.payload.data.response.stores;
      });
  },
});

// export const { signupAsync } = employee.actions;
export const { updateStoreIds } = loyalty.actions;
export default loyalty.reducer;
