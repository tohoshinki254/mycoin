import React, { useState } from 'react';
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import BlueTextTypography from '../../components/BlueTextTypography';
import DialogTitle from '../../components/DialogTitle';

const CreateWalletDialog = ({ open, onCloseClick, privateKey, publicKey }) => {
  const classes = useStyles();

  return (
      <Dialog
          open={open}
          onClose={onCloseClick}
          fullWidth
          aria-labelledby="create-wallet-dialog-title"
      >
          <DialogTitle id="create-wallet-dialog-title" onClose={() => onCloseClick()}>
              Your New Wallet Information
          </DialogTitle>
          <DialogContent style={{ padding: '5%' }}>
              <BlueTextTypography className={classes.breakAll} gutterBottom>
                  Private Key: {privateKey}
              </BlueTextTypography>
              <BlueTextTypography className={classes.breakAll} gutterBottom>
                  Public Key: {publicKey}
              </BlueTextTypography>
          </DialogContent>
      </Dialog>
  )
}

const useStyles = makeStyles({
  breakAll: {
    wordBreak: 'break-all'
  }
})

export default CreateWalletDialog;