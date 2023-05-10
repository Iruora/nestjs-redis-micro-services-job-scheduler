import React from 'react';
import { useTable, Column } from 'react-table';
import { ProductProps } from '../components/Product';
import { useLoaderData } from 'react-router-dom';
import classes from './AdminProductsTable.module.css';

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
                const cellProps = cell.getCellProps();

                if (cell.column.Header === 'quantity' && cell.value <= 10) {
                  cellProps.style = { fontWeight: 'bold', color: 'red' };
                } else if (cell.column.Header === 'quantity') {
                  cellProps.style = { fontWeight: 'bold', color: 'green' };
                }

                return <td {...cellProps}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
