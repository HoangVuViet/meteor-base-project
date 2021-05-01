import { IconButton, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ExploreIcon from '@material-ui/icons/Explore';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { goToAction } from '../../common/redux/reducer';
import { MAP_DISPLAY_ROUTES } from '/imports/ui/configs/routes';
import { getMenuIcon } from '/imports/ui/layout/defaultLayout/components/Sidebar/SidebarLink';
import { AppState } from '/imports/ui/redux/reducers';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ color: 'white', padding: 4 }}
      >
        <ExploreIcon />{' '}
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {MAP_DISPLAY_ROUTES?.map((elm: any, index: number) => {
          return !elm.hidden ? (
            <Fragment key={index}>
              <ListItem
                button
                onClick={() => dispatch(goToAction({ pathname: elm.path }))}
                style={{ marginLeft: 10 }}
              >
                <ListItemText style={{ marginLeft: 5 }}>
                  <Typography variant="caption" style={{ whiteSpace: 'nowrap' }}>
                    {elm?.name}
                  </Typography>
                </ListItemText>
                <ListItemIcon style={{ marginLeft: 15 }}>{getMenuIcon(elm.iconName)}</ListItemIcon>
              </ListItem>
            </Fragment>
          ) : null;
        })}
      </StyledMenu>
    </div>
  );
}
