import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ProductsPage, { loader as productsLoader } from './pages/ProductsPage';
import AdminLayout from './pages/AdminLayout';
import AdminProductsTable from './pages/AdminProductsTable';

function App() {
  const routes = [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <ProductsPage />,
          loader: productsLoader,
        },
        {
          path: 'admin',
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <AdminProductsTable />,
              loader: productsLoader,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
