import { storeID } from "@/data";
import { getStore, handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  singleData: {},
  counts: {},
  codeStatus: null,
  codeLoading: null,
};

export const createPromotionAsync = createAsyncThunk(
  "promotion/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/create`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const updatePromotionAsync = createAsyncThunk(
  "qrCode/update",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/update`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const deletePromotionAsync = createAsyncThunk(
  "qrCode/delete",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/delete`,
        payload
      )
    );
    return response;
  }
);

export const togglePromotionStatusAsync = createAsyncThunk(
  "promotion/deactivate",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/toggle-status`,
        payload
      )
    );
    return response;
  }
);

export const getDiscounts = createAsyncThunk(
  "promotions/getAll",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/get`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getCodeAvailabiltyAsync = createAsyncThunk(
  "code/get",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/promotions/get-code-availability`,
        payload
      )
    );
    return response;
  }
);

export const updateDineInSetingsAsync = createAsyncThunk(
  "dineIn/update",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/dine-in/update`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

const promotion = createSlice({
  name: "promotion",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(createPromotionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPromotionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const promotion = action?.payload?.data?.response;
        state.singleData = promotion;
      })
      .addCase(createPromotionAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePromotionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePromotionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newQrCode = action?.payload?.data?.response;
        if (newQrCode) {
          // state.qrData = [...state.qrData, newQrCode];
        }
      })
      .addCase(updatePromotionAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDiscounts.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.data = action?.payload?.data?.response?.promos;
        state.counts = action?.payload?.data?.response?.counts;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(togglePromotionStatusAsync.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(togglePromotionStatusAsync.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.singleData = action?.payload?.data?.response;
      })
      .addCase(togglePromotionStatusAsync.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(getCodeAvailabiltyAsync.pending, (state) => {
        state.codeLoading = true;
      })
      .addCase(getCodeAvailabiltyAsync.fulfilled, (state, action) => {
        state.codeLoading = false;
        state.codeStatus = action?.payload?.data?.response;
      })
      .addCase(getCodeAvailabiltyAsync.rejected, (state, action) => {
        state.codeLoading = false;
      });
  },
});

export default promotion.reducer;
