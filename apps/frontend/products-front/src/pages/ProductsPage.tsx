import React, { useEffect } from 'react';
import ProductsList from '../components/ProductList';
import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../types/product';
import classes from './ProductsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../store/productsSlice';
import { RootState } from '../store';

export default function ProductsPage() {
  const products: Array<IProduct> = useLoaderData() as Array<IProduct>;
  const dispatch = useDispatch();
  const productsList = useSelector(
    (state: RootState) => state.products.products,
  );

  useEffect(() => {
    dispatch(productsActions.initializeProducts(products));
  }, [dispatch, products]);

  return (
    <div className={classes['product-container']}>
      <ProductsList products={productsList} />
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
