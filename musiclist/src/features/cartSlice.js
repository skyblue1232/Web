import { create } from 'zustand';
import cartItems from '../constants/cartItems';

const useCartStore = create((set) => ({
  // 초기 상태
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0,
  searchQuery: '',
  filteredItems: cartItems,

  // Actions
  increase: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { items: updatedItems };
    }),

  decrease: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      return { items: updatedItems };
    }),

  clearCart: () =>
    set(() => ({
      items: [],
      totalAmount: 0,
      totalPrice: 0,
    })),

  calculateTotals: () =>
    set((state) => {
      const totalAmount = state.items.reduce((sum, item) => sum + item.amount, 0);
      const totalPrice = state.items.reduce((sum, item) => sum + item.amount * item.price, 0);
      return { totalAmount, totalPrice };
    }),

  updateSearchQuery: (query) =>
    set((state) => {
      const lowerQuery = query.toLowerCase();
      const filteredItems = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.singer.toLowerCase().includes(lowerQuery) ||
          item.price.toString().startsWith(lowerQuery)
      );
      return { searchQuery: query, filteredItems };
    }),

  applySearch: () =>
    set((state) => {
      console.log('[Zustand] Search Results:', state.filteredItems);
      return {};
    }),
}));

export default useCartStore;
