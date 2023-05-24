import { ProductProps } from './Product';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ActionFunctionArgs, Form } from 'react-router-dom';

type Inputs = {
  name: string;
  description: string;
  quantity: number;
};

export default function ProductEdit({
  name,
  description,
  quantity,
  _id,
}: ProductProps) {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <h1 className="text-center pb-8">You're editing {name}</h1>
      <Form
        action="/admin/products/update"
        method="put"
        className="flex flex-col gap-6 bg-white	grow p-9"
      >
        <TextField
          {...register('name', { required: true })}
          placeholder="product name"
          label="Product name"
          variant="outlined"
          defaultValue={name}
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
          defaultValue={description}
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
          defaultValue={quantity}
          helperText={
            errors.quantity &&
            errors.quantity.type === 'required' &&
            'This is required'
          }
          error={!!errors.quantity}
        />
        <input type="text" hidden defaultValue={_id} name="productId" />
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
