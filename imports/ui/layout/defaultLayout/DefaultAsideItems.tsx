import { Collapse, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { GREEN_300 } from '../../configs/colors';
import { some } from '../../constants';
import { RoutesTabType } from '../../models/permission';
import { Row } from '../../modules/common/components/elements';
import { RawLink } from '../../modules/common/components/Link';
import { AppState } from '../../redux/reducers';
import { ASIDE_MIN_WIDTH } from '../constants';
import { getListRoutesActivate, hasPermission } from '../utils';
import { ButtonRow } from './DefaultAside';
import DefaultAsideItemsIcon from './DefaultAsideItemsIcon';

const mapStateToProps = (state: AppState) => {
  return {
    router: state.router,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  data: RoutesTabType;
  userData: some;
  pathname: string;
  open: boolean;
  listRouterActive: some[];
}

const DefaultAsideItems: React.FC<Props> = (props: Props) => {
  const { data, pathname, open, router, listRouterActive, userData } = props;
  const [openList, setOpen] = React.useState(false);

  const listRoutes = React.useMemo(() => {
    return data?.subMenu ? getListRoutesActivate(userData?.roleGroup?.role, data?.subMenu) : [];
  }, [data, userData]);

  const checkPermission = React.useMemo(() => {
    const listRole = userData?.roleGroup?.role;
    return data.isModule && !data.path
      ? listRoutes.length > 0
      : hasPermission(listRole, data.listRole);
  }, [data.isModule, data.listRole, data.path, listRoutes.length, userData]);

  const checkIsActive = React.useMemo(() => {
    let openTemp = false;
    listRouterActive?.forEach((item: some) => {
      if (item.name === data.name) {
        openTemp = true;
      }
    });
    return openTemp;
  }, [data.name, listRouterActive]);

  const getOpenMenu = React.useMemo(() => {
    let tempOpen = true;
    if (!open) {
      tempOpen = false;
    }
    if (openList) {
      tempOpen = false;
    }
    return tempOpen;
  }, [open, openList]);

  const getOpenItem = React.useMemo(() => {
    let tempOpen = true;
    if (!open) {
      tempOpen = false;
    }
    if (checkIsActive) {
      tempOpen = false;
    }
    return tempOpen;
  }, [checkIsActive, open]);

  React.useEffect(() => {
    setOpen(checkIsActive);
  }, [checkIsActive, pathname]);

  if (data.hidden || !checkPermission) {
    return null;
  }
  return (
    <>
      {data.subMenu ? (
        <>
          <Tooltip
            title={data.title || data.name ? <FormattedMessage id={data.title || data.name} /> : ''}
            placement="right"
          >
            <ButtonRow
              style={{
                backgroundColor: openList ? GREEN_300 : undefined,
              }}
              onClick={() => setOpen(!openList)}
            >
              <Row style={{ width: ASIDE_MIN_WIDTH, justifyContent: 'center' }}>
                <DefaultAsideItemsIcon open={getOpenMenu} name={data.name} />
              </Row>
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: 150,
                  color: 'white',
                }}
              >
                {data.title ? (
                  <FormattedMessage id={data.title} />
                ) : (
                  data.name && <FormattedMessage id={data.name} />
                )}
              </Typography>
              <img
                src="../../../../svg/ic_arrow_right.svg"
                style={{
                  transition: 'all 300ms',
                  transform: openList ? 'rotate(90deg)' : 'rotate(0deg)',
                  cursor: 'pointer',
                }}
              ></img>
            </ButtonRow>
          </Tooltip>
          <Collapse style={{ paddingLeft: 25 }} in={openList && open}>
            {listRoutes.map((v: RoutesTabType, index: number) => (
              <DefaultAsideItems
                userData={userData}
                key={index}
                open={open}
                listRouterActive={listRouterActive}
                data={v}
                pathname={pathname}
                router={router}
              />
            ))}
          </Collapse>
        </>
      ) : (
        <Tooltip
          title={data.title || data.name ? <FormattedMessage id={data.title || data.name} /> : ''}
          placement="right"
        >
          <RawLink
            to={{
              pathname: data.path,
              state: {
                ...router.location.state,
                [`${data.path}`]: true,
              },
            }}
            style={{ display: 'flex', flex: 1 }}
          >
            <ButtonRow
              style={{
                backgroundColor: checkIsActive ? GREEN_300 : undefined,
              }}
            >
              <Row style={{ width: ASIDE_MIN_WIDTH, justifyContent: 'center' }}>
                <DefaultAsideItemsIcon open={getOpenItem} name={data.name} />
              </Row>
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  fontWeight: data.isModule ? 500 : undefined,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: 150,
                  color: 'white',
                }}
              >
                {data.title ? (
                  <FormattedMessage id={data.title} />
                ) : (
                  data.name && <FormattedMessage id={data.name} />
                )}
              </Typography>
            </ButtonRow>
          </RawLink>
        </Tooltip>
      )}
    </>
  );
};

export default connect(mapStateToProps)(DefaultAsideItems);
