// src/components/ProductForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../types/product.types';
import type { ProductInput } from '../types/product.types';

interface ProductFormProps {
  product?: ProductInput; // si existe, estamos editando
  onClose: () => void;
  onCreate?: (product: Omit<ProductInput, 'id'>) => Promise<void>;
  onEdit?: (product: ProductInput) => Promise<void>;
}

export function ProductForm({ product, onClose, onCreate, onEdit }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {},
  });

  const submit = async (data: ProductInput) => {
    try {
      if (product && onEdit) {
        await onEdit({ ...product, ...data });
      } else if (!product && onCreate) {
        await onCreate(data);
        reset(); // limpia formulario para crear otro producto
      }
      onClose();
    } catch (error) {
      console.error('Error guardando producto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-6 rounded-lg w-96 flex flex-col gap-3 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2">{product ? 'Editar Producto' : 'Crear Producto'}</h2>

        {/* Resumen de errores */}
        {Object.keys(errors).length > 0 && (
          <p className="text-red-600 font-medium">Por favor corrige los errores antes de enviar</p>
        )}

        {/* Nombre */}
        <label htmlFor="name" className="font-medium">
          Nombre
        </label>
        <input
          id="name"
          {...register('name')}
          placeholder="Nombre del producto"
          className={`border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Precio */}
        <label htmlFor="price" className="font-medium">
          Precio
        </label>
        <input
          id="price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          placeholder="Precio"
          className={`border p-2 rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        {/* Categoría */}
        <label htmlFor="category" className="font-medium">
          Categoría
        </label>
        <input
          id="category"
          {...register('category')}
          placeholder="Categoría"
          className={`border p-2 rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        {/* Descripción */}
        <label htmlFor="description" className="font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Descripción del producto"
          className={`border p-2 rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          rows={3}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        {/* Imagen */}
        <label htmlFor="image" className="font-medium">
          URL de Imagen
        </label>
        <input
          id="image"
          {...register('image')}
          placeholder="https://..."
          className={`border p-2 rounded ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
