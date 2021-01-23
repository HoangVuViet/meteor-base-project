// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../configs/routes';
import styles from './components/jss/material-dashboard-react/layouts/adminStyle.js';
import Sidebar from './components/Sidebar/Sidebar.js';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState('blue');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf('Win') > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //     });
  //     document.body.style.overflow = 'hidden';
  //   }
  //   window.addEventListener('resize', resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf('Win') > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener('resize', resizeFunction);
  //   };
  // }, [mainPanel]);
  return (
    <div >
      <Sidebar
        routes={routes}
        logoText={'APOM'}
        logo="../../../../../../img/reactlogo.png"
        image="../../../../../../img/sidebar-2.jpg"
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />

    </div>
  );
}
