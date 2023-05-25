import Product from './Product';
import classes from './ProductList.module.css';
import { IProduct } from '../types/product';

export interface ProductListProps {
  products: IProduct[];
  cartMode?: boolean;
}

function ProductList({ products, cartMode = false }: ProductListProps) {
  return (
    <>
      {products.length === 0 && (
        <p className="text-center text-3xl align-middle h-full	">
          No products found
        </p>
      )}
      <ul
        className={
          cartMode ? classes['productList__cart'] : classes.productList
        }
      >
        {products.map((product) => (
          <li
            key={product._id}
            className={`${classes['product-container']} flex flex-col`}
          >
            <Product {...product} cartMode={cartMode} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;
