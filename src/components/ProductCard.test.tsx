import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product.types';
import { describe, expect, test, vi } from 'vitest';

const mockProduct: Product = {
  id: '1',
  name: 'Laptop Pro X1',
  price: 1299.99,
  description: 'Potente laptop...',
  category: 'Electronics',
  image: 'https://picsum.photos/seed/laptop/400/300',
};

describe('ProductCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  test('Muestra el nombre y precio del producto', () => {
    render(<ProductCard product={mockProduct} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText('Laptop Pro X1')).toBeInTheDocument();
    expect(screen.getByText('$1299.99')).toBeInTheDocument();
  });

  test('Muestra la descripción', () => {
    render(<ProductCard product={mockProduct} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText('Potente laptop...')).toBeInTheDocument();
  });
});
