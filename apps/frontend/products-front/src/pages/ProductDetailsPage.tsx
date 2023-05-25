import React from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { IProduct } from '../types/product';
import ProductDetails from '../components/ProductDetails';
import PreviousPageButton from '../components/PreviousPageButton';

export default function ProductDetailsPage() {
  const product = useLoaderData() as IProduct;

  return (
    <div>
      <PreviousPageButton />
      <ProductDetails {...product} />
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const response = await fetch(`${import.meta.env.VITE_GW_URL}/products/${id}`);
  const product = await response.json();

  return product;
}
