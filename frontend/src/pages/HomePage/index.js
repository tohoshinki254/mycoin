import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import AddressCard from './address-card';
import BalanceCard from './balance-card';
import NetworkCard from './network-card';
import BalanceDialog from './balance-dialog';
import SendTransactionCard from './send-transaction-card';
import SeeBlocksCard from './see-blocks-card';
import SeeTransactionsCard from './see-transactions-card';
import SendTransactionDialog from './send-transaction-dialog';

const HomePage = () => {
    const classes = useStyles();
    const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
    const [openSendTransactionDialog, setOpenSendTransactionDialog] = useState(false);

    const handleCloseBalanceDialog = () => {
        setOpenBalanceDialog(false);
    }

    const handleCloseSendTransactionDialog = () => {
        setOpenSendTransactionDialog(false);
    }

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <Grid container>
                <Grid className={classes.cardInfo} item xs={4}>
                    <AddressCard address="0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A"/>
                </Grid>
                <Grid className={classes.cardInfo} item xs={4}>
                    <BalanceCard balance="2000" openDialog={() => setOpenBalanceDialog(true)} />
                </Grid>
                <Grid className={classes.cardInfo} item xs={4}>
                    <NetworkCard />
                </Grid>
            </Grid>
            <div style={{ marginBottom: '7%' }}/>
            <Grid container>
                <Grid className={classes.cardInfo} item xs={4}>
                    <SendTransactionCard openDialog={() => setOpenSendTransactionDialog(true)}/>
                </Grid>
                <Grid className={classes.cardInfo} item xs={4}>
                    <SeeBlocksCard />
                </Grid>
                <Grid className={classes.cardInfo} item xs={4}>
                    <SeeTransactionsCard />
                </Grid>
            </Grid>

            <div style={{ marginBottom: '7%' }}/>
            <BottomNavigator />

            <BalanceDialog open={openBalanceDialog} onCloseClick={handleCloseBalanceDialog} />
            <SendTransactionDialog open={openSendTransactionDialog} onCloseClick={handleCloseSendTransactionDialog} />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2%'
    }
});

export default HomePage;