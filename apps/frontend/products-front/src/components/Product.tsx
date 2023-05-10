import React from 'react';
import classes from './Product.module.css';

export interface ProductProps {
  name: string;
  description: string;
  quantity: number;
  _id: string;
}

export default function Product({ name, description, quantity }: ProductProps) {
  return (
    <>
      <div className={classes['product--title']}>{name}</div>
      <div className={classes['product--description']}>{description}</div>
      <div
        className={
          quantity === 0
            ? classes['product--out-of-stock']
            : classes['product--quantity']
        }
      >
        {quantity === 0 ? 'Out of Stock' : `available in ${quantity} items`}
        <button
          className={classes['product--order-btn']}
          disabled={quantity === 0}
        >
          Order
        </button>
      </div>
    </>
  );
}
