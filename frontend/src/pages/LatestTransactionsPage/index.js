import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import SearchBar from '../../components/SearchBar';
import TableTransactions from './table-transactions';
import { AppContext } from '../../contexts/AppContext';
import * as Actions from '../../actions/actions';
import { PUBLIC_KEY } from '../../global/constants';
import { Redirect } from 'react-router-dom';

const LatestTransactionsPage = ({ match }) => {
    const classes = useStyles();
    const { isAccessed } = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listTransactions, setListTransactions] = useState([]);

    useEffect(() => {
        if (match.params.address === "all") {
            Actions.getAllTransactions(1, setPage, setTotalPage, setListTransactions);
        } else {
            Actions.getTransactionOfAddress(match.params.address, 1, setPage, setTotalPage, setListTransactions);
        }
    }, []);

    const handlePageChange = (event, value) => {
        if (match.params.address === "all") {
            Actions.getAllTransactions(value, setPage, setTotalPage, setListTransactions);
        } else {
            Actions.getTransactionOfAddress(match.params.address, value, setPage, setTotalPage, setListTransactions);
        }
    }

    if (!isAccessed || localStorage.getItem(PUBLIC_KEY) === null) {
        return <Redirect to='/wallet' />
    }

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <div className={classes.searchField}>
                <SearchBar />
            </div>

            <TableTransactions 
                page={page}
                totalPage={totalPage}
                transactions={listTransactions}
                pageChange={handlePageChange}
            />
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