import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const BlockItem = () => {
    const classes = useStyles();

    // index - time - Txn - 
    return (
        <>
            <Grid className={classes.root} container>
                <Grid item xs={2}>
                    <Typography variant="body1" component="p" color="primary">
                        12347179
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body1" component="p">
                        2020/01/01 12:00:00
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" component="p">
                        200
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body1" component="p" className={classes.miner}>
                        0x12412412412412412412412411111111111111111111111
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" component="p">
                        200
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
    miner: {
        width: '90%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }
});

export default BlockItem;