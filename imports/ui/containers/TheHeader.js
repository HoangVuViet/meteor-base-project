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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
        {logined && (
          <div style={{ marginLeft: -18, paddingTop: 17 }}>
            <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
          </div>
        )}
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/">APOM</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
        <div style={{ marginRight: -8 }}>
          <CHeaderNav className="px-3">
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
                <ExitToAppIcon style={{ margiLeft: 4 }}></ExitToAppIcon>
              </CHeaderNavLink>
            ) : (
              <TheHeaderDropdown />
            )}
          </CHeaderNav>
        </div>
      </CHeader>
    </div>
  );
};

export default TheHeader;
