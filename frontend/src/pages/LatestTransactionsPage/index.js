import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import SearchBar from '../../components/SearchBar';
import TableTransactions from './table-transactions';

const LatestTransactionsPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <div className={classes.searchField}>
                <SearchBar />
            </div>

            <TableTransactions />
            <div style={{ marginBottom: '7%' }} />
            <BottomNavigator />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    searchField: {
        flexGrow: 1,
        margin: '3%'
    }
});

export default LatestTransactionsPage;