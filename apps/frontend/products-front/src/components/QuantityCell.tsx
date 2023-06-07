import { useState } from 'react';
import { CellProps } from 'react-table';
import classes from './QuantityCell.module.css';
import { Form } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CancelIcon from '@mui/icons-material/Cancel';
import { IProduct } from '../types/product';

export default function QuantityCell(props: CellProps<IProduct>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Form className={classes.quantityCell} method="put" action="update">
      {isEditing ? (
        <>
          <input
            type="number"
            defaultValue={props.value}
            name="quantity"
            className={classes.productQtyInput}
          />
          <input
            type="text"
            hidden
            defaultValue={props.row.original._id}
            name="productId"
          />
          <button type="submit">
            <UpgradeIcon />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <CancelIcon />
          </button>
        </>
      ) : (
        <>
          <span
            className={
              props.value === 0 ? classes.lowQuantity : classes.quantity
            }
          >
            {props.value}
          </span>{' '}
          <ModeEditIcon onClick={() => setIsEditing(true)} />
        </>
      )}
    </Form>
  );
}
