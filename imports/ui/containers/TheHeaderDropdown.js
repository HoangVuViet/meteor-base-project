import React from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNavLink,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Col } from '../modules/common/components/elements';
import { Typography } from '@material-ui/core';
import { LOGIN } from '/imports/ui/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/initReducer';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const { sidebarShow, logined } = useSelector((state) => state.accommodation, shallowEqual);

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={'../avatars/dog.jpg'} className="c-avatar-img" alt="admin@fimo.edu.vn" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <Col>
            <p>Signed in as</p>
            <strong>HoangVu</strong>
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
        <CHeaderNavLink to="/login">
          <CIcon name="cil-account-logout" className="mfe-2" />
          <Typography
            variant="body2"
            onClick={() => {
              dispatch(setLogin(val));
            }}
          >
            Sign out
          </Typography>
        </CHeaderNavLink>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
