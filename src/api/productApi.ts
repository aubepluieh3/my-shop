import { Product } from "../store/useCartStore";

export const fetchProducts = async (search?: string): Promise<Product[]> => {
    const url = search ? `/api/products?search=${encodeURIComponent(search)}` : `/api/products`;
    const res = await fetch(url);
    return res.json();
};  
  
export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`);
    return res.json();
};