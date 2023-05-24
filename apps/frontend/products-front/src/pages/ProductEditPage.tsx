import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IProduct } from '../types/product';
import ProductEdit from '../components/ProductEdit';

export default function ProductEditPage() {
  const navigate = useNavigate();
  const product = useLoaderData() as IProduct;

  return (
    <>
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
        className="place-self-start	"
      >
        <ArrowBackIcon className="text-white" />
      </IconButton>
      <ProductEdit {...product} />
    </>
  );
}
