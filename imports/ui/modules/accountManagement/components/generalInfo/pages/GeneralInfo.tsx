import { Button, ButtonBase, fade, Typography } from '@material-ui/core';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { API_PATHS } from '../../../../../configs/API';
import { GREY_100, GREY_400, GREY_600 } from '../../../../../configs/colors';
import { SUCCESS_CODE } from '../../../../../constants';
import { DATE_TIME_FORMAT } from '../../../../../models/moment';
import { IMAGE_ALLOW_TYPE, MAX_SIZE_IMAGE } from '../../../../../models/uploadFile';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as CameraIcon } from '../../../../../svg/camera_solid.svg';
import { ReactComponent as DeleteIcon } from '../../../../../svg/ic_delete.svg';
import ChangePasswordDialog from '../../../../auth/changePassword/pages/ChangePasswordDialog';
import { Col, Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { uploadImage } from '../../../../common/redux/reducer';
import { fetchThunk } from '../../../../common/redux/thunk';
import UserForm from '../components/UserForm';
import { DEFAULT_LINK_PHOTO } from '../../../constant';
import { defaultUserManagementInfo, UserManagementInfo } from '../../../ultis';

const BorderCustom = styled.div`
  border-right: 0.5px solid ${GREY_400};
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  align-items: flex-start;
  flex: 1;
  min-height: 40px;
`;

interface Props {}

function GeneralInfo(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const userData = useSelector((state: AppState) => state.account.userData);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userManagementInfo, setUserManagementInfo] = React.useState<UserManagementInfo>(
    defaultUserManagementInfo,
  );
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const accountDetail = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.accountDetail}?id=${userData?.id}`, 'get'));

    if (json?.code === SUCCESS_CODE) {
      setUserManagementInfo(json.data);
    } else {
      enqueueSnackbar(
        json.message,
        snackbarSetting(key => closeSnackbar(key), {
          color: 'error',
        }),
      );
    }
    setLoading(false);
  }, [closeSnackbar, dispatch, enqueueSnackbar, userData]);

  const updateAccountDetail = React.useCallback(
    async (values: UserManagementInfo) => {
      setLoading(true);

      const json = await dispatch(
        fetchThunk(`${API_PATHS.accountDetail}`, 'put', JSON.stringify(values)),
      );
      if (json.code === SUCCESS_CODE) {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'success',
          }),
        );
        accountDetail();
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [accountDetail, closeSnackbar, dispatch, enqueueSnackbar],
  );

  const uploadPhoto = useCallback(
    async (files: File[]) => {
      setLoading(true);

      const json = await dispatch(uploadImage(files));
      if (json?.code === SUCCESS_CODE) {
        setUserManagementInfo({ ...userManagementInfo, profilePhoto: json.photo?.thumbLink });
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
          );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, userManagementInfo],
  );

  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        enqueueSnackbar(
          <FormattedMessage id="maxSizeNotify" />,
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
        return;
      }
      uploadPhoto && uploadPhoto(acceptedFiles);
    },
    accept: IMAGE_ALLOW_TYPE,
    maxSize: MAX_SIZE_IMAGE,
  });

  const setDefaultPhoto = useCallback(async () => {
    setUserManagementInfo({ ...userManagementInfo, profilePhoto: DEFAULT_LINK_PHOTO });
  }, [userManagementInfo]);

  React.useEffect(() => {
    accountDetail();
  }, [accountDetail]);

  return (
    <div>
      <Typography variant="h5">
        <FormattedMessage id="accManagement.generalInfo" />
      </Typography>
      <Row style={{ paddingBottom: 68, paddingTop: 16 }}>
        <div>
          <img
            src={userManagementInfo?.profilePhoto}
            alt={userManagementInfo?.name}
            style={{
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px',
              width: 128,
              height: 128,
              objectFit: 'cover',
            }}
          />
        </div>
        <Col style={{ minWidth: 600, marginLeft: 24 }}>
          <Row
            style={{
              borderBottom: `0.5px solid ${GREY_400}`,
            }}
          >
            <BorderCustom>
              <Typography variant="body2" style={{ color: GREY_400 }}>
                <FormattedMessage id="id" />
              </Typography>
              {userManagementInfo?.id}
            </BorderCustom>
            <BorderCustom style={{ paddingLeft: 24 }}>
              <Typography variant="body2" style={{ color: GREY_400 }}>
                <FormattedMessage id="inviter" />
              </Typography>
              {userManagementInfo?.recommender?.name}
            </BorderCustom>
            <BorderCustom style={{ paddingLeft: 24 }}>
              <Typography variant="body2" style={{ color: GREY_400 }}>
                <FormattedMessage id="registrationDates" />
              </Typography>
              {moment(userManagementInfo?.createdTime, DATE_TIME_FORMAT).format('L')}
            </BorderCustom>
            <Col
              style={{
                marginBottom: 8,
                alignItems: 'flex-start',
                flex: 1,
                paddingLeft: 24,
              }}
            >
              <Typography variant="body2" style={{ color: GREY_400 }}>
                <FormattedMessage id="latestUpdate" />
              </Typography>
              {userManagementInfo?.updatedTime}
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Button
              style={{ minHeight: 36, minWidth: 150 }}
              color="secondary"
              variant="contained"
              onClick={() => setOpenDialog(true)}
              disableElevation
            >
              <Typography variant="body2">
                <FormattedMessage id="changePassword" />
              </Typography>
            </Button>
            <ButtonBase style={{ marginLeft: 20 }} {...getRootProps()}>
              <div>
                <input {...getInputProps()} />
                <CameraIcon />
              </div>
              <Typography variant="body2" color="secondary">
                <FormattedMessage id="changeAvatar" />
              </Typography>
            </ButtonBase>
            <ButtonBase
              style={{ marginLeft: 32, color: GREY_600 }}
              onClick={() => setDefaultPhoto()}
            >
              <DeleteIcon className="svgFillAll" stroke={GREY_600} />
              <Typography variant="body2">
                <FormattedMessage id="usingPhotoDefault" />
              </Typography>
            </ButtonBase>
          </Row>
        </Col>
      </Row>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: fade(GREY_100, 0.7),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingIcon />
        </div>
      ) : (
        <UserForm
          loading={loading}
          info={userManagementInfo as UserManagementInfo}
          setInfo={updateAccountDetail}
        />
      )}
      <ChangePasswordDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}

export default GeneralInfo;
