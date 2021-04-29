import { TextField, withStyles } from '@material-ui/core';

const BlueTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#003945',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#003945',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#003945',
        },
        '&:hover fieldset': {
          borderColor: '#003945',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#003945',
        },
      },
    },
})(TextField);

export default BlueTextField;