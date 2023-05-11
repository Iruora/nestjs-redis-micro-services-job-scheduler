import React from 'react';
import { useTable, Column } from 'react-table';
import { ProductProps } from '../components/Product';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import classes from './AdminProductsTable.module.css';
import QuantityCell from '../components/QuantityCell';

export default function AdminProductsTable() {
  const products = useLoaderData() as ProductProps[];
  const data = React.useMemo(() => products, []);

  const columns: Column<ProductProps>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as keyof ProductProps,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof ProductProps,
      },
      {
        Header: 'quantity',
        accessor: 'quantity' as keyof ProductProps,
        Cell: QuantityCell,
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<ProductProps>({ columns, data });

  return (
    <table {...getTableProps()} className={classes.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { quantity, productId } = Object.fromEntries(formData);
  console.log({ quantity, productId });

  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: 'put',
    body: JSON.stringify({ quantity }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response;
}
