import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ProductsPage, { loader as productsLoader } from './pages/ProductsPage';
import AdminLayout from './pages/AdminLayout';
import AdminProductsTable, {
  action as updateAction,
} from './pages/AdminProductsTable';
import AdminOrdersTable, {
  loader as orderLoader,
} from './pages/AdminOrdersTable';

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
              path: 'products',
              element: <AdminProductsTable />,
              loader: productsLoader,
              action: updateAction,
            },
            {
              path: 'orders',
              element: <AdminOrdersTable />,
              loader: orderLoader,
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
