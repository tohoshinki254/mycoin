import React, { useState } from 'react';
import { Card, CardContent, makeStyles, Grid, IconButton } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';

const BalanceCard = ({ balance, openDialog, refreshEvent }) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root} >
            <CardContent className={classes.content}>
                <Grid container>
                    <Grid item xs={3} className={classes.avatar}>
                        <img 
                            src="/assets/images/create-wallet.73282ac1.png" 
                            style={{ width: 70, height: 70}}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <WhiteTextTypography variant="h5" component="h5">
                            Balance
                        </WhiteTextTypography>
                        <div style={{margin: '2%'}}/>
                        <WhiteTextTypography className={classes.breakAll} variant="body1" component="p">
                            {balance} MEW
                        </WhiteTextTypography>
                        <div style={{margin: '2%'}}/>
                        <div>
                            <IconButton 
                                className={classes.button} 
                                onClick={openDialog}
                            >
                                <MoreOutlinedIcon />
                            </IconButton>
                            <IconButton 
                                className={classes.button} 
                                onClick={refreshEvent}
                                aria-label="refresh"
                            >
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: 170,
        backgroundColor: '#5a78f0'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%'
    },
    avatar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    breakAll: {
        wordBreak: 'break-all'
    },
    button: {
        color: 'white'
    }
});

export default BalanceCard;