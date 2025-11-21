import { create } from "zustand";

interface FavoriteState {
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: [],
    toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
            set({ favorites: favorites.filter((fid) => fid !== id)});
        } else {
            set({ favorites: [...favorites, id]})
        }
    }}
)
);