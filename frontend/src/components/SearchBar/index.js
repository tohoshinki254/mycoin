import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const SearchBar = ({ search }) => {
    const classes = useStyles();
    const [address, setAddress] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const handleChangeAddress = (event) => {
        let value = event.target.value;
        if (value.length === 130) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
        setAddress(value);
    }

    return (
        <Paper component="form" className={classes.root}>
            <IconButton type="submit" className={classes.iconButton} aria-label="key" disabled={true}>
                <VpnKeyIcon />
            </IconButton>
            <InputBase 
                className={classes.input}
                placeholder="Search by Address"
                inputProps={{ 'aria-label': 'search by address' }}
                value={address}
                onChange={(event) => handleChangeAddress(event)}
            />
            <IconButton 
                type="submit" 
                className={classes.iconButton} 
                aria-label="search"
                disabled={disableButton}
                onClick={() => search(address)}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderStyle: 'solid',
        borderColor: '#05c0a5',
        borderWidth: 'medium'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10,
    }
}));

export default SearchBar;