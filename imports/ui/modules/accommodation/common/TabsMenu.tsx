import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch, useLocation } from 'react-router';
import { some } from '../../../constants';
import { RoutesTabType } from '../../../models/permission';
import { Row } from '../../common/components/elements';
import Link from '../../common/components/Link';
import './CommonStyles.scss';

interface Props {
  data: RoutesTabType[];
}
const TabsMenu: React.FC<Props> = props => {
  const intl = useIntl();
  const location = useLocation();
  const { data } = props;

  return (
    <>
      <Row>
        {data.map((v: some, index: number) => {
          const isActive = location.pathname === (v.directPath || v.path);
          return (
            <Link
              replace
              to={{ pathname: v.directPath || v.path }}
              key={index}
              className={`menu-tab-item ${isActive && 'active-item'}`}
            >
              <Typography gutterBottom variant="body2" component="span">
                {intl.formatMessage({ id: v.name })}
              </Typography>
            </Link>
          );
        })}
      </Row>
      <Paper style={{ margin: '0 -16px', borderRadius: 0, boxShadow: 'none' }}>
        <Switch>
          {data
            .filter(v => v.component)
            .map((route, index) => (
              <Route key={index} path={route.path} component={route.component} />
            ))}
        </Switch>
      </Paper>
    </>
  );
};

export default TabsMenu;
