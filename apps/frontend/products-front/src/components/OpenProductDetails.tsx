import React from 'react';
import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';
import LaunchIcon from '@mui/icons-material/Launch';

export default function OpenProductDetails<T extends object>({
  value,
}: CellProps<T>) {
  return (
    <div>
      <Link to={`/admin/products/${value}`}>
        <LaunchIcon />
      </Link>
    </div>
  );
}
