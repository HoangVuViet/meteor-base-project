import { Checkbox, withStyles } from '@material-ui/core';
import { GREY_600, SECONDARY, WHITE } from '../../../configs/colors';

export const WhiteBackgroundCheckbox = withStyles(theme => ({
  root: {
    color: SECONDARY,
    '&$checked': {
      color: SECONDARY,
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 18,
        width: 18,
        position: 'absolute',
        backgroundColor: WHITE,
        zIndex: -1,
      },
    },
    '&:not($checked)': {
      color: GREY_600,
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 18,
        width: 18,
        position: 'absolute',
        backgroundColor: WHITE,
        zIndex: -1,
      },
    },
  },
  checked: {},
}))(Checkbox);
