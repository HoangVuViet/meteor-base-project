import { Switch, withStyles } from '@material-ui/core';
import { GREEN, GREEN_300 } from '../../../configs/colors';

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: GREEN,
    },
    '&$checked + $track': {
      backgroundColor: GREEN_300,
    },
  },
  checked: {},
  track: {},
})(Switch);

export default CustomSwitch;
