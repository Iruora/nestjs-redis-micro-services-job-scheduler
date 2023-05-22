import React from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import { ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import classes from './AdminProductsTable.module.css';
import QuantityCell from '../components/QuantityCell';
import { IProduct } from '../types/product';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AdminProductsTable() {
  // const products = useSelector((state: RootState) => state.products.products);
  const products = useLoaderData() as IProduct[];
  const data = React.useMemo(() => products, []);

  const columns: Column<IProduct>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as keyof IProduct,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof IProduct,
      },
      {
        Header: 'quantity',
        accessor: 'quantity' as keyof IProduct,
        Cell: QuantityCell,
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<IProduct>({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className={classes.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 && (
          <tr>
            <td
              style={{ textAlign: 'center', fontSize: '1.75rem' }}
              colSpan={9}
            >
              No elements found
            </td>
          </tr>
        )}
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()} className="border-separate">
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

  await fetch(`${import.meta.env.VITE_GW_URL}/products/${productId}`, {
    method: 'put',
    body: JSON.stringify({ quantity }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return redirect('/admin/products');
}
