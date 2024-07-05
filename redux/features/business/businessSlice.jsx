import { getBusiness, handleAPI, setItemWithEvent } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  btnLoading: false,
  data: [],
  orders: [],
};

export const loginAsync = createAsyncThunk(
  "business/login",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/merchandiseusers/login`,
        payload
      )
    );
    if (response) {
      window.localStorage.setItem(
        "serveup_user",
        JSON.stringify(response.data[0])
      );
    }
  }
);

export const signupAsync = createAsyncThunk(
  "signup/business",
  async (payload, { rejectWithValue }) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/signup`,
        payload
      )
    );
    if (response) {
      window.localStorage.setItem(
        "serveup_user",
        JSON.stringify(response.data)
      );
    }
    return response;
  }
);

export const verifyEmailAsync = createAsyncThunk(
  "business/verifyemail",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/verify-email`,
        payload
      )
    );
    if (response) {
      window.localStorage.setItem(
        "serveup_user",
        JSON.stringify(response.data.response)
      );
    }
    return response;
  }
);

export const resendEmailOTP = createAsyncThunk(
  "business/resendEmailOTP",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/resend-email-otp`,
        payload
      )
    );
    return response;
  }
);

export const createBusinessAsync = createAsyncThunk(
  "business/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/create`,
        payload
      )
    );
    if (response) {
      window.localStorage.setItem(
        "serveup_business",
        JSON.stringify(response.data)
      );
    }
    return response;
  }
);

export const updateSubscriptionPlanAsync = createAsyncThunk(
  "business/updateSubscriptionPlan",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/pricing/update`,
        payload
      )
    );
    if (response) {
      setItemWithEvent("serveup_business", JSON.stringify(response.data[0]));
    }
    return response;
  }
);

export const getBusinessById = createAsyncThunk(
  "business/getBusinessById",
  async (payload) => {
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/${payload}`,
        payload
      )
    );
    if (response) {
      window.localStorage.setItem(
        "serveup_business",
        JSON.stringify(response.data[0])
      );
    }
    return response;
  }
);

export const updateBusinessById = createAsyncThunk(
  "business/updateBusinessById",
  async (payload) => {
    console.log(payload);
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/business/update`,
        payload
      )
    );
    if (response) {
      setItemWithEvent("serveup_business", JSON.stringify(response.data[0]));
    }
    return response;
  }
);

export const fetchBusinessOrdersForTheDay = createAsyncThunk(
  "orders/fetch-today",
  async (payload) => {
    const business = getBusiness();
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/orders/get-business-orders-for-the-day`,
        { businessId: business?.id }
      )
    );
    return response?.data?.response;
  }
);

const business = createSlice({
  name: "business",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyEmailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmailAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyEmailAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createBusinessAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBusinessAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBusinessAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSubscriptionPlanAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriptionPlanAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data[0];
      })
      .addCase(updateSubscriptionPlanAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getBusinessById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBusinessById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data[0];
      })
      .addCase(getBusinessById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateBusinessById.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(updateBusinessById.fulfilled, (state, action) => {
        state.btnLoading = false;
        state.data = action.payload?.data[0];
      })
      .addCase(updateBusinessById.rejected, (state, action) => {
        state.btnLoading = false;
      })
      .addCase(fetchBusinessOrdersForTheDay.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(fetchBusinessOrdersForTheDay.fulfilled, (state, action) => {
        state.btnLoading = false;
        console.log(action.payload);
        state.orders = action.payload.docs;
      })
      .addCase(fetchBusinessOrdersForTheDay.rejected, (state, action) => {
        state.btnLoading = false;
      });
  },
});

// export const { signupAsync } = business.actions;
export const {} = business.actions;
export default business.reducer;
