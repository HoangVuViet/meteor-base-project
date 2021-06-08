import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CHeaderNavLink,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSnackbar } from 'notistack';
import { snackbarSetting } from '/imports/ui/modules/common/components/elements';
import { useIntl } from 'react-intl';
import { LOGIN, USER_RESGIS, USER_LOGIN } from '/imports/ui/constants';
import { useDispatch } from 'react-redux';
import { setLogin } from '/imports/ui/redux/initReducer';

const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();

  const dispatch = useDispatch();

  const [userLoginProfile, setUserLoginProfile] = React.useState({
    ...(JSON.parse(localStorage.getItem(USER_RESGIS)) || {
      userName: '',
      email: '',
      password: '',
      repeatPass: '',
    }),
  });
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập hệ thống</h1>
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email/Username"
                        autoComplete="username"
                        required
                        onChange={(e) => {
                          setUserLoginProfile({ ...userLoginProfile, email: e.target.value });
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        required
                        onChange={(e) => {
                          setUserLoginProfile({ ...userLoginProfile, password: e.target.value });
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CHeaderNavLink to="/">
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={() => {
                              dispatch(setLogin(true));
                              localStorage.setItem(USER_LOGIN, JSON.stringify(userLoginProfile));
                              enqueueSnackbar(
                                intl.formatMessage({ id: 'success' }),
                                snackbarSetting((key) => closeSnackbar(key), {
                                  color: 'success',
                                }),
                              );
                            }}
                          >
                            Đăng nhập
                          </CButton>
                        </CHeaderNavLink>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CHeaderNavLink to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Quên mật khẩu?
                          </CButton>
                        </CHeaderNavLink>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <p>Bạn chưa có tài khoản?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Đăng ký tài khoản tại đây
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
