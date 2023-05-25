import React from 'react';
import { Form } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IProduct } from '../types/product';

type Inputs = {
  name: string;
  description: string;
  quantity: number;
};

export default function ProductForm({
  defaultValues,
  method,
  action = '/admin/products/update',
}: {
  defaultValues?: Partial<IProduct>;
  method:
    | 'GET'
    | 'get'
    | 'POST'
    | 'post'
    | 'PUT'
    | 'put'
    | 'PATCH'
    | 'patch'
    | 'DELETE'
    | 'delete';
  action?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <Form
      action={action}
      method={method}
      className="flex flex-col gap-6 bg-white	grow p-9"
    >
      <TextField
        {...register('name', { required: true })}
        placeholder="product name"
        label="Product name"
        variant="outlined"
        defaultValue={defaultValues?.name}
        fullWidth
        helperText={
          errors.name && errors.name.type === 'required' && 'This is required'
        }
        error={!!errors.name}
      />
      <TextField
        {...register('description', { required: true })}
        placeholder="product description"
        label="Product description"
        variant="outlined"
        defaultValue={defaultValues?.description}
        maxRows={8}
        multiline
        fullWidth
        helperText={
          errors.description &&
          errors.description.type === 'required' &&
          'This is required'
        }
        error={!!errors.description}
      />
      <TextField
        {...register('quantity', { required: true, min: 0 })}
        placeholder="product quantity"
        label="Product quantity"
        variant="outlined"
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
        defaultValue={defaultValues?.quantity}
        helperText={
          errors.quantity &&
          errors.quantity.type === 'required' &&
          'This is required'
        }
        error={!!errors.quantity}
      />
      <input
        type="text"
        hidden
        defaultValue={defaultValues?._id}
        name="productId"
      />
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
