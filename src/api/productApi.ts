import { BASE_API_URL } from "../constants";
import { Product } from "../store/useCartStore";

export const fetchProducts = async (search?: string): Promise<Product[]> => {
    const url = search ? `${BASE_API_URL}/api/products?search=${encodeURIComponent(search)}` 
    : `${BASE_API_URL}/api/products`;
    const res = await fetch(url);
    return res.json();
};  
  
export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await fetch(`${BASE_API_URL}/api/products/${id}`);
    return res.json();
};