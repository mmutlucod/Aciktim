import {configureStore, } from "@reduxjs/toolkit"

import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import productSlice from "./productSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        product:productSlice,
       
    },
})