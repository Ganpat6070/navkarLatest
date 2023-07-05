import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function ButtonComp(props) {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={props.onClick} style={{width: `${props.width}`}}>{props.children}</Button>
    </Stack>
  );
}