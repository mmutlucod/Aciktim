import { createSlice } from "@reduxjs/toolkit";
import alertify from "alertifyjs";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
   
    // increment: (state, action) => {
    //   const { productId } = action.payload;
    //   const productToUpdate = state.items.find((product) => product.id === productId);

    //   if (productToUpdate) {
    //     productToUpdate.number += 1;
    //   }
    // },
    
    // decrement: (state, action) => {
    //   const { productId } = action.payload;
    //   const productToUpdate = state.items.find((product) => product.id === productId);

    //   if (productToUpdate) {
    //     if (productToUpdate.number > 1) {
    //       productToUpdate.number -= 1;
    //     }
    //   }
    // },
    removeFromCart: (state, action) => {
      // Ürünü sepetten çıkarma işlemi
      const index = state.items.findIndex(item => item.Product_Id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
   
    emptyCart: (state) => {
      state.items = [];
    },
 
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((product) => product.Product_Id === item.Product_Id);

      if (existingItem) {
    
        existingItem.number += 1;
      } else {
     
        state.items.push({ ...item, number: 1 });
      }
    },
  
    removeProduct: (state, action) => {
      const { Product_Id } = action.payload;
      const index = state.items.findIndex((product) => product.Product_Id === Product_Id);
      if (index !== -1) {
        const removedProduct = state.items[index];
        state.items.splice(index, 1);
        alertify.success(`${removedProduct.ProductName} sepetten silindi`, 2);
      }
    },
    
    incrementItem: (state, action) => {
      const { itemId } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.Product_Id === itemId ? { ...item, number: item.number + 1 } : item
      );
      state.items = updatedItems;
    },
    
    decrementItem: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.Product_Id === itemId);
    
      if (itemIndex !== -1) {
        if (state.items[itemIndex].number > 1) {
          // Miktarı 1'den fazla ise azalt
          state.items[itemIndex].number -= 1;
        } else {
          // Miktar 1 ise, ürünü sepetten kaldır ve bir başarı mesajı göster
          const removedProduct = state.items[itemIndex];
          state.items.splice(itemIndex, 1);
          alertify.success(`${removedProduct.ProductName} sepetten silindi`, 2);
        }
      }
    },
    
  },

});

export const { increment, decrement, removeProduct, emptyCart, addToCart, removeFromCart, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;
