import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, Paper, TableContainer } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TopNavigator = ({ isAccessed }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar classes={{colorDefault: classes.colorDefault}} color='default' position='static'>
                <Toolbar className={classes.toolbar} variant="inherit">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">
                        <TableContainer className={classes.tableContainer} component={Paper}>
                            <img src="/assets/images/short-hand-logo-web.5d962d4e.png" width='23%' height='23%'/>
                        </TableContainer>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 'auto'
    },
    colorDefault: {
        background: '#fff'
    },
    toolbar: {
        paddingBottom: '1%',
        paddingTop: '1%',
        paddingLeft: '7%'
    },
    tableContainer: {
        boxShadow: "none",
    }
});

export default TopNavigator;