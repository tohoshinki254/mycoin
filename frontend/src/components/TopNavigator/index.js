import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, Paper, TableContainer, IconButton, Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TopNavigator = ({ isAccessed }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar classes={{colorDefault: classes.colorDefault}} color='default' position='static'>
                <Toolbar className={classes.toolbar} variant="inherit">
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">
                            <TableContainer className={classes.tableContainer} component={Paper}>
                                <img src="/assets/images/short-hand-logo-web.5d962d4e.png" width='25%' height='25%'/>
                            </TableContainer>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
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
    },
    iconColorDefault:{
        color: '#ffffff'
    },
});

export default TopNavigator;