import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 0,
};

export default function MUIAlerts() {
const { auth } = useContext(AuthContext);

function handleCloseError(event) {
    auth.removeError();
}

{console.log(auth.isError())}
  return (
    <Modal open={auth.isError()} >    
        <Box sx={style}>
            <Alert severity="error" action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseError}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }>
                <AlertTitle>Error</AlertTitle>
                <strong>{auth.errormessage}</strong>
            </Alert>
        </Box>
    </Modal>
      
  );
}