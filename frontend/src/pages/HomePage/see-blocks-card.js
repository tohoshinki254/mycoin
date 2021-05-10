import React, { useState } from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';

const SeeBlocksCard = ({ clickEvent }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={clickEvent}>
            <CardContent className={classes.content}>
                <WhiteTextTypography variant="h4" component="h4">
                    Latest
                </WhiteTextTypography>
                <WhiteTextTypography variant="h4" component="h4">
                    Blocks
                </WhiteTextTypography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        width: '90%',
        height: 170,
        backgroundImage: "url('/assets/images/blocks.jpeg')",
        backgroundSize: '100%',
        cursor: 'pointer'
    },
    content: {
        paddingLeft: '10%',
        paddingTop: '5%'
    }
});

export default SeeBlocksCard;