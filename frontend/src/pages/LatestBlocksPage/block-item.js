import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const BlockItem = ({ index, time, numberOfTransaction, miner, reward }) => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.root} container>
                <Grid item xs={1} className={classes.item}>
                    <Typography variant="body1" component="p" color="primary">
                        {index}
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <Typography variant="body1" component="p">
                        {time}
                    </Typography>
                </Grid>
                <Grid item xs={1} className={classes.item}>
                    <Typography variant="body1" component="p">
                        {numberOfTransaction}
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.item}>
                    <Typography variant="body1" component="p" className={classes.miner}>
                        {miner}
                    </Typography>
                </Grid>
                <Grid item xs={1} className={classes.item}>
                    <Typography variant="body1" component="p">
                        {reward}
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
        overflow: 'hidden',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BlockItem;