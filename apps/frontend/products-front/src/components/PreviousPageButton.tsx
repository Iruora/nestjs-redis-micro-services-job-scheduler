import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PreviousPageButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate(-1);
      }}
      className="place-self-start	"
    >
      <ArrowBackIcon className="text-white" />
    </IconButton>
  );
}
