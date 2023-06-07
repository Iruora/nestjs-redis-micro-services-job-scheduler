import React from 'react';
import {
  useTable,
  Column,
  useSortBy,
  usePagination,
  CellProps,
} from 'react-table';
import {
  ActionFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import classes from './AdminProductsTable.module.css';
import QuantityCell from '../components/QuantityCell';
import { IProduct } from '../types/product';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paginator from '../components/Paginator';
import { IconButton } from '@mui/material';
import OpenProductDetails from '../components/OpenProductDetails';

export default function AdminProductsTable() {
  const products = useLoaderData() as IProduct[];
  const data = React.useMemo(() => products, []);
  const navigate = useNavigate();

  const columns: Column<IProduct>[] = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: '_id' as keyof IProduct,
        Cell: OpenProductDetails,
      },
      {
        Header: 'Name',
        accessor: 'name' as keyof IProduct,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof IProduct,
        Cell: ({ value }: CellProps<IProduct>) => (
          <div>{value.length > 250 ? value.slice(0, 250) : value}...</div>
        ),
      },
      {
        Header: 'quantity',
        accessor: 'quantity' as keyof IProduct,
        Cell: QuantityCell,
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<IProduct>({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <IconButton
        onClick={() => {
          navigate('./new');
        }}
      >
        <AddCircleIcon className="text-white" />
      </IconButton>
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
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} className="border-separate">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Paginator
        {...{
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          pageIndex,
          pageSize,
          page,
        }}
      />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { productId, ...payload } = data;
  const url =
    request.method === 'PUT'
      ? `${import.meta.env.VITE_GW_URL}/products/${productId}`
      : `${import.meta.env.VITE_GW_URL}/products`;

  await fetch(url, {
    method: request.method,
    body: JSON.stringify({ ...payload, quantity: +payload.quantity }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return redirect('/admin');
}
