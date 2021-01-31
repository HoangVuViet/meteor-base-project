import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { goToAction } from '../../common/redux/reducer';
import { MAP_DISPLAY_ROUTES } from '/imports/ui/configs/routes';
import { getMenuIcon } from '/imports/ui/layout/defaultLayout/components/Sidebar/SidebarLink';
import { AppState } from '/imports/ui/redux/reducers';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" style={{ whiteSpace: 'nowrap' }}>
            <FormattedMessage id="map" />
          </Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {MAP_DISPLAY_ROUTES?.map((elm: any, index: number) => {
          return !elm.hidden ? (
            <Fragment key={index}>
              <ListItem
                button
                onClick={() => dispatch(goToAction({ pathname: elm.path }))}
                style={{ marginLeft: 10 }}
              >
                <ListItemIcon style={{ marginRight: -24, marginLeft: 15 }} >
                  {getMenuIcon(elm.iconName)}
                </ListItemIcon>
                <ListItemText style={{ marginLeft: 5 }} >
                  <Typography variant="body2" style={{ whiteSpace: 'nowrap' }}>
                    <FormattedMessage id={elm?.name} />
                  </Typography>
                </ListItemText>
              </ListItem>
            </Fragment>
          ) : null;
        })}
      </Collapse>
    </List>
  );
}
