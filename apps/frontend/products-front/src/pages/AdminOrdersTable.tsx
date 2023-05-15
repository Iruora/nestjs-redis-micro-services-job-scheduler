import React from 'react';
import { useTable, Column, CellProps } from 'react-table';
import { Order } from '../types/order';
import { Link, useLoaderData } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import classes from './AdminOrdersTable.module.css';
import Status from '../components/Status';
import DateFormatter from '../components/DateFormater';
import CopyButton from '../components/CopyButton';

export default function AdminOrdersTable() {
  const orders = useLoaderData() as Order[];
  const data = React.useMemo(() => orders, []);
  const getStatusClassNames = (status: string) => {
    switch (status) {
      case 'IDLE':
        return classes.orderIdle;
      case 'SUCCESS':
        return classes.orderSuccess;
      case 'FAILED':
        return classes.orderFailed;
      case 'DELIVERED':
        return classes.orderDelivered;
      default:
        return classes.orderPending;
    }
  };

  const columns: Column<Order>[] = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: '_id' as keyof Order,
        Cell: CopyButton,
      },
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
        Cell: ({ value }: CellProps<Order>) => {
          return <DateFormatter date={new Date(value)} />;
        },
      },
      {
        Header: 'deliveryDate',
        accessor: 'deliveryDate' as keyof Order,
        Cell: ({ value }: CellProps<Order>) => {
          return <DateFormatter date={new Date(value)} />;
        },
      },
      {
        Header: 'address',
        accessor: 'address' as keyof Order,
      },
      {
        Header: 'productId',
        accessor: 'productId' as keyof Order,
        Cell: ({ value }: CellProps<Order>) => {
          return (
            <div>
              <Link to={`/products/${value}`}>
                <LaunchIcon />
              </Link>
            </div>
          );
        },
      },
      {
        Header: 'status',
        accessor: 'status' as keyof Order,
        Cell: (props: CellProps<Order>) => (
          <Status className={getStatusClassNames(props.value)} />
        ),
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
