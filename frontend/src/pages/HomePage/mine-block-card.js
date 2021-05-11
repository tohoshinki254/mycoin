import React, { useState } from 'react';
import { Card, CardContent, makeStyles, Grid, Button, withStyles, CircularProgress } from '@material-ui/core';
import WhiteTextTypography from '../../components/WhiteTextTypography';
import * as Actions from '../../actions/actions';
import { PRIVATE_KEY } from '../../global/constants';
import socket from '../../global/socket';

const MineButton = withStyles((theme) => ({
    root: {
        color: '#25b0e8',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
    },
}))(Button);

const MineProgress = withStyles((theme) => ({
    root: {
        color: 'white'
    }
}))(CircularProgress);

const MineBlockCard = () => {
    const classes = useStyles();
    const [mineState, setMineState] = useState({ successful: false, data: null });
    const [progress, setProgress] = useState(false);

    const mineBlockEvent = () => {
        setProgress(true);
        Actions.mineBlock(localStorage.getItem(PRIVATE_KEY), setMineState, setProgress);
    }

    const updateList = () => {
        socket.emit('new-block-mined');
        socket.emit('new-transaction-created');
        return true;
    }

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
                            Mine Block
                        </WhiteTextTypography>
                        <div style={{margin: '2%'}}/>
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                            <MineButton 
                                onClick={() => mineBlockEvent()}
                            >
                                Mine
                            </MineButton>
                            {progress && <MineProgress style={{ marginLeft: '10%' }}/>}
                        </div>
                        
                        <div style={{margin: '2%'}}/>
                        {
                            mineState.successful && updateList() && 
                            <WhiteTextTypography className={classes.breakAll} variant="body1" component="p">
                                New block: #{mineState.data.index} <br />
                                Rewarded: {mineState.data.reward}
                            </WhiteTextTypography>
                        }
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

export default MineBlockCard;