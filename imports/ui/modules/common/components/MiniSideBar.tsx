/* eslint-disable no-nested-ternary */
import { Button, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, connect } from 'react-redux';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/API';
import { BLUE_100, GREY_400, GREY_600, GREY_900, PRIMARY, WHITE } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../constants';
import { RoutesTabType } from '../../../models/permission';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as MiniSuccess } from '../../../svg/ic_miniSuccess.svg';
import { ReactComponent as MiniWarning } from '../../../svg/ic_miniWarning.svg';
import { goToAction } from '../redux/reducer';
import { fetchThunk } from '../redux/thunk';
import ConfirmDialog from './ConfirmDialog';
import CustomProgressBar from './CustomProgressBar';
import { Col, Row, snackbarSetting } from './elements';
import Link from './Link';
import LoadingButton from './LoadingButton';
import LoadingIcon from './LoadingIcon';
import { ASIDE_TOP_HEIGHT, HEADER_HEIGHT, ROLES } from '../../../layout/constants';

export interface DataRoutesProgress extends RoutesTabType {
  isDone?: boolean;
}
const mapStateToProps = (state: AppState) => {
  return {
    roleUser: state.auth.roleUser,
  };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  data: DataRoutesProgress[];
  progressPercent?: number;
}

const MiniSideBar: React.FC<Props> = props => {
  const { data, progressPercent, roleUser } = props;
  const location = useLocation();
  const match: any = useRouteMatch();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const checkRoleAdmin = React.useMemo(() => {
    return roleUser?.some((v: any) => v.description === ROLES.HMS_PRE_ADMIN);
  }, [roleUser]);

  const sendApprovalHotel = React.useCallback(
    async (hotelId: string) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.requestApprovalHotel(hotelId), 'post'));
      if (json?.code === SUCCESS_CODE) {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), {}),
          );
        dispatch(
          goToAction({
            pathname: checkRoleAdmin ? ROUTES.managerHotels.results.pending : ROUTES.homeDashboard,
          }),
        );
      } else
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      setLoading(false);
    },
    [checkRoleAdmin, closeSnackbar, dispatch, enqueueSnackbar],
  );
  return (
    <Row style={{ alignItems: 'flex-start', flex: 1 }}>
      <Col
        style={{
          width: '17vw',
          minWidth: 200,
          position: 'sticky',
          top: checkRoleAdmin ? HEADER_HEIGHT + ASIDE_TOP_HEIGHT + 16 : HEADER_HEIGHT + 16,
        }}
      >
        {data.map((v: some, index: number) => (
          <Link replace to={{ pathname: v.directPath || v.path }} key={index}>
            <Button
              style={{
                padding: '12px 16px',
                marginBottom: 8,
                background: location.pathname === (v.directPath || v.path) ? PRIMARY : BLUE_100,
                justifyContent: 'unset',
                height: 48,
              }}
              fullWidth
              disableTouchRipple
            >
              <Row style={{ justifyContent: 'space-between', flex: 1 }}>
                <Typography
                  variant="body2"
                  style={{
                    color: location.pathname === (v.directPath || v.path) ? WHITE : GREY_900,
                  }}
                >
                  <FormattedMessage id={v.name} />
                </Typography>
                {v.isDone !== undefined ? v.isDone ? <MiniSuccess /> : <MiniWarning /> : <></>}
              </Row>
            </Button>
          </Link>
        ))}
        <Paper
          style={{
            borderRadius: 4,
            padding: '20px 16px 24px 16px',
            alignItems: 'center',
            border: `0.5px solid ${GREY_400}`,
          }}
          elevation={0}
        >
          {progressPercent === 100 ? (
            <Col>
              <Typography variant="body2" style={{ marginBottom: 16, textAlign: 'center' }}>
                <FormattedMessage id="IDS_HMS_HOTEL_ADD_CONTACT_NOTE" />
              </Typography>
              <LoadingButton
                color="secondary"
                variant="contained"
                disableElevation
                onClick={() => setOpenDialog(true)}
                style={{ width: '100%', height: 40 }}
                loading={loading}
              >
                <FormattedMessage id="sendSubmit" />
              </LoadingButton>
            </Col>
          ) : (
            <Col>
              <Typography variant="body2" style={{ marginBottom: 16, textAlign: 'center' }}>
                <FormattedMessage id="IDS_HMS_HOTEL_TOTAL_PROGRESS" />
              </Typography>
              <CustomProgressBar percent={progressPercent || 0} />
            </Col>
          )}
        </Paper>
      </Col>
      <Col
        style={{
          padding: '0px 24px',
          flex: 1,
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {data
              .filter(v => v.component)
              .map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
              ))}
          </Switch>
        </React.Suspense>
      </Col>
      <ConfirmDialog
        titleLabel={
          <Typography variant="subtitle1">
            <FormattedMessage id="IDS_HMS_HOTEL_REQUEST_APPROVAL_HOTEL" />
          </Typography>
        }
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onReject={() => setOpenDialog(false)}
        onAccept={() => {
          setOpenDialog(false);
          sendApprovalHotel(match?.params?.hotelId);
        }}
        acceptLabel="sendSubmit"
      >
        <Typography
          variant="body2"
          style={{ color: GREY_600, maxWidth: 420, margin: '10px 0px 24px 0px' }}
        >
          <FormattedMessage id="IDS_HMS_HOTEL_REQUEST_APPROVAL_NOTE" />
        </Typography>
      </ConfirmDialog>
    </Row>
  );
};

export default connect(mapStateToProps)(MiniSideBar);
