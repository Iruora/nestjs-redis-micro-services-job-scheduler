import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../types/product';
import ProductEdit from '../components/ProductEdit';
import PreviousPageButton from '../components/PreviousPageButton';

export default function ProductEditPage() {
  const product = useLoaderData() as IProduct;

  return (
    <>
      <PreviousPageButton />
      <ProductEdit {...product} />
    </>
  );
}
