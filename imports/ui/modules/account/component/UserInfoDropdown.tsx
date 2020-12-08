import { Button, ButtonBase, Collapse, Divider, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_300, GREY_400, GREY_600 } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { HEADER_HEIGHT } from '../../../layout/constants';
import Link from '../../../modules/common/components/Link';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as IconAvatar } from '../../../svg/ic_avatar.svg';
import { logout } from '../../auth/redux/authThunks';
import { Col } from '../../common/components/elements';
import ChangePasswordDialog from '../../auth/changePassword/pages/ChangePasswordDialog';

export const ButtonCS = withStyles(theme => ({
  root: {
    width: '100%',
    justifyContent: 'flex-start',
    padding: '14px 16px',
    '&:hover': {
      background: GREY_300,
    },
  },
}))(ButtonBase);

const mapStateToProps = (state: AppState) => ({
  userData: state.account.userData,
});

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const UserInfoDropdown: React.FunctionComponent<Props> = props => {
  const { dispatch, userData } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const onBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget instanceof Element) {
      if (e.currentTarget.contains(e.relatedTarget as Element)) {
        return;
      }
    }

    setOpen(false);
  }, []);

  return (
    <>
      {userData && (
        <div
          tabIndex={-1}
          onBlur={onBlur}
          style={{
            outline: 'none',
          }}
        >
          <Button
            style={{
              color: 'inherit',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Col style={{ marginRight: '12px', textAlign: 'end' }}>
              <Typography variant="body2" color="inherit">
                <FormattedMessage id="IDS_HMS_WELCOME" />,
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {userData?.name || 'Guest'}
              </Typography>
            </Col>
            {userData.photo ? (
              <img
                style={{
                  borderRadius: '50%',
                  height: '40px',
                  width: '40px',
                  objectFit: 'cover',
                }}
                src={userData.photo}
                alt=""
              />
            ) : (
              <IconAvatar
                style={{
                  borderRadius: '50%',
                  height: '40px',
                  width: '40px',
                  objectFit: 'cover',
                }}
              />
            )}
            {/* <ArrowDropDownIcon
              style={{
                transition: 'all 300ms',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                cursor: 'pointer',
                color: GREY_500,
              }}
            /> */}
          </Button>
          <Collapse
            in={open}
            style={{
              position: 'absolute',
              width: '290px',
              color: 'black',
              zIndex: 110,
              top: HEADER_HEIGHT,
              right: '0px',
            }}
          >
            <Paper
              style={{
                overflow: 'hidden',
                width: '280px',
                padding: '8px 0px',
                borderRadius: '0px 0px 8px 8px',
                boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              variant="outlined"
            >
              <Col>
                <Link to={{ pathname: ROUTES.accountInfo.generalInfo }}>
                  <ButtonCS>
                    <Typography variant="body2">
                      <FormattedMessage id="accManagement.generalInfo" />
                    </Typography>
                  </ButtonCS>
                </Link>
                {/* <ButtonCS>
                  <Typography variant="body2">
                    <FormattedMessage id="accManagement.createAndManageMember" />
                  </Typography>
                </ButtonCS> */}
                <ButtonCS onClick={() => setOpenDialog(true)}>
                  <Typography variant="body2">
                    <FormattedMessage id="changePassword" />
                  </Typography>
                </ButtonCS>
                <Divider />
                <Button
                  style={{
                    border: `1px solid ${GREY_400}`,
                    width: 150,
                    height: 30,
                    alignSelf: 'center',
                    margin: '16px 0px',
                    color: GREY_600,
                  }}
                  onClick={() => dispatch(logout())}
                >
                  <Typography variant="body2">
                    <FormattedMessage id="logout" />
                  </Typography>
                </Button>
              </Col>
            </Paper>
          </Collapse>
        </div>
      )}
      <ChangePasswordDialog open={openDialog} setOpen={() => setOpenDialog(false)} />
    </>
  );
};

export default connect(mapStateToProps)(UserInfoDropdown);
