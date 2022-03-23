import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        user: null,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item=> item.id === newItem.id);
            state.totalQuantity = state.totalQuantity + newItem.quantity;
            if(!existingItem) {
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: newItem.quantity, 
                    image: newItem.image,
                    totalPrice: newItem.price * newItem.quantity,
                    title: newItem.title
                });
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },

      
        removeItemFromCart (state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !==id);
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },

        setUser (state, action)  {
            state.user = action.payload;
        },
        deleteCart (state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.items = state.items.filter(item => item.id !==id);
            state.totalQuantity = state.totalQuantity - existingItem.quantity;
        },
        clearCart (state) {
            state.items = [];
            state.totalQuantity= 0;
        }
    }  
});

export const {addItemToCart, removeItemFromCart, setUser, clearCart, deleteCart} = cartSlice.actions;
export default cartSlice;