import React from 'react';
import classes from './Product.module.css';
import { Tooltip, IconButton } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Form, ActionFunctionArgs, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { IProduct } from '../types/product';
import { RootState } from '../store';

export interface ProductProps extends IProduct {
  cartMode?: boolean;
}

export default function Product({
  name,
  description,
  quantity,
  _id,
  cartMode,
}: ProductProps) {
  const cartState = useSelector((state: RootState) => state.cart);
  const [orderQuantity, setOrderQuantity] = React.useState(
    getProductInitialQuantity(_id),
  );
  const dispatch = useDispatch();

  function getProductInitialQuantity(productId: string) {
    const product = cartState.products.find(
      (product) => product._id === productId,
    );

    if (product) {
      return product.orderQuantity;
    }

    return 0;
  }

  function handleAddProductToCart(product: IProduct) {
    dispatch(cartActions.addProduct(product));
  }

  return (
    <>
      <div
        className={
          classes[
            quantity === 0 ? 'product--title__out-of-stock' : 'product--title'
          ]
        }
      >
        {name}
      </div>
      <div className={classes['product--description']}>{description}</div>
      <div
        className={
          quantity === 0
            ? classes['product--out-of-stock']
            : classes['product--quantity']
        }
      >
        {quantity === 0 ? 'Out of Stock' : `available in ${quantity} items`}
        {quantity > 0 && cartMode && (
          <Form
            method="post"
            action="/?order=true"
            className="flex flex-row justify-between items-center"
          >
            <input
              type="number"
              placeholder={`Quantity (max ${quantity})`}
              max={quantity}
              value={orderQuantity}
              hidden
              name="quantity"
              onChange={() => {}}
            />
            <input type="text" defaultValue={_id} name="productId" hidden />
            <Tooltip title="decrement order quantity">
              <span>
                <IconButton
                  disabled={orderQuantity === 0}
                  onClick={() => {
                    orderQuantity > 0 &&
                      setOrderQuantity(
                        (previousOrderQuantity) => previousOrderQuantity - 1,
                      );
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </span>
            </Tooltip>
            <div>{orderQuantity}</div>
            <Tooltip title="Increment order quantity">
              <span>
                <IconButton
                  disabled={quantity === orderQuantity}
                  onClick={() => {
                    orderQuantity < quantity &&
                      setOrderQuantity(
                        (previousOrderQuantity) => previousOrderQuantity + 1,
                      );
                  }}
                >
                  <ControlPointIcon />
                </IconButton>
              </span>
            </Tooltip>
            <button
              className={classes['product--order-btn']}
              disabled={quantity === 0 || orderQuantity > quantity}
              type="submit"
              onClick={() => {
                location.reload();
              }}
            >
              Order
            </button>
          </Form>
        )}
        {quantity > 0 && !cartMode && (
          <IconButton
            onClick={() =>
              handleAddProductToCart({ _id, name, description, quantity })
            }
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { quantity, productId } = Object.fromEntries(formData);

  const data = {
    beneficiaryName: 'Nidhal AROURI',
    description: 'Test',
    quantity: +quantity,
    orderDate: new Date(Date.now()).toISOString(),
    deliveryDate: '2024-06-05T22:00:00.000Z',
    address: 'planet earth, solar system',
    productId: productId,
  };

  fetch(`${import.meta.env.VITE_GW_URL}/orders`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/');
}
