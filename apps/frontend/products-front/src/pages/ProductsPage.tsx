import React from 'react';
import ProductsList from '../components/ProductList';
import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../types/product';
import classes from './ProductsPage.module.css';

export default function ProductsPage() {
  const products: Array<IProduct> = useLoaderData() as Array<IProduct>;

  return (
    <div className={classes['product-container']}>
      <ProductsList products={products} />
    </div>
  );
}

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_GW_URL}/products`);

  if (response.status !== 200) {
    throw response;
  }

  const products: Array<IProduct> = await response.json();

  return products;
}
