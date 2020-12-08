import { ButtonBase, IconButton, withStyles } from '@material-ui/core';
import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import { BLUE_100, GREY_300, WHITE } from '../../../configs/colors';
import {
  ASIDE_ITEM_HEIGHT,
  ASIDE_MIN_WIDTH,
  ASIDE_TOP_HEIGHT,
  ASIDE_WIDTH,
  HEADER_HEIGHT,
  ROLES,
} from '../../../layout/constants';
import DefaultAsideItems from '../../../layout/defaultLayout/DefaultAsideItems';
import { getListRoutesContain } from '../../../layout/utils';
import { RoutesTabType } from '../../../models/permission';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as IconMenu } from '../../../svg/ic_menu.svg';

export const ButtonRow = withStyles(() => ({
  root: {
    '&:hover': {
      background: GREY_300,
    },
    height: ASIDE_ITEM_HEIGHT,
    paddingRight: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    minWidth: ASIDE_WIDTH,
    textAlign: 'start',
  },
}))(ButtonBase);

export const IconButtonCS = withStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: BLUE_100,
    },
    width: 24,
    height: 24,
    backgroundColor: WHITE,
    zIndex: 10,
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)',
  },
}))(IconButton);

const mapStateToProps = (state: AppState) => {
  return { router: state.router, userData: state.account.userData, roleUser: state.auth.roleUser };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  open: boolean;
  onClose(): void;
  listRoute: RoutesTabType[];
}

const DefaultAside: React.FunctionComponent<Props> = props => {
  const { router, open, onClose, userData, listRoute, roleUser } = props;
  const { pathname } = router.location;
  const [openHoverButton, setOpenHoverButton] = React.useState(false);

  const getListRouterActive = React.useMemo(() => {
    return listRoute ? getListRoutesContain(listRoute, router.location.pathname) : undefined;
  }, [listRoute, router.location.pathname]);

  const checkRoleAdmin = React.useMemo(() => {
    return roleUser?.some((v: any) => v.description === ROLES.HMS_PRE_ADMIN);
  }, [roleUser]);

  if (!getListRouterActive || !listRoute) {
    return null;
  }
  return (
    <>
      <div
        style={{
          minWidth: open ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          transition: 'all 0.3s',
          zIndex: 12,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: checkRoleAdmin ? HEADER_HEIGHT + ASIDE_TOP_HEIGHT : HEADER_HEIGHT,
            zIndex: 1,
          }}
        >
          {openHoverButton && (
            <IconButtonCS
              style={{
                position: 'absolute',
                top: 20,
                right: -12,
                padding: 0,
              }}
              onClick={onClose}
              onMouseEnter={() => setOpenHoverButton(true)}
              onMouseLeave={() => setOpenHoverButton(false)}
            >
              <IconMenu />
            </IconButtonCS>
          )}
          <div
            style={{
              width: open ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
              overflow: 'hidden',
              transition: 'width 0.3s',
              position: 'absolute',
              left: 0,
              background: 'white',
              borderRight: `1px solid ${GREY_300}`,
              zIndex: 1,
              height: `calc(100vh - ${
                checkRoleAdmin ? HEADER_HEIGHT + ASIDE_TOP_HEIGHT : HEADER_HEIGHT
              }px)`,
            }}
          >
            {/* <ButtonRow
              style={{
                justifyContent: open || hoverOpen ? 'flex-end' : 'center',
                padding: open || hoverOpen ? '0px 20px' : 0,
                height: HEADER_HEIGHT,
                minWidth: open || hoverOpen ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
              }}
              onClick={onClose}
            >
              {open || hoverOpen ? (
                <BackMenuArrowIcon className="svgFillAll" stroke={BLUE} />
              ) : (
                <IconMenu className="svgFillAll" style={{ stroke: BLUE, width: 24, height: 24 }} />
              )}
            </ButtonRow> */}
            <PerfectScrollbar
              onMouseEnter={() => {
                setOpenHoverButton(true);
              }}
              onMouseLeave={() => setOpenHoverButton(false)}
            >
              <div
                style={{
                  height: `calc(100%-64px)`,
                  marginBottom: 148,
                }}
              >
                {listRoute.map((v: RoutesTabType, index: number) => (
                  <DefaultAsideItems
                    key={index}
                    userData={userData}
                    open={open}
                    data={v}
                    pathname={pathname}
                    listRouterActive={getListRouterActive}
                  />
                ))}
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(DefaultAside);
