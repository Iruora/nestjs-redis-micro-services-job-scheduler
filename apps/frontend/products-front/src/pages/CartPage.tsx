import ProductList from '../components/ProductList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import classes from './CartPage.module.css';

export default function CartPage() {
  const { products } = useSelector((state: RootState) => state.cart);

  return (
    <div className={classes['cart-container']}>
      <ProductList products={products} cartMode={true} />
    </div>
  );
}
