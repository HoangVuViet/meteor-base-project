import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { TabContext } from '@material-ui/lab';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { HelloWorld } from '../../HelloWorld';
import ConcentrationChart from './ConcentrationChart';
import DashBoardChart from './DashBoardChart';

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
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="PM2.5"></AntTab>
          <AntTab label="PM10" />
          <AntTab label="Nhiệt độ" />
          <AntTab label="Độ ẩm" />
          <AntTab label="CO" />
        </AntTabs>
        <Typography className={classes.padding} />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChange}
          style={{ marginTop: 20 }}
        >
          <TabContext value={value.toString()} index={0} style={{ width: '100%' }}>
            <ConcentrationChart chartName={'chartDiv1'}></ConcentrationChart>
          </TabContext>
          <TabContext value={value.toString()} index={1} style={{ width: '100%' }}>
            <ConcentrationChart chartName={'chartDiv2'}></ConcentrationChart>
          </TabContext>
          <TabContext value={value.toString()} index={2} style={{ width: '100%' }}>
            <ConcentrationChart chartName={'chartDiv3'}></ConcentrationChart>
          </TabContext>
          <TabContext value={value.toString()} index={3} style={{ width: '100%' }}>
            <ConcentrationChart chartName={'chartDiv4'}></ConcentrationChart>
          </TabContext>
          <TabContext value={value.toString()} index={4} style={{ width: '100%' }}>
            <HelloWorld></HelloWorld>
          </TabContext>
        </SwipeableViews>
      </div>
    </div>
  );
}
