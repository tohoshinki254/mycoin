import { Typography, withStyles } from '@material-ui/core';

const BoldTextTypography = withStyles((theme) => ({
    root: {
        color: '#6c757e',
        fontWeight: 'bold'
    }
}))(Typography);

export default BoldTextTypography;