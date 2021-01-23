import { Collapse, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { Fragment } from 'react';
import SidebarLink from './SidebarLink';
import { some } from '/imports/ui/constants';
interface Props {
  routes: some;
  icon?: React.ReactNode;
  title?: string;
}
const SidebarList: React.FC<Props> = (props: any) => {
  const { routes, icon, title } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <Fragment>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon style={{ marginRight: -24 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <SidebarLink routes={routes}></SidebarLink>
      </Collapse>
    </Fragment>
  );
};

export default SidebarList;
