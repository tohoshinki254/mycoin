import React, { useState } from 'react';
import { Dialog, DialogContent, makeStyles, withStyles, IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import WhiteTextTypography from '../../components/WhiteTextTypography';
import BlueTextTypography from '../../components/BlueTextTypography';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: '#434f61'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
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

const CreateWalletDialog = ({ open, onCloseClick }) => {
    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            fullWidth
            aria-labelledby="create-wallet-dialog-title"
        >
            <DialogTitle id="create-wallet-dialog-title" onClose={() => onCloseClick()}>
                New Wallet Information
            </DialogTitle>
            <DialogContent style={{ padding: '5%' }}>
                <BlueTextTypography gutterBottom>
                    Private Key: 7a6863f02b00a2e9e5ef765bf25115b6c2f3fb06d4873d22bc264446cd8a0978
                </BlueTextTypography>
                <BlueTextTypography gutterBottom>
                    Public Key: 045cb908d2cd99b61b44301f0585189d2af3205250d49032d17128a0997960eb3f1d1983b37c9c6c54c900760ad0bc41150875166aeb4ba52c835f992453d87597
                </BlueTextTypography>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWalletDialog;