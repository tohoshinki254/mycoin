import React, { useState } from 'react';
import { Dialog, DialogContent, makeStyles, Grid } from '@material-ui/core';
import BlueTextTypography from '../../components/BlueTextTypography';
import DialogTitle from '../../components/DialogTitle';

const BalanceDialog = ({ open, onCloseClick, balance }) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            fullWidth
            aria-labelledby="balance-dialog-title"
        >
            <DialogTitle id="balance-dialog-title" onClose={() => onCloseClick()}>
                Balance
            </DialogTitle>
            <DialogContent style={{ padding: '5%' }}>
                <Grid container>
                    <Grid className={classes.leftGrid} item xs={6}>
                        <BlueTextTypography gutterBottom>
                            Total Balance
                        </BlueTextTypography>
                    </Grid>
                    <Grid className={classes.rightGrid} item xs={6}>
                        <BlueTextTypography gutterBottom>
                            {balance} MEW
                        </BlueTextTypography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

const useStyles = makeStyles({
    leftGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rightGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
});

export default BalanceDialog;