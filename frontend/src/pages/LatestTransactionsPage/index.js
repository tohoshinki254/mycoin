import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import BottomNavigator from '../../components/BottomNavigator';
import SearchBar from '../../components/SearchBar';
import TableTransactions from './table-transactions';
import { AppContext } from '../../contexts/AppContext';
import * as Actions from '../../actions/actions';
import { PUBLIC_KEY } from '../../global/constants';
import { Redirect, useHistory } from 'react-router-dom';
import socket from '../../global/socket';

const LatestTransactionsPage = ({ match }) => {
    const classes = useStyles();
    const { isAccessed } = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listTransactions, setListTransactions] = useState([]);
    const [reload, setReload] = useState(Math.random());
    let history = useHistory();

    useEffect(() => {
        if (match.params.address === "all") {
            Actions.getAllTransactions(1, setPage, setTotalPage, setListTransactions);
        } else {
            Actions.getTransactionOfAddress(match.params.address, 1, setPage, setTotalPage, setListTransactions);
        }
    }, [reload]);

    useEffect(() => {
        socket.on('reload-list-transactions', () => {
            setReload(Math.random());
        })
        return () => {
            socket.off('reload-list-transactions');
        }
    }, [])

    const handlePageChange = (event, value) => {
        if (match.params.address === "all") {
            Actions.getAllTransactions(value, setPage, setTotalPage, setListTransactions);
        } else {
            Actions.getTransactionOfAddress(match.params.address, value, setPage, setTotalPage, setListTransactions);
        }
    }

    const handleSearchClick = (address) => {
        const to = '/transactions/' + address;
        history.push(to);
    }

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <div className={classes.searchField}>
                <SearchBar search={handleSearchClick}/>
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