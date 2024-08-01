import { handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
};

export const createEmployeeAsync = createAsyncThunk(
  "employee/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/employee/create`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const verifyEmployeeUrlAsync = createAsyncThunk(
  "employee/verifyUrl",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/employee/verifyUrl`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getAllEmployeesAsync = createAsyncThunk(
  "employee/getAll",
  async (payload) => {
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/employee/all/${payload}`
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employee/delete",
  async (payload) => {
    // rewrite the API
    const response = await handleAPI(
      axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/employee/delete/${payload}`
      )
    );
    console.log(response);
    return response;
  }
);

const employee = createSlice({
  name: "employee",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createEmployeeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllEmployeesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmployeesAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllEmployeesAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyEmployeeUrlAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmployeeUrlAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyEmployeeUrlAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const { signupAsync } = employee.actions;
export const {} = employee.actions;
export default employee.reducer;
