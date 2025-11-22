import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create(
    persist<FavoriteState>((set, get) => ({
        favorites: [],
        toggleFavorite: (id) => {
            const { favorites } = get();
            if (favorites.includes(id)) {
                set({ favorites: favorites.filter((fid) => fid !== id)});
            } else {
                set({ favorites: [...favorites, id]})
            }
        }}),
    {
        name: 'favorite-storage'
    })
)