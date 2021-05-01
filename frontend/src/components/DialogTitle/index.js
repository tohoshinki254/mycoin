import React from 'react';
import { makeStyles, withStyles, IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import WhiteTextTypography from '../WhiteTextTypography';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: '#434f61'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <WhiteTextTypography variant="h6">{children}</WhiteTextTypography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

export default DialogTitle;