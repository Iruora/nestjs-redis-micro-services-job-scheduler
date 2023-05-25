import React from 'react';
import classes from './ProductDetails.module.css';
import { ProductProps } from './Product';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonGroup, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails({
  name,
  description,
  quantity,
}: ProductProps) {
  const navigate = useNavigate();

  function deleteProductHandler() {
    const deletionConfirmed = confirm(
      `Are you sure you want to delete product ${name} ? you still have ${quantity} in store`,
    );

    if (deletionConfirmed) {
      console.log('deleted');
    }
  }

  return (
    <div className={classes['product-container']}>
      <div className="flex flex-row">
        <h1 className="grow">{name} </h1>
        <small style={{ color: quantity > 0 ? '#1cff3a' : '#f22e2e' }}>
          {quantity > 0 ? `available in ${quantity} item(s)` : 'Out of stock'}
        </small>
      </div>
      <div className={`${classes.actions} flex flex-row-reverse`}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <IconButton
            style={{ color: 'white' }}
            onClick={() => {
              navigate('edit');
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton style={{ color: 'white' }} onClick={deleteProductHandler}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </div>
      <div>{description}</div>
    </div>
  );
}
