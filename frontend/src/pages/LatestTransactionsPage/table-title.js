import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import BoldTextTypography from '../../components/BoldTextTypography';

const TableTitle = () => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.root} container>
                <Grid item xs={5}>
                    <BoldTextTypography variant="body1" component="p">
                        From
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={5}>
                    <BoldTextTypography variant="body1" component="p">
                        To
                    </BoldTextTypography>
                </Grid>
                <Grid item xs={2}>
                    <BoldTextTypography variant="body1" component="p">
                        Amount
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
    }
});

export default TableTitle;