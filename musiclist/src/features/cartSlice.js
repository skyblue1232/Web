import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0,
  searchQuery: '',
  filteredItems: cartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 수량 증가
    increase: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].amount += 1;
      }
    },

    // 수량 감소
    decrease: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].amount > 1) {
          state.items[index].amount -= 1;
        }
      }
    },

    // 장바구니 초기화
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },

    // 총합 계산
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;

      state.items.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });

      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },

    // 검색 쿼리 업데이트
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();

      state.filteredItems = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.singer.toLowerCase().includes(query) ||
          item.price.toString().startsWith(query)
      );

      console.log(`[Redux] Updated search query to "${action.payload}"`, state.filteredItems);
    },

    // 검색 결과 적용
    applySearch: (state) => {
      state.items = state.filteredItems;
      console.log('[Redux] Applied search filter', state.items);
    },
  },
});

export const { increase, decrease, clearCart, calculateTotals, updateSearchQuery, applySearch } =
  cartSlice.actions;
export default cartSlice.reducer;
