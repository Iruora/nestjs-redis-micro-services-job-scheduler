import React from 'react';
import { useTable, Column } from 'react-table';
import { Order } from '../types/order';
import { useLoaderData } from 'react-router-dom';
import classes from './AdminProductsTable.module.css';

export default function AdminOrdersTable() {
  const orders = useLoaderData() as Order[];
  const data = React.useMemo(() => orders, []);

  const columns: Column<Order>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'beneficiaryName' as keyof Order,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof Order,
      },
      {
        Header: 'quantity',
        accessor: 'quantity' as keyof Order,
      },
      {
        Header: 'orderDate',
        accessor: 'orderDate' as keyof Order,
      },
      {
        Header: 'deliveryDate',
        accessor: 'deliveryDate' as keyof Order,
      },
      {
        Header: 'address',
        accessor: 'address' as keyof Order,
      },
      {
        Header: 'productId',
        accessor: 'productId' as keyof Order,
      },
      {
        Header: 'status',
        accessor: 'status' as keyof Order,
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Order>({ columns, data });

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

export async function loader() {
  const response = await fetch('http://localhost:3000/orders');

  if (response.status !== 200) {
    throw new Error('Something went wrong!');
  }

  const orders: Array<Order> = await response.json();

  return orders;
}
