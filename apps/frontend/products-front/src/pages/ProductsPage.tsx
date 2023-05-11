import React from 'react';
import ProductsList from '../components/ProductList';
import { useLoaderData } from 'react-router-dom';
import { ProductProps } from '../components/Product';
import classes from './ProductsPage.module.css';

export default function ProductsPage() {
  const products: Array<ProductProps> = useLoaderData() as Array<ProductProps>;
  return (
    <div className={classes['product-container']}>
      <ProductsList products={products} />
    </div>
  );
}

export async function loader() {
  const response = await fetch('http://localhost:3000/products');

  if (response.status !== 200) {
    throw new Error('Something went wrong!');
  }

  const products: Array<ProductProps> = await response.json();

  return products;
}
