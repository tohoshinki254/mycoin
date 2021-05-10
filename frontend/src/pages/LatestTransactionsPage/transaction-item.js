import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const TransactionItem = ({ from, to, amount, time }) => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.root} container>
                <Grid item xs={2} className={classes.item}>
                    <Typography variant="body1" component="p">
                        {time}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body1" component="p" className={classes.address}>
                        {from}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body1" component="p" className={classes.address}>
                        {to}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <Typography variant="body1" component="p">
                        {amount}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '2%',
        borderBottomStyle: 'solid',
        borderColor: '#E0E0E0',
        borderWidth: 'thin'
    },
    address: {
        width: '90%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TransactionItem;