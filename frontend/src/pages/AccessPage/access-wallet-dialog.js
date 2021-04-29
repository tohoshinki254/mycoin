import React, { useState } from 'react';
import { Dialog, DialogContent, withStyles, IconButton, Button, DialogActions } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import WhiteTextTypography from '../../components/WhiteTextTypography';
import BlueTextField from '../../components/BlueTextField';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: '#05c0a5'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: 'white',
    },
  });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <WhiteTextTypography variant="h6">{children}</WhiteTextTypography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const AccessButton = withStyles((theme) => ({
    root: {
      color: '#05c0a5',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
}))(Button);

const CreateWalletDialog = ({ open, onCloseClick }) => {
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
                <BlueTextField label="Private Key" variant="outlined" style={{width: '100%'}}/>
            </DialogContent>
            <DialogActions>
                <AccessButton autoFocus onClick={() => {}} >
                    Access Wallet
                </AccessButton>
            </DialogActions>
        </Dialog>
    )
}

export default CreateWalletDialog;