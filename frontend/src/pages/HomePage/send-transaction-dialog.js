import React, { useState } from 'react';
import { Dialog, DialogContent, Button, DialogActions, withStyles } from '@material-ui/core';
import BlueTextField from '../../components/BlueTextField';
import DialogTitle from '../../components/DialogTitle';
import * as Actions from '../../actions/actions';
import { PRIVATE_KEY } from '../../global/constants';

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
    const [receiverAddress, setReceiverAddress] = useState("");
    const [amount, setAmount] = useState();
    const [disableButton, setDisableButton] = useState(true);
    const [result, setResult] = useState({ successful: false, message: null });

    const handleChangeReceiver = (event) => {
        let value = event.target.value;
        if (value.length === 130 && amount > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
        setReceiverAddress(value);
    }

    const handleChangeAmount = (event) => {
        let value = event.target.value;
        if (value < 0) {
            value = 0;
        }
        if (receiverAddress.length === 130 && value > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
        setAmount(value);
    }

    const sendTransactionEvent = (address, amount) => {
        Actions.sendTransaction(localStorage.getItem(PRIVATE_KEY), address, amount, setResult);
    }

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
                <BlueTextField 
                    label="Receiver Address" 
                    variant="outlined" 
                    style={{width: '100%'}}
                    value={receiverAddress}
                    onChange={(event) => handleChangeReceiver(event)}
                />
                <div style={{ margin: '5%' }}/>
                <BlueTextField 
                    label="Amount" 
                    variant="outlined" 
                    style={{width: '100%'}}
                    type="number"
                    value={amount}
                    onChange={(event) => handleChangeAmount(event)}
                />
            </DialogContent>
            <DialogActions>
                <SendButton 
                    autoFocus 
                    onClick={() => sendTransactionEvent(receiverAddress, amount)} 
                    disabled={disableButton}
                >
                    Send
                </SendButton>
            </DialogActions>
        </Dialog>
    )
}

export default SendTransactionDialog;