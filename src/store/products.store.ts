import { create } from 'zustand';
import type { Product } from '../types/product.types';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  search: string;

  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSearch: (search: string) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  selectedProduct: null,
  search: '',

  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSearch: (search) => set({ search }),
}));
