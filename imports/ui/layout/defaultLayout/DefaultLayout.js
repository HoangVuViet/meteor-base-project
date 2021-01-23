// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../configs/routes';
import Sidebar from './components/Sidebar/Sidebar.tsx';


export default function Admin({ ...rest }) {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState('blue');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
