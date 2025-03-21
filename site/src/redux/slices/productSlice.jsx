import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products : [],
    selectedProduct : null,
    categories: [],
    selectedCategory: null,
    loading : false
}
const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts" , async() => {
   const response = await axios.get(`${BASE_URL}/products`);
   return response.data;
})

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
      setSelectedProduct: (state, action) => {
        state.selectedProduct = action.payload;
      },
      setSelectedCategory: (state,action) => {
        state.selectedCategory = action.payload;
      }
      
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
              state.loading = true;
        })
       builder.addCase(getAllProducts.fulfilled , (state , action) => {
        state.loading = false;
        state.products = action.payload;

        const categories = [
          ...new Set(action.payload.map((product) => product.category)),
        ];

        state.categories = categories;
    });
    },
});

export const {setSelectedProduct , setCategories , setSelectedCategory} = productSlice.actions

export default productSlice.reducer