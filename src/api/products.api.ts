import type { Product } from '../types/product.types';

const BASE_URL = 'http://localhost:3000/api/products';

export const getProducts = async (search?: string): Promise<Product[]> => {
  const url = search ? `${BASE_URL}?search=${search}` : BASE_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};

export const createProduct = async (data: Omit<Product, 'id'>) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
};

export const updateProduct = async (id: string, data: Omit<Product, 'id'>) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
};
