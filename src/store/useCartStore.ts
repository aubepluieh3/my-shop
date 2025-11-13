import {create} from "zustand";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [], // 초기 상태
    addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
            set({
                items: get().items.map(i => i.id === item.id ? {
                    ...i, quantity: i.quantity + 1 } : i ),
            });
        } else {
            set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
    },
    removeItem: (id) =>
        set({ items: get().items.filter(i => i.id !== id) }),
}));