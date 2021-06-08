import CIcon from '@coreui/icons-react';
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CToggler,
} from '@coreui/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../constants';
import { setClose, setLogin } from '../redux/initReducer';
import { TheHeaderDropdown, TheHeaderDropdownNotif } from './index';

const TheHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow, logined } = useSelector((state) => state.accommodation, shallowEqual);
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch(setClose(val));
  };
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch(setClose(val));
  };
  return (
    <div style={{ width: '100%' }}>
      <CHeader withSubheader>
        <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
        <div style={{ marginLeft: -18, paddingTop: 17 }}>
          <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
        </div>
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/">APOM</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
        <div style={{ marginRight: -8 }}>
          <CHeaderNav className="px-3">
            {/* <TheHeaderDropdownNotif /> */}
            {!logined ? (
              <CHeaderNavLink to="/login">
                <Typography
                  variant="body2"
                  onClick={() => {
                    dispatch(setLogin(false));
                  }}
                >
                  Đăng nhập
                </Typography>
              </CHeaderNavLink>
            ) : (
              <TheHeaderDropdown />
            )}
          </CHeaderNav>
        </div>

        {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink className="c-subheader-nav-link" aria-current="page" to="/dashboard">
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader> */}
      </CHeader>
    </div>
  );
};

export default TheHeader;
