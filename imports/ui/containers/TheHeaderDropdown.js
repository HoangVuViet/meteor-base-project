import CIcon from '@coreui/icons-react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNavLink,
  CImg,
} from '@coreui/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col } from '../modules/common/components/elements';
import { setLogin } from '../redux/initReducer';
import { USER_LOGIN } from '/imports/ui/constants';
import { useHistory } from 'react-router';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const { sidebarShow, logined } = useSelector((state) => state.accommodation, shallowEqual);
  const profile = JSON.parse(localStorage.getItem(USER_LOGIN)) || {};
  console.log(logined);

  const history = useHistory();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'../avatars/avatar_not_found.jpg'}
            className="c-avatar-img"
            alt="admin@fimo.edu.vn"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <Col>
            <p>Signed in as</p>
            <strong>{profile?.email}</strong>
          </Col>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-account-logout" className="mfe-2" />
          <Typography
            variant="body2"
            onClick={() => {
              dispatch(setLogin(false));
              refreshPage();
            }}
          >
            Sign out
          </Typography>
        </CDropdownItem>
        {/* <CHeaderNavLink to="/login"> */}

        {/* </CHeaderNavLink> */}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
