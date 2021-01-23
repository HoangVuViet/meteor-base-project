// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import routes from '../../configs/routes';
import { ASIDE_WIDTH } from '../constants';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import DefaultFooter from './DefaultFooter';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -ASIDE_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Admin({ ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div >
      <Sidebar
        routes={routes}
        logoText={'APOM'}
        logo="../../../../../../img/reactlogo.png"
        image="../../../../../../img/sidebar-2.jpg"
        {...rest}
        open={open}
        setOpen={setOpen}
      />
      <div className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >
        <DefaultFooter />
      </div>
    </div>
  );
}
