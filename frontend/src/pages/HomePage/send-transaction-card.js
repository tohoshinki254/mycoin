import React, { useState } from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';

const SendTransactionCard = ({ openDialog }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={openDialog}>
            <CardContent className={classes.content}>
                <WhiteTextTypography variant="h4" component="h4">
                    Send
                </WhiteTextTypography>
                <WhiteTextTypography variant="h4" component="h4">
                    Transaction
                </WhiteTextTypography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        width: '90%',
        height: 170,
        backgroundImage: "url('/assets/images/send-transaction.png')",
        backgroundSize: '100%',
        cursor: 'pointer'
    },
    content: {
        paddingLeft: '10%',
        paddingTop: '5%'
    }
});

export default SendTransactionCard;