import { useEffect, useState, lazy, Suspense } from 'react';
import { useProducts } from '../hooks/useProducts';
import type { Product, ProductInput } from '../types/product.types';
import { ProductForm } from '../components/ProductForm';
import SearchBar from '../components/SearchBar';

const ProductCard = lazy(() => import('../components/ProductCard'));

const ProductsPage = () => {
  const {
    products: fetchedProducts,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  } = useProducts();

  const [creating, setCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(fetchedProducts);

  // Sincroniza productos con hook
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  // Buscar productos
  const [search, setSearch] = useState('');
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  // PAGINACIÓN
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Reinicia página si cambia búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Crear producto
  const handleCreate = async (newProduct: Omit<Product, 'id'>) => {
    await createProduct(newProduct);
    await fetchProducts();
    setCreating(false);
  };

  // Editar producto
  const handleEdit = async (updatedProduct: ProductInput) => {
    if (!updatedProduct.id) return;
    const { id, ...data } = updatedProduct;
    await updateProduct(id, data);
    await fetchProducts();
    setEditingProduct(null);
  };

  // Eliminar producto
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    await fetchProducts();
  };

  if (loading) return <p className="text-center mt-4">Cargando...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Botón crear */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <button
          onClick={() => setCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Crear producto
        </button>
      </div>

      {/* Buscador */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Formularios */}
      {creating && <ProductForm onClose={() => setCreating(false)} onCreate={handleCreate} />}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onEdit={handleEdit}
        />
      )}

      {/* Lista de productos */}
      <Suspense fallback={<p className="text-center">Cargando productos...</p>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={(prod) => setEditingProduct(prod)}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </div>
      </Suspense>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
