import React from 'react';
import { CellProps } from 'react-table';
import { Tooltip, IconButton, Snackbar, Alert } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import classes from './CopyButton.module.css';

export default function CopyButton<T extends object>(props: CellProps<T>) {
  const [open, setOpen] = React.useState(false);
  async function handleCopyButtonClick() {
    await navigator.clipboard.writeText(props.value);
    setOpen(true);
  }

  return (
    <div className={classes.pasteIcon}>
      <Tooltip title="Copy order ID">
        <IconButton onClick={handleCopyButtonClick}>
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
