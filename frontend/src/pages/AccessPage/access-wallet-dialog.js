import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, Button, DialogActions, withStyles } from '@material-ui/core';
import BlueTextField from '../../components/BlueTextField';
import DialogTitle from '../../components/DialogTitle';
import * as Actions from '../../actions/actions';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../global/constants';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const AccessButton = withStyles((theme) => ({
    root: {
      color: '#05c0a5',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
}))(Button);

const AccessWalletDialog = ({ open, onCloseClick }) => {
    const { setIsAccessed } = useContext(AppContext);
    const [accessWallet, setAccessWallet] = useState({ successful: false, data: null });
    const [key, setKey] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const handleChangeKey = (event) => {
        let value = event.target.value;
        if (value.length === 64) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
        setKey(value);
    }

    const accessWalletEvent = (key) => {
        Actions.accessWallet(key, setAccessWallet);
    }

    if (accessWallet.successful) {
        console.log("TRUE");
        localStorage.setItem(PRIVATE_KEY, accessWallet.data.privateKey);
        localStorage.setItem(PUBLIC_KEY, accessWallet.data.publicKey);
        setIsAccessed(true);
        return <Redirect to='/dashboard' />
    }

    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            fullWidth
            aria-labelledby="create-wallet-dialog-title"
        >
            <DialogTitle id="create-wallet-dialog-title" onClose={() => onCloseClick()}>
                Access by Private Key
            </DialogTitle>
            <DialogContent dividers style={{ padding: '5%' }}>
                <BlueTextField 
                    label="Private Key" 
                    variant="outlined" 
                    style={{width: '100%'}}
                    placeholder="Enter private key to access your wallet"
                    value={key}
                    onChange={(event) => handleChangeKey(event)}
                />
            </DialogContent>
            <DialogActions>
                <AccessButton 
                    autoFocus 
                    onClick={() => accessWalletEvent(key)}
                    disabled={disableButton}
                >
                    Access Wallet
                </AccessButton>
            </DialogActions>
        </Dialog>
    )
}

export default AccessWalletDialog;