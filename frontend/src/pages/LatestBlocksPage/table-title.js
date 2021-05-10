import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import BoldTextTypography from '../../components/BoldTextTypography';

const TableTitle = () => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.root} container>
                <Grid item xs={1} className={classes.item}>
                    <BoldTextTypography variant="body1" component="p">
                        Block
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <BoldTextTypography variant="body1" component="p">
                        Time mined
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={1} className={classes.item}>
                    <BoldTextTypography variant="body1" component="p">
                        Txn
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={6} className={classes.item}>
                    <BoldTextTypography variant="body1" component="p">
                        Miner
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={1} className={classes.item}>
                    <BoldTextTypography variant="body1" component="p">
                        Reward
                    </BoldTextTypography>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '2%',
        backgroundColor: '#f8fafd',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: '#BDBDBD',
        borderWidth: 'thin'
    },
    miner: {
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

export default TableTitle;