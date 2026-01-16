import { lazy, Suspense } from 'react';

const ProductsPage = lazy(() => import('./pages/productsPage'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPage />
    </Suspense>
  );
}

export default App;
