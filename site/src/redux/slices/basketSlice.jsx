import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if(localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products : getBasketFromStorage(),
    drawer : false,
    totalAmount: 0


}
const writeFromBasketStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state,action) => {
          const findProduct = state.products && state.products.find((product) => product.id === action.payload.id)
          if(findProduct) {
            const extractedProducts = state.products.filter((product) => product.id != action.payload.id);
            findProduct.count += action.payload.count;
            state.products = [...extractedProducts,findProduct];
            writeFromBasketStorage(state.products);
          }else {
            state.products = [...state.products , action.payload];
            writeFromBasketStorage(state.products);
          }
        },

        setDrawer:(state) => {
             state.drawer = !state.drawer;
        },

        calculateBasket : (state) => {
          state.totalAmount =0;
          state.products && state.products.map((product)=> {
            state.totalAmount += product.price * product.count;
          })
        },
        removeProduct: (state, action) => {
          const productId = action.payload;
          const findProduct = state.products.find(product => product.id === productId);
        
          if (findProduct.count > 1) {
            // Ürünün countu 1 den büyükse 1 azaltıyoruz.
            findProduct.count -= 1;
          } else {
            // Count 1 ise , ürünü tamamen sepetten çıkarıyoruz.
            state.products = state.products.filter(product => product.id !== productId);
          }
          // Sepet güncellendiğinde localStorage'ı da güncelle
          writeFromBasketStorage(state.products);
         // Toplam tutarı yeniden hesapla
          state.totalAmount = state.products.reduce(
            (total, product) => total + product.price * product.count, 0
          );
        }
      }
    })

export const { addToBasket, setDrawer, calculateBasket, removeProduct } = basketSlice.actions

export default basketSlice.reducer