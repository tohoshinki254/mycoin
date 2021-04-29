import React, { useState } from 'react';
import { Card, CardContent, CardMedia, makeStyles, Typography, withStyles } from '@material-ui/core';
import WhiteTextTypography from '../WhiteTextTypography';

// title: Create A New Wallet
// img: /assets/images/------.png
// description: Generate your own unique wallet. Receive a private key, a public key for access and recovery.
// them: backgroundColor
const MediaCard = ({ title, img, description, theme, onClick }) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root} style={{backgroundColor: theme ? '#5a78f0' : '#05c0a5'}} onClick={onClick}>
            <CardContent className={classes.content}>
                <WhiteTextTypography variant="h5" component="h2">
                    {title}
                </WhiteTextTypography>
            </CardContent>
            <CardMedia 
                className={classes.media}
                image={img}
                title={title}
            />
            <CardContent className={classes.content}>
                <WhiteTextTypography variant="body1" component="p">
                    {description} 
                </WhiteTextTypography>
                <div style={{margin: 10}}/>
                <WhiteTextTypography variant="h6" component="p">
                    Get Started
                </WhiteTextTypography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        margin: 20,
        height: 350,
        padding: 20,
        cursor: 'pointer'
    },
    title: {
        color: 'white'
    },
    media: {
        width: '30%',
        height: '30%',
        margin: '4%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default MediaCard;