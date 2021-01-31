import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ASIDE_WIDTH } from '../../../constants';
import styles from '../jss/material-dashboard-react/components/headerStyle.js';
import SidebarList from './SideBarList';
import { LIST_ITEMS } from './utils';
import { APP_ROUTES, ROUTES } from '/imports/ui/configs/routes';
import { some } from '/imports/ui/constants';
import { goToAction } from '/imports/ui/modules/common/redux/reducer';
import { AppState } from '/imports/ui/redux/reducers';

const useStyles = makeStyles((theme) => ({
  ...styles,
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${ASIDE_WIDTH}px)`,
    marginLeft: ASIDE_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: ASIDE_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: ASIDE_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -ASIDE_WIDTH,
    marginTop: 40,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props: any) {
  const { open, setOpen } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const classes = useStyles();
  const theme = useTheme();

  const makeBrand = () => {
    let name;
    APP_ROUTES.map((elm: some) => {
      if (window.location.href.indexOf(elm.path) !== -1) {
        name = elm.name;
      }
      return null;
    });
    return name;
  };

  const switchRoutes = (
    <Switch>
      {APP_ROUTES?.map((elm: some, index: number) => {
        return <Route path={elm?.path} component={elm?.component} key={index} />;
      })}
      <Redirect from="/" to="/pm25Map" />
    </Switch>
  );

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="fixed"
        // style={{ background: 'transparent', boxShadow: 'none'}}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={() => dispatch(goToAction({ pathname: ROUTES.pm25 }))}
          >
            APOM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <PerfectScrollbar>
          <div>
            {LIST_ITEMS.map((el: some, idx: number) => {
              return (
                <SidebarList key={idx} routes={el?.routes} icon={el?.icon} title={el?.title} />
              );
            })}
          </div>
        </PerfectScrollbar>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Button href="#" style={{ marginBottom: 12 }}>
          {makeBrand()}
        </Button>
        <div>
          <div>{switchRoutes}</div>
        </div>
      </main>
    </div>
  );
}
