import { getRecurringApis, getStore, handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  showAlert: false,
  allOrders: [],
  pendingOrders: [],
  preparingOrders: [],
  readyOrders: [],
  orderBtnLoading: false,
};

export const fetchVendorOrdersForTheDay = createAsyncThunk(
  "orders/fetch-today",
  async (payload) => {
    const store = getStore();
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/get-vendors-orders-for-the-day`,
        { storeId: store?.id }
      )
    );
    return response?.data?.response;
  }
);

export const markOrderAsPreparingAsync = createAsyncThunk(
  "orders/mark-order-as-preparing",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/update-status`,
        payload
      )
    );
    return response?.data?.response;
  }
);

export const markOrderAsReadyAsync = createAsyncThunk(
  "orders/mark-order-as-ready",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/update-status`,
        payload
      )
    );
    return response?.data?.response;
  }
);

const kitchen = createSlice({
  name: "kitchen",
  initialState,
  reducers: {
    updateOrdersArrays: (state, action) => {
      const initialArray = state.allOrders;
      const newArr = action.payload;
      if (newArr.length > initialArray.length) {
        state.showAlert = true;
      }
      let pendingOrders = [];
      let preparingOrders = [];
      let readyOrders = [];
      newArr.forEach((orders) => {
        if (orders.status === "created" || orders.status === "received") {
          pendingOrders.push(orders);
        } else if (orders.status === "preparing") {
          preparingOrders.push(orders);
        } else {
          readyOrders.push(orders);
        }
      });

      state.pendingOrders = pendingOrders;
      state.preparingOrders = preparingOrders;
      state.readyOrders = readyOrders;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchVendorOrdersForTheDay.fulfilled, (state, action) => {
        const initialArray = state.allOrders;
        const newArr = action.payload;
        //   console.log(action, "ac")
        if (newArr.length > initialArray.length) {
          state.showAlert = true;
        }
        let pendingOrders = [];
        let preparingOrders = [];
        let readyOrders = [];
        if (newArr?.length > 0) {
          newArr.forEach((orders) => {
            if (orders.status === "created" || orders.status === "received") {
              pendingOrders.push(orders);
            } else if (orders.status === "preparing") {
              preparingOrders.push(orders);
            } else {
              readyOrders.push(orders);
            }
          });
        }

        state.pendingOrders = pendingOrders;
        state.preparingOrders = preparingOrders;
        state.readyOrders = readyOrders;
      })
      .addCase(markOrderAsPreparingAsync.pending, (state, action) => {
        state.orderBtnLoading = true;
      })
      .addCase(markOrderAsPreparingAsync.fulfilled, (state, action) => {
        state.orderBtnLoading = false;
        const newOrder = action.payload;
        let pendingOrders = state.pendingOrders;
        let preparingOrders = state.preparingOrders;
        pendingOrders.filter((order) => order?.id !== newOrder?.id);
        preparingOrders.push(newOrder);
      })
      .addCase(markOrderAsPreparingAsync.rejected, (state, action) => {
        state.orderBtnLoading = false;
      })
      .addCase(markOrderAsReadyAsync.pending, (state, action) => {
        state.orderBtnLoading = true;
      })
      .addCase(markOrderAsReadyAsync.fulfilled, (state, action) => {
        state.orderBtnLoading = false;
        const newOrder = action.payload;
        let preparingOrders = state.preparingOrders;
        let readyOrders = state.readyOrders;
        preparingOrders.filter((order) => order?.id !== newOrder?.id);
        readyOrders.push(newOrder);
      })
      .addCase(markOrderAsReadyAsync.rejected, (state, action) => {
        state.orderBtnLoading = false;
      });
  },
});

export const { updateOrdersArrays } = kitchen.actions;
export default kitchen.reducer;
