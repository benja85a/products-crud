// src/components/ProductCard.tsx
import type { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="border rounded p-4 flex flex-col justify-between" data-testid="product-card">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
      <p className="text-sm mb-2">{product.category}</p>
      <p className="text-sm mb-2">{product.description}</p>
      <div className="flex justify-between">
        <button onClick={() => onEdit(product)} className="bg-yellow-400 px-3 py-1 rounded">
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
