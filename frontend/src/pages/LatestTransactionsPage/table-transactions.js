import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TransactionItem from './transaction-item';
import TableTitle from './table-title';
import Pagination from '@material-ui/lab/Pagination';

const TableBlocks = ({ page, totalPage, transactions, pageChange }) => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.container} container>
                <TableTitle />
                {transactions.map(item => <TransactionItem {...item} />)}
            </Grid>
            <Grid style={{ marginTop: '2%' }} container justify='center'>
                <Pagination 
                    count={totalPage} 
                    page={page} 
                    color='primary' 
                    size='large' 
                    onChange={pageChange}
                />
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '2%',
        height: '75%'
    },
});

export default TableBlocks;