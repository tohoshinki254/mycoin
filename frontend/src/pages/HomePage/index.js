import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import AddressCard from './address-card';
import BalanceCard from './balance-card';
import BalanceDialog from './balance-dialog';
import SendTransactionCard from './send-transaction-card';
import SeeBlocksCard from './see-blocks-card';
import SeeTransactionsCard from './see-transactions-card';
import SendTransactionDialog from './send-transaction-dialog';
import MineBlockCard from './mine-block-card';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../global/constants';
import * as Actions from '../../actions/actions';
import { Redirect, useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const HomePage = () => {
    const classes = useStyles();
    let history = useHistory();
    const { isAccessed } = useContext(AppContext);
    const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
    const [openSendTransactionDialog, setOpenSendTransactionDialog] = useState(false);
    const [balance, setBalance] = useState({ successful: false, data: null });

    const getBalance = (address) => {
        Actions.getBalance(address, setBalance);
    }

    useEffect(() => {
        getBalance(localStorage.getItem(PUBLIC_KEY));
    }, []);

    const handleCloseBalanceDialog = () => {
        setOpenBalanceDialog(false);
    }

    const handleCloseSendTransactionDialog = () => {
        setOpenSendTransactionDialog(false);
    }

    const seeBlockCardClick = () => {
        history.push('/blocks/all');
    }

    const seeTransactionCardClick = () => {
        history.push('/transactions/all');
    }

    if (!isAccessed || localStorage.getItem(PUBLIC_KEY) === null) {
        return <Redirect to='/wallet'/>
    }

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <Grid container>
                <Grid className={classes.cardInfo} item xs={6}>
                    <AddressCard address={localStorage.getItem(PUBLIC_KEY)}/>
                </Grid>
                <Grid className={classes.cardInfo} item xs={6}>
                    <BalanceCard 
                        balance={balance.successful ? balance.data.balance : "-INF"}
                        openDialog={() => setOpenBalanceDialog(true)}
                        refreshEvent={() => getBalance(localStorage.getItem(PUBLIC_KEY))}
                    />
                </Grid>
            </Grid>

            <div style={{ marginBottom: '7%' }}/>
            <Grid container>
                <Grid className={classes.cardInfo} item xs={6}>
                    <MineBlockCard />
                </Grid>
                <Grid className={classes.cardInfo} item xs={6}>
                    <SeeBlocksCard clickEvent={() => seeBlockCardClick()} />
                </Grid>
            </Grid>

            <div style={{ marginBottom: '7%' }}/>
            <Grid container>
                <Grid className={classes.cardInfo} item xs={6}>
                    <SendTransactionCard openDialog={() => setOpenSendTransactionDialog(true)}/>
                </Grid>
                <Grid className={classes.cardInfo} item xs={6}>
                    <SeeTransactionsCard clickEvent={() => seeTransactionCardClick()} />
                </Grid>
            </Grid>

            <div style={{ marginBottom: '7%' }}/>
            <BottomNavigator />

            <BalanceDialog 
                open={openBalanceDialog} 
                onCloseClick={handleCloseBalanceDialog} 
                balance={balance.successful ? balance.data.balance : "-INF"}
            />
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