import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { Link } from 'react-router-dom';
import { Row, snackbarSetting } from '/imports/ui/modules/common/components/elements';
import { isEmpty, USER_RESGIS } from '/imports/ui/constants';
import { useSnackbar } from 'notistack';
import { useIntl } from 'react-intl';

const Register = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const intl = useIntl();

  const [userRegister, setUserRegister] = React.useState({
    userName: '',
    email: '',
    password: '',
    repeatPass: '',
  });
  console.log('userRegister', userRegister);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Tạo tài khoản mới</h1>
                  {/* <p className="text-muted">Create your account</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Tên đăng nhập"
                      autoComplete="username"
                      onChange={(e) => {
                        setUserRegister({ ...userRegister, userName: e.target.value });
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => {
                        setUserRegister({ ...userRegister, email: e.target.value });
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Mật khẩu"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setUserRegister({ ...userRegister, password: e.target.value });
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
                      placeholder="Xác nhận mật khẩu"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setUserRegister({ ...userRegister, repeatPass: e.target.value });
                      }}
                    />
                  </CInputGroup>
                  <CHeaderNavLink to="/login">
                    <CButton
                      color="success"
                      block
                      disabled={
                        isEmpty(userRegister.userName.trim()) ||
                        isEmpty(userRegister.email.trim()) ||
                        isEmpty(userRegister.password.trim()) ||
                        isEmpty(userRegister.repeatPass)
                      }
                      onClick={() => {
                        localStorage.setItem(USER_RESGIS, JSON.stringify(userRegister));
                        enqueueSnackbar(
                          intl.formatMessage({ id: 'Đăng ký thành công!' }),
                          snackbarSetting((key) => closeSnackbar(key), {
                            color: 'success',
                          }),
                        );
                      }}
                    >
                      Đăng ký
                    </CButton>
                  </CHeaderNavLink>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <Row>
                  <p style={{ marginRight: 4 }}>Bạn đã có tài khoản?</p>
                  <Link to="/login">
                    <p>Đăng nhập ngay</p>
                  </Link>
                </Row>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
