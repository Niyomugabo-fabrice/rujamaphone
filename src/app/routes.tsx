import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'contact', Component: Contact },
      { path: 'cart', Component: Cart },
      { path: '*', Component: NotFound },
    ],
  },
]);
