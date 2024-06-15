import { handleAPI, setItemWithEvent } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  btnLoading: false,
  data: [],
  dineInData: {},
  isOpen: {
    status: true,
    message: "Your store is currently open",
    referenceData: "",
  },
};

export const createStoreAsync = createAsyncThunk(
  "employee/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/create`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getAllStoresAsync = createAsyncThunk(
  "employee/getAll",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/all/business?business_id=${payload.business_id}&page=${payload.page}&noOfStores=${payload.noOfStores}`
      )
    );
    console.log(response);
    return response;
  }
);

export const getSingleStore = createAsyncThunk(
  "employee/getSingle",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/${payload}`
      )
    );
    console.log(response);
    setItemWithEvent("serveup_store", JSON.stringify(response.data[0]));
    return response;
  }
);

export const updateStoreSettings = createAsyncThunk(
  "employee/updateStoreSettings",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/update/settings`,
        payload
      )
    );
    setItemWithEvent("serveup_store", JSON.stringify(response.data[0]));
    return response;
  }
);

export const updateStoreIsOpenObj = createAsyncThunk(
  "employee/updateStoreIsOpenObj",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/stores/update/isopen`,
        payload
      )
    );
    setItemWithEvent("serveup_store", JSON.stringify(response.data[0]));
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
    return response;
  }
);

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    updateStoreIsOpenObjWeb: (state, action) => {
      const isOpenObj = action.payload;
      state.isOpen = isOpenObj;
      setItemWithEvent("store_isOpen", JSON.stringify(isOpenObj));
    },
  },

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
        state.data = action.payload.data[0];
      })
      .addCase(getAllStoresAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSingleStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data[0];
        state.dineInData = {
          active: action.payload.data[0].is_dine_in_enabled,
          pay_with_cash: action.payload.data[0].pay_with_cash,
          customer_service: action.payload.data[0].customer_service,
          dine_in_hours: action.payload.data[0].dine_in_hours,
        };
      })
      .addCase(getSingleStore.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateStoreSettings.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateStoreSettings.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.data = action.payload.data[0];
      })
      .addCase(updateStoreSettings.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateDineInSetingsAsync.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateDineInSetingsAsync.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.data = action.payload.data[0];
        state.dineInData = {
          active: action.payload.data[0].is_dine_in_enabled,
          pay_with_cash: action.payload.data[0].pay_with_cash,
          customer_service: action.payload.data[0].customer_service,
          dine_in_hours: action.payload.data[0].dine_in_hours,
        };
      })
      .addCase(updateDineInSetingsAsync.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateStoreIsOpenObj.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateStoreIsOpenObj.fulfilled, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(updateStoreIsOpenObj.rejected, (state, action) => {
        state.btnLoading = false;
      });
  },
});

export const { updateStoreIsOpenObjWeb } = store.actions;
export default store.reducer;
