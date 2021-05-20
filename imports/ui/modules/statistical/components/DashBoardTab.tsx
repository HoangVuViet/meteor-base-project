import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { TabContext } from '@material-ui/lab';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import HumDChart from './HumDChart';
import PressSChart from './PressSChart';
import TempChart from './TempChart';
import WindSpeedChart from './WindSpeedChart';
import { some } from '/imports/ui/constants';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(1),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));
interface Props {
  data: some[];
}
const DashBoardTab: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const { data } = props;

  const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label={'Gió'} />
          <AntTab label="Nhiệt độ" />
          <AntTab label="Độ ẩm tương đối" />
          <AntTab label="Áp suất khí quyển(2m)" />
        </AntTabs>
        <Typography className={classes.padding} />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChange}
          style={{ marginTop: 0 }}
        >
          <TabContext value={value.toString()} index={0} style={{ width: '100%' }}>
            <WindSpeedChart chartName={'chartDiv1'} data={data} />
          </TabContext>
          <TabContext value={value.toString()} index={1} style={{ width: '100%' }}>
            <TempChart chartName={'chartDiv2'} data={data} />
          </TabContext>
          <TabContext value={value.toString()} index={2} style={{ width: '100%' }}>
            <HumDChart chartName={'chartDiv3'} data={data} />
          </TabContext>
          <TabContext value={value.toString()} index={3} style={{ width: '100%' }}>
            <PressSChart chartName={'chartDiv4'} data={data} />
          </TabContext>
        </SwipeableViews>
      </div>
    </div>
  );
};
export default DashBoardTab;
