import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { TabContext } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Concentration from './Concentration';
import Dashboard from './Dashboard';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: 12,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Tổng quan" {...a11yProps(0)} />
          <Tab label="So sánh" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex} style={{ marginTop: 0 }}>
        <TabContext value={value.toString()}>
          <Dashboard />
        </TabContext>
        <TabContext value={value.toString()}>
          <Concentration />
        </TabContext>
      </SwipeableViews>
    </div>
  );
}
