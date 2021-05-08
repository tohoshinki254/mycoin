import React, { useState } from 'react';
import { Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';

const AddressCard = ({ address }) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root} >
            <CardContent className={classes.content}>
                <Grid container>
                    <Grid item xs={3} className={classes.avatar}>
                        <img 
                            src="/assets/images/avatar.png" 
                            style={{ width: 70, height: 70, borderRadius: '50%', borderStyle: 'solid', borderColor: 'white'}}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <WhiteTextTypography variant="h5" component="h5">
                            Address
                        </WhiteTextTypography>
                        <div style={{margin: '2%'}}/>
                        <WhiteTextTypography className={classes.breakAll} variant="body1" component="p">
                            {address}
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
        height: 170,
        backgroundColor: '#7070e3'
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
    }
});

export default AddressCard;