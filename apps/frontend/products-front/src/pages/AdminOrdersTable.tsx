import React from 'react';
import { useTable, Column, CellProps, useSortBy } from 'react-table';
import { IOrder } from '../types/order';
import { Link, useLoaderData } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import classes from './AdminOrdersTable.module.css';
import Status from '../components/Status';
import DateFormatter from '../components/DateFormater';
import CopyButton from '../components/CopyButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AdminOrdersTable() {
  const orders = useLoaderData() as IOrder[];
  const data = React.useMemo(() => orders, []);
  const getStatusClassNames = (status: string) => {
    switch (status) {
      case 'IDLE':
        return classes.orderIdle;
      case 'SUCCESS':
        return classes.orderSuccess;
      case 'REJECTED':
        return classes.orderFailed;
      case 'DELIVERED':
        return classes.orderDelivered;
      default:
        return classes.orderPending;
    }
  };

  const columns: Column<IOrder>[] = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: '_id' as keyof IOrder,
        Cell: CopyButton,
      },
      {
        Header: 'Name',
        accessor: 'beneficiaryName' as keyof IOrder,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof IOrder,
      },
      {
        Header: 'quantity',
        accessor: 'quantity' as keyof IOrder,
      },
      {
        Header: 'orderDate',
        accessor: 'orderDate' as keyof IOrder,
        Cell: ({ value }: CellProps<IOrder>) => {
          return <DateFormatter date={new Date(value)} />;
        },
      },
      {
        Header: 'deliveryDate',
        accessor: 'deliveryDate' as keyof IOrder,
        Cell: ({ value }: CellProps<IOrder>) => {
          return <DateFormatter date={new Date(value)} />;
        },
      },
      {
        Header: 'address',
        accessor: 'address' as keyof IOrder,
      },
      {
        Header: 'productId',
        accessor: 'productId' as keyof IOrder,
        Cell: ({ value }: CellProps<IOrder>) => {
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
        accessor: 'status' as keyof IOrder,
        Cell: (props: CellProps<IOrder>) => (
          <Status className={getStatusClassNames(props.value)} />
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<IOrder>({ columns, data }, useSortBy);

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
  const response = await fetch(`${import.meta.env.VITE_GW_URL}/orders`);

  if (response.status !== 200) {
    throw new Error('Something went wrong!');
  }

  const orders: Array<IOrder> = await response.json();

  return orders;
}
