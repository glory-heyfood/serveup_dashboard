import { getRecurringApis, getStore, handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  showAlert: false,
  orderHistory: {},
  pendingOrders: [],
  preparingOrders: [],
  readyOrders: [],
  orderBtnLoading: false,
  newOrders: [],
};

export const getOrderHistoryAsync = createAsyncThunk(
  "orders/get-order-history",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/get-order-history`,
        payload
      )
    );
    return response?.data?.response;
  }
);

export const fetchVendorNewOrdersForTheDay = createAsyncThunk(
  "orders/fetch-new-today",
  async (payload) => {
    const store = getStore();
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/get-vendors-new-orders-for-the-day`,
        { storeId: store?.id }
      )
    );
    return response?.data?.response;
  }
);

const order = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchVendorNewOrdersForTheDay.fulfilled, (state, action) => {        
        state.newOrders = action.payload;
      })
      .addCase(getOrderHistoryAsync.pending, (state, action) => {
        state.orderBtnLoading = true;
      })
      .addCase(getOrderHistoryAsync.fulfilled, (state, action) => {
        state.orderBtnLoading = false;        
        state.orderHistory = action.payload;
      })
      .addCase(getOrderHistoryAsync.rejected, (state, action) => {
        state.orderBtnLoading = false;
      });
  },
});

export const { updateOrdersArrays } = order.actions;
export default order.reducer;
