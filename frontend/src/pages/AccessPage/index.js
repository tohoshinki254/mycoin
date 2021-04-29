import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TopNavigator from '../../components/TopNavigator';
import MediaCard from '../../components/MediaCard';
import BottomNavigator from '../../components/BottomNavigator';
import BlueTextTypography from '../../components/BlueTextTypography';
import CreateWalletDialog from './create-wallet-dialog';
import AccessWalletDialog from './access-wallet-dialog';

const AccessPage = () => {
    const classes = useStyles();
    const [openCreate, setOpenCreate] = useState(false);
    const [openAccess, setOpenAccess] = useState(false);

    const handleCloseCreate = () => setOpenCreate(false);
    const handleCloseAccess = () => setOpenAccess(false);

    return (
        <div className={classes.root}>
            <TopNavigator isAccessed={false} />
            <Grid container style={{ marginTop: '7%' }}>
                <Grid className={classes.leftBanner} item xs={6}>
                    <BlueTextTypography variant="h1" component="h1">
                        My Ether
                    </BlueTextTypography>
                    <BlueTextTypography variant="h1" component="h1">
                        Wallet
                    </BlueTextTypography>
                </Grid>
                <Grid className={classes.rightBanner} item xs={6}>
                    <img src="/assets/images/big-spaceman.1b378c1b.png" width='70%' height='100%'/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid className={classes.createCard} item xs={6}>
                    <MediaCard 
                        title="Create A New Wallet"
                        img="/assets/images/create-wallet.73282ac1.png"
                        description="Generate your own unique wallet. Receive a private key, a public key for access and recovery."
                        theme={true}
                        onClick={() => setOpenCreate(true)}
                    />
                </Grid>
                <Grid className={classes.accessCard} item xs={6}>
                    <MediaCard 
                        title="Access My Wallet"
                        img="/assets/images/unlock-wallet.3f0ec389.png"
                        description="Generate your own unique wallet. Receive a private key, a public key for access and recovery."
                        theme={false}
                        onClick={() => setOpenAccess(true)}
                    />
                </Grid>
            </Grid>
            <BottomNavigator />
            <CreateWalletDialog open={openCreate} onCloseClick={handleCloseCreate}/>
            <AccessWalletDialog open={openAccess} onCloseClick={handleCloseAccess}/>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    leftBanner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '5%'
    },
    rightBanner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    createCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    accessCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
});

export default AccessPage;