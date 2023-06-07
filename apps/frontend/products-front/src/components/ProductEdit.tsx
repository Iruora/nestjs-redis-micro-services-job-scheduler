import { ProductProps } from './Product';
import ProductForm from './ProductForm';

export default function ProductEdit({
  name,
  description,
  quantity,
  _id,
}: ProductProps) {
  return (
    <>
      <h1 className="text-center pb-8">You're editing {name}</h1>
      <ProductForm
        method="PUT"
        defaultValues={{ name, description, quantity, _id }}
      />
    </>
  );
}
