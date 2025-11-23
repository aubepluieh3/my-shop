import {create} from "zustand";
import { persist } from "zustand/middleware";


export interface CartItem extends Product {
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  discountRate?: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    decreaseItem:(id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create(
    persist<CartState>(
      (set, get) => ({
        items: [],
  
        addItem: (item) => {
          const existing = get().items.find((i) => i.id === item.id);
          if (existing) {
            set({
              items: get().items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            });
          } else {
            set({ items: [...get().items, { ...item, quantity: item.quantity }] });
          }
        },
  
        decreaseItem: (id) => {
          const exists = get().items.find((i) => i.id === id);
  
          if (!exists) return;
  
          if (exists.quantity === 1) {
            set({
              items: get().items.filter((i) => i.id !== id),
            });
          } else {
            set({
              items: get().items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            });
          }
        },
  
        removeItem: (id) => {
          set({ items: get().items.filter((i) => i.id !== id) });
        },
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "cart-storage",
      }
    )
  );