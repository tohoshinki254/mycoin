import React, { useState } from 'react';
import { Dialog, DialogContent, Button, DialogActions, withStyles } from '@material-ui/core';
import BlueTextField from '../../components/BlueTextField';
import DialogTitle from '../../components/DialogTitle';

const SendButton = withStyles((theme) => ({
    root: {
      color: '#05c0a5',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
}))(Button);

const SendTransactionDialog = ({ open, onCloseClick }) => {
    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            fullWidth
            aria-labelledby="create-wallet-dialog-title"
        >
            <DialogTitle id="create-wallet-dialog-title" onClose={() => onCloseClick()}>
                Send Transaction
            </DialogTitle>
            <DialogContent dividers style={{ padding: '5%' }}>
                <BlueTextField label="Receiver Address" variant="outlined" style={{width: '100%'}}/>
                <div style={{ margin: '5%' }}/>
                <BlueTextField label="Amount" variant="outlined" style={{width: '100%'}}/>
            </DialogContent>
            <DialogActions>
                <SendButton autoFocus onClick={() => {}} >
                    Send
                </SendButton>
            </DialogActions>
        </Dialog>
    )
}

export default SendTransactionDialog;