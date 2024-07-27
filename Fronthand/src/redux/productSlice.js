import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import alertify from "alertifyjs";
import axios from "axios";

export const updateProducts = (products) => ({
  type: 'product/updateProducts',
  payload: products,
});

export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProductsAsync',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get('http://localhost:3000/product/product-list');
      const products = response.data.map(product => ({ ...product, inCart: false }));


      dispatch(updateProducts(products));

      return products;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    let isFirstFulfilled = true;
    let isFirstRejected = true;
  
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      if (isFirstFulfilled) {
        state.loading = false;
        state.items = action.payload;
        console.log(state.items)
        isFirstFulfilled = false;
      }
    });
  
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      if (isFirstRejected) {
        state.loading = false;
        state.error = 'Ürünleri güncellerken bir hata oluştu.';
        alertify.error(state.error);
        isFirstRejected = false;
      }
    });
  
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export default productSlice.reducer;
