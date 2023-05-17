import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import AdminLayout from './pages/AdminLayout';
import Errorpage from './pages/ErrorPage';
import { action as productsAction } from './components/Product';

function App() {
  const routes = [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <Errorpage />,
      action: productsAction,
      children: [
        {
          index: true,
          async lazy() {
            const { default: ProductsPage, loader: productsLoader } =
              await import('./pages/ProductsPage');

            return {
              Component: ProductsPage,
              loader: productsLoader,
            };
          },
        },
        {
          path: '/cart',
          async lazy() {
            const { default: CartPage } = await import('./pages/CartPage');

            return {
              Component: CartPage,
            };
          },
        },
        {
          path: 'admin',
          element: <AdminLayout />,
          children: [
            {
              path: 'products',
              async lazy() {
                const { loader: productsLoader } = await import(
                  './pages/ProductsPage'
                );
                const { default: AdminProductsTable, action: updateAction } =
                  await import('./pages/AdminProductsTable');
                return {
                  Component: AdminProductsTable,
                  action: updateAction,
                  loader: productsLoader,
                };
              },
            },
            {
              path: 'orders',
              async lazy() {
                const { default: AdminOrdersTable, loader: orderLoader } =
                  await import('./pages/AdminOrdersTable');

                return {
                  Component: AdminOrdersTable,
                  loader: orderLoader,
                };
              },
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
