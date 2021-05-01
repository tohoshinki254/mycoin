import React, { useState } from 'react';
import { Card, CardContent, makeStyles, Grid, Button, withStyles } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';

const NetworkCard = () => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root} >
            <CardContent className={classes.content}>
                <Grid container>
                    <Grid item xs={3} className={classes.avatar}>
                        <img 
                            src="/assets/images/eth-logo.7fe75c25.svg" 
                            style={{ width: 60, height: 60 }}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <WhiteTextTypography variant="h5" component="h5">
                            Network
                        </WhiteTextTypography>
                        <div style={{margin: '2%'}}/>
                        <WhiteTextTypography className={classes.breakAll} variant="body1" component="p">
                            myetherwallet.com(MEW)
                        </WhiteTextTypography>
                        <WhiteTextTypography className={classes.breakAll} variant="body1" component="p">
                            Last block# : 12339248
                        </WhiteTextTypography>
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
        height: 150,
        backgroundColor: '#25b0e8'
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
        alignItems: 'center',
    },
    breakAll: {
        wordBreak: 'break-all'
    }
});

export default NetworkCard;