import { storeID } from "@/data";
import { getStore, handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  dataLoading: false,
  dineInData: {},
  qrData: [],
};

export const createQrCodeAsync = createAsyncThunk(
  "qrCode/create",
  async (payload) => {
    const storeId = getStore().id;
    const qrObj = {
      label: payload.label,
      id: payload.id,
      categories: payload.categories,
      store_id: storeId,
      slugified_id: `${payload.label}-${storeId}`,
    };
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/qr-code/create`,
        qrObj
      )
    );
    console.log(response);
    return response;
  }
);

export const updateQrCodeAsync = createAsyncThunk(
  "qrCode/update",
  async (payload) => {
    const storeId = getStore().id;
    const qrObj = {
      label: payload.label,
      id: payload.id,
      categories: payload.categories,
    };
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/qr-code/update`,
        qrObj
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteQrCode = createAsyncThunk(
  "qrCode/delete",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/qr-code/delete`,
        payload
      )
    );
    return response;
  }
);

export const getQrCodes = createAsyncThunk("qrCode/getAll", async (payload) => {
  const response = await handleAPI(
    axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/qr-code/get`,
      payload
    )
  );
  console.log(response);
  return response;
});

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

const dineIn = createSlice({
  name: "dineIn",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(createQrCodeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQrCodeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newQrCode = action?.payload?.data?.response;
        if (newQrCode) {
          // state.qrData = [...state.qrData, newQrCode];
        }
      })
      .addCase(createQrCodeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateQrCodeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQrCodeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newQrCode = action?.payload?.data?.response;
        if (newQrCode) {
          // state.qrData = [...state.qrData, newQrCode];
        }
      })
      .addCase(updateQrCodeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getQrCodes.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getQrCodes.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.dineInData = action?.payload?.data?.response;
        state.qrData = action?.payload?.data?.response;
      })
      .addCase(getQrCodes.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(updateDineInSetingsAsync.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(updateDineInSetingsAsync.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.dineInData = action?.payload?.data?.response;
      })
      .addCase(updateDineInSetingsAsync.rejected, (state, action) => {
        state.dataLoading = false;
      });
  },
});

export default dineIn.reducer;
