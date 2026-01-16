import { renderHook, act } from '@testing-library/react';
import { useProducts } from './useProducts';
import * as api from '../api/products.api';
import { describe, expect, test, vi } from 'vitest';

const mockProducts = [
  {
    id: '1',
    name: 'Laptop Pro X1',
    price: 1299.99,
    description: '',
    category: '',
    image: '',
  },
];

describe('useProducts hook', () => {
  test('fetchProducts carga los productos correctamente', async () => {
    // Mockear la API
    vi.spyOn(api, 'getProducts').mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchProducts maneja errores', async () => {
    vi.spyOn(api, 'getProducts').mockRejectedValue(new Error('Error de prueba'));

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Error de prueba');
    expect(result.current.loading).toBe(false);
  });
});
