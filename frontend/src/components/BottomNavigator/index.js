import React, { useState } from 'react';
import { AppBar, makeStyles, Typography } from '@material-ui/core';
import WhiteTextTypography from '../WhiteTextTypography';

const BottomNavigator = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WhiteTextTypography>
                MyCoin © 1712813 - Nguyen Thanh Tien
            </WhiteTextTypography>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        background: '#0b2840',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        position: 'fixed',
        bottom: 0,
        left: 0, 
        right: 0,
        top: 'auto'
    }
});

export default BottomNavigator;