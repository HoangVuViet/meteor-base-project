import { ListItemIcon } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CategoryIcon from '@material-ui/icons/Category';
import Dashboard from '@material-ui/icons/Dashboard';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import MapIcon from '@material-ui/icons/Map';
import TimelineIcon from '@material-ui/icons/Timeline';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducers';
import { some } from '/imports/ui/constants';
import { goToAction } from '/imports/ui/modules/common/redux/reducer';
interface Props {
  routes: some;
}
const SidebarLink: React.FC<Props> = (props: any) => {
  const { routes } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const getMenuIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapIcon />;
      case 'timeLine':
        return <TimelineIcon />;
      case 'library':
        return <LibraryBooks />;
      case 'tree':
        return <AccountTreeIcon />;
      case 'callSplit':
        return <CallSplitIcon />;
      case 'category':
        return <CategoryIcon />;
      case 'dataUsage':
        return <DataUsageIcon />;
      case 'deviceHub':
        return <DeviceHubIcon />;
    }
  };

  return (
    <List>
      {routes.map((elm: any, index: number) => {
        return !elm.hidden ? (
          <Fragment key={index}>
            <ListItem
              button
              onClick={() => dispatch(goToAction({ pathname: elm.path }))}
              style={{ marginLeft: 10 }}
            >
              <ListItemIcon style={{ marginRight: -24, marginLeft : 15 }}>{getMenuIcon(elm.iconName)}</ListItemIcon>
              <ListItemText primary={elm.name} style={{ marginLeft: 5 }} />
            </ListItem>
          </Fragment>
        ) : null;
      })}
    </List>
  );
};

export default SidebarLink;
