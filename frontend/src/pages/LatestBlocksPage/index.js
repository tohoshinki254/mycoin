import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import SearchBar from '../../components/SearchBar';
import TableBlocks from './table-blocks';

const LatestBlocksPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <div className={classes.searchField}>
                <SearchBar />
            </div>

            <TableBlocks />
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

export default LatestBlocksPage;