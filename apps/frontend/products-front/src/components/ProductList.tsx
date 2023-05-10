import React from 'react';
import Product, { ProductProps } from './Product';
import classes from './ProductList.module.css';

export interface ProductListProps {
  products: ProductProps[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <ul className={classes.productList}>
      {products.map((product) => (
        <li key={product._id} className={classes['product-container']}>
          <Product {...product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
