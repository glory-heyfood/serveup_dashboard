import { handleAPI } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  dataLoading: false,
  categoriesData: [],
  itemsData: [],
  modifiersData: [],
};

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/category/create`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (payload) => {
    await handleAPI(
      axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/category/delete/${payload}`
      )
    );
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (payload) => {
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/category/all/${payload}`
      )
    );
    console.log(response);
    return response;
  }
);

export const createItem = createAsyncThunk("item/create", async (payload) => {
  const response = await handleAPI(
    axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/create`,
      payload
    )
  );
  console.log(response);
  return response;
});

export const updateItem = createAsyncThunk("item/update", async (payload) => {
  const response = await handleAPI(
    axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/update`,
      payload
    )
  );
  console.log(response);
  return response;
});

export const updateItemStock = createAsyncThunk(
  "item/update.stocl",
  async (payload) => {
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/stock/update`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getAllItems = createAsyncThunk("item/getAll", async (payload) => {
  const response = await handleAPI(
    axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/all/${payload.menu_id}?page=${payload.page}&pageSize=${payload.pageSize}&sort=${payload.sortString}`
    )
  );
  console.log(response);
  return response;
});

export const getAllItemsByCategoryName = createAsyncThunk(
  "item/category/getAll",
  async (payload) => {
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/category/all?category_name=${payload.category_name}&menu_id=${payload.menu_id} `
      )
    );
    console.log(response);
    return response;
  }
);

export const searchItem = createAsyncThunk("item/search", async (payload) => {
  console.log(payload);
  const response = await handleAPI(
    axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/search?search=${payload.value}&menu_id=${payload.menu_id}&business_id=${payload.business_id}`
    )
  );
  console.log(response);
  return response;
});

export const removeItemFromCategory = createAsyncThunk(
  "item/category",
  async (payload) => {
    const response = await handleAPI(
      axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/category?category_name=${payload.category_name}&item_id=${payload.item_id}`
      )
    );
    console.log(response);
    return response;
  }
);
export const addItemToCategory = createAsyncThunk(
  "item/category/add",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/category`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);
export const createModifier = createAsyncThunk(
  "modifier/create",
  async (payload) => {
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/modifier/create`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const deleteModifier = createAsyncThunk(
  "modifier/delete",
  async (payload) => {
    await handleAPI(
      axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/modifier/delete/${payload}`
      )
    );
  }
);

export const updateModifier = createAsyncThunk(
  "modifier/update",
  async (payload) => {
    const response = await handleAPI(
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/modifier/update`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

export const getAllModifiers = createAsyncThunk(
  "modifiers/getAll",
  async (payload) => {
    const response = await handleAPI(
      axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/modifier/all/${payload}`
      )
    );
    console.log(response);
    return response;
  }
);

export const generateSasToken = createAsyncThunk(
  "item/upload-image",
  async (payload) => {
    console.log("got heres");
    console.log(payload);
    const response = await handleAPI(
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/serveup/api/v1/menu/item/generate-sas-token`,
        payload
      )
    );
    console.log(response);
    return response;
  }
);

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    deleteCategoriesFromWeb: (state, action) => {
      const arr = state.categoriesData;
      const newArr = arr.filter((data) => data.id !== action.payload);
      state.categoriesData = newArr;
    },
    deleteModifierFromWeb: (state, action) => {
      const arr = state.modifiersData;
      const newArr = arr.filter((data) => data.id !== action.payload);
      state.modifiersData = newArr;
    },
    removeItemFromCategoryWeb: (state, action) => {
      const arr = state.itemsData;
      const newArr = arr.filter((data) => data.id !== action.payload);
      state.itemsData = newArr;
    },
    updateItemStockWeb: (state, action) => {
      const arr = state.itemsData?.data;
      console.log(arr);
      const newArr = arr.map((data) => {
        if (data.id === action.payload.id) {
          data.in_stock = action.payload.in_stock_obj;
          return data;
        }
        return data;
      });
      console.log(newArr);
      state.itemsData.data = newArr;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        const newCategory = action?.payload?.data[0];
        if (newCategory) {
          state.categoriesData = [...state.categoriesData, newCategory];
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.categoriesData = action?.payload?.data[0];
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(generateSasToken.pending, (state) => {})
      .addCase(generateSasToken.fulfilled, (state, action) => {})
      .addCase(generateSasToken.rejected, (state, action) => {})
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addItemToCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCategory.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action?.payload?.data[0];
        if (newItem) {
          state.itemsData = [...state.itemsData, newItem];
        }
      })

      .addCase(addItemToCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateItemStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemStock.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateItemStock.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchItem.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(searchItem.fulfilled, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(searchItem.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(getAllItems.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.itemsData = action?.payload?.data[0];
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(getAllItemsByCategoryName.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getAllItemsByCategoryName.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.itemsData = action?.payload?.data[0];
      })
      .addCase(getAllItemsByCategoryName.rejected, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(createModifier.pending, (state) => {
        state.loading = true;
      })
      .addCase(createModifier.fulfilled, (state, action) => {
        state.loading = false;
        const newModifier = action?.payload?.data[0];
        state.modifiersData = [...state.modifiersData, newModifier];
      })
      .addCase(createModifier.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateModifier.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateModifier.fulfilled, (state, action) => {
        state.loading = false;
        const newModifier = action?.payload?.data[0];
        const data = state.modifiersData;
        const updatedData = data.map((data) =>
          newModifier.id === data.id ? newModifier : data
        );
        state.modifiersData = updatedData;
      })
      .addCase(updateModifier.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllModifiers.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getAllModifiers.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.modifiersData = action?.payload?.data[0];
      })
      .addCase(getAllModifiers.rejected, (state, action) => {
        state.dataLoading = false;
      });
  },
});

export const {
  deleteCategoriesFromWeb,
  deleteModifierFromWeb,
  removeItemFromCategoryWeb,
  updateItemStockWeb,
} = menu.actions;
export default menu.reducer;
