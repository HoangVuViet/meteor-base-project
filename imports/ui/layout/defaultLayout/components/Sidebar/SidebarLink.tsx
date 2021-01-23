import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
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
    }
  };

  return (
    <List>
      {routes.map((elm: any, index: number) => {
        return !elm.hidden ? (
          <Fragment key={index}>
            <ListItem
              button
              onClick={() => dispatch(goToAction({ pathname: '/admin' + elm.path }))}
            >
              {getMenuIcon(elm.iconName)}
              <ListItemText primary={elm.name} style={{ marginLeft: 5 }} />
            </ListItem>
          </Fragment>
        ) : null;
      })}
    </List>
  );
};

export default SidebarLink;
