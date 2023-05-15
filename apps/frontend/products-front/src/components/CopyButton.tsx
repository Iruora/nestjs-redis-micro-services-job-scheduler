import React from 'react';
import { CellProps } from 'react-table';
import { Order } from '../types/order';
import { Tooltip, IconButton, Snackbar, Alert } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import classes from './CopyButton.module.css';

export default function CopyButton(props: CellProps<Order>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.pasteIcon}>
      <Tooltip title="Copy order ID">
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(props.value);
            setOpen(true);
          }}
        >
          <ContentPasteIcon className={classes.pasteIcon} />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        message="Order ID copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Order ID copied to clipboard
        </Alert>
      </Snackbar>
    </div>
  );
}
