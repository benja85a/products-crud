// src/hooks/useProducts.ts
import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../types/product.types';
import {
  getProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '../api/products.api';
import { useProductsStore } from '../store/products.store';

/**
 * Custom hook para manejar CRUD de productos
 */
export function useProducts() {
  const { products, setProducts, search } = useProductsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(search);
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar productos');
      }
      setProducts([]); // limpiar products si hay error
    } finally {
      setLoading(false);
    }
  }, [search, setProducts]);

  const createProduct = async (data: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      await apiCreateProduct(data);
      await fetchProducts();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar productos');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, data: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      await apiUpdateProduct(id, data);
      await fetchProducts();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al actualizar producto');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await apiDeleteProduct(id);
      await fetchProducts();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar productos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
