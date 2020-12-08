import { ButtonBase, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { BLUE_50, PRIMARY, WHITE } from '../../../configs/colors';
import { some } from '../../../constants';
import { Col, Row } from './elements';
import Link from './Link';
import LoadingIcon from './LoadingIcon';
import { RoutesTabType } from '../../../models/permission';

const Pointer = styled.div<{ isActive?: boolean }>`
  width: 324px;
  height: 64px;
  position: relative;
  background: ${props => (props.isActive ? PRIMARY : BLUE_50)};
  border-radius: 6px 0px 0px 6px;
  display: flex;
  align-items: center;
  padding-left: 28px;
  :before {
    content: '';
    position: absolute;
    right: -32px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 32px solid ${props => (props.isActive ? PRIMARY : BLUE_50)};
    border-top: 32px solid transparent;
    border-bottom: 32px solid transparent;
  }
`;

interface Props {
  data: RoutesTabType[];
}
const MiniLayout: React.FC<Props> = props => {
  const { data } = props;
  const location = useLocation();

  const checkIsActive = React.useMemo(() => {
    let numActive = 1;
    data.forEach((v: some, index: number) => {
      if (location.pathname === v.path) {
        numActive = index;
      }
    });
    return numActive;
  }, [data, location.pathname]);
  return (
    <Row style={{ alignItems: 'flex-start', flex: 1 }}>
      <Col style={{ marginRight: 60 }}>
        {data.map((v: some, index: number) => (
          <Link to={{ pathname: v.path }}>
            <ButtonBase style={{ padding: 0, marginTop: 16 }} disableTouchRipple>
              <Pointer isActive={checkIsActive === index}>
                <Typography
                  variant="body2"
                  style={{ color: checkIsActive === index ? WHITE : PRIMARY }}
                >
                  <FormattedMessage id={v.name} />
                </Typography>
              </Pointer>
            </ButtonBase>
          </Link>
        ))}
      </Col>
      <Col
        style={{
          padding: '16px 24px',
          flex: 1,
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {data.map(
              (route, index) =>
                route.component && (
                  <Route key={index} path={route.path} component={route.component} />
                ),
            )}
          </Switch>
        </React.Suspense>
      </Col>
    </Row>
  );
};

export default MiniLayout;
