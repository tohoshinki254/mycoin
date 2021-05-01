import React, { useState } from 'react';
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import BlueTextTypography from '../../components/BlueTextTypography';
import DialogTitle from '../../components/DialogTitle';

const CreateWalletDialog = ({ open, onCloseClick }) => {
  const classes = useStyles();

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
              <BlueTextTypography className={classes.breakAll} gutterBottom>
                  Private Key: 7a6863f02b00a2e9e5ef765bf25115b6c2f3fb06d4873d22bc264446cd8a0978
              </BlueTextTypography>
              <BlueTextTypography className={classes.breakAll} gutterBottom>
                  Public Key: 045cb908d2cd99b61b44301f0585189d2af3205250d49032d17128a0997960eb3f1d1983b37c9c6c54c900760ad0bc41150875166aeb4ba52c835f992453d87597
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