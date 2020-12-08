/* eslint-disable no-nested-ternary */
import { Avatar, Divider, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GREY_400, WHITE, SECONDARY, GREY_600, PRIMARY } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import DefaultAvatar from '../../../../../../images/avatar_not_found.jpg';
import { DATE_TIME_FORMAT } from '../../../../../../models/moment';
import { Col, Row } from '../../../../../common/components/elements';
import LoadingButton from '../../../../../common/components/LoadingButton';
import { Decentralization, UserManagementInfo } from '../../../../ultis';
import MemberDecentralization from './MemberDecentralization';
import MemberInfo from './MemberInfo';
import { ReactComponent as IconClose } from '../../../../../../svg/ic_closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../svg/ic_delete.svg';
import SingleSelect from '../../../../../common/components/SingleSelect';
import { AppState } from '../../../../../../redux/reducers';
import { goBackAction } from '../../../../../common/redux/reducer';
import { ReactComponent as IconInfo } from '../../../../../../svg/ic_info.svg';
import { ROLES } from '../../../../../../layout/constants';
import ConfirmDialog from '../../../../../common/components/ConfirmDialog';
import { ReactComponent as IconWarning } from '../../../../../../svg/ic_warning.svg';

const BorderCustom = styled.div`
  border-right: 0.5px solid ${GREY_400};
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  align-items: flex-start;
  flex: 1;
  min-height: 40px;
`;

interface Props {
  userManagementInfo: UserManagementInfo;
  userPermission: Decentralization;
  userHotelPermission?: some;
  onChangeRole: (value: string) => void;
  searchDebounce: (value: string) => void;
  assignPermission: (values: Decentralization) => void;
  listOperator: some[];
  listProvince: some[];
  listHotel: some[];
  loading: boolean;
  changeStatusUser: (userId: number, status: number) => void;
  onDeleteUserFromHotel: (hotelId: number, userId: number) => void;
  updateOperatorHotel: (value: some) => void;
}

const MemberDetailDesktop: React.FC<Props> = props => {
  const {
    userManagementInfo,
    userPermission,
    onChangeRole,
    listOperator,
    listProvince,
    searchDebounce,
    listHotel,
    assignPermission,
    loading,
    changeStatusUser,
    onDeleteUserFromHotel,
    userHotelPermission,
    updateOperatorHotel,
  } = props;

  const match: any = useRouteMatch();
  const hotelId = match.params?.hotelId;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const [open, setOpen] = React.useState(false);

  const schemaValid = yup.object().shape({
    groupOperatorId: yup.number().required(intl.formatMessage({ id: 'required' })),
  });

  const formik = useFormik({
    initialValues: { groupOperatorId: userHotelPermission?.id },
    onSubmit: values => {
      updateOperatorHotel({
        hotelId,
        groupOperatorId: values.groupOperatorId,
        userId: userManagementInfo.id,
      });
    },
    validationSchema: schemaValid,
  });

  React.useEffect(() => {
    hotelId && onChangeRole(ROLES.HMS_PRE_PROVIDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId]);

  return (
    <Col>
      <Typography variant="h5">
        <FormattedMessage id="accManagement.generalInfo" />
      </Typography>
      <Row style={{ paddingBottom: 68, paddingTop: 16, alignItems: 'flex-start' }}>
        <Avatar
          style={{ width: 128, height: 128 }}
          alt=""
          src={userManagementInfo.profilePhoto || DefaultAvatar}
        />
        <Col style={{ width: '50%', marginLeft: 24, minWidth: 800 }}>
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
                <FormattedMessage id="registrationDates" />
              </Typography>
              <Typography variant="body2">
                {moment(userManagementInfo?.createdTime, DATE_TIME_FORMAT).format('L') || (
                  <FormattedMessage id="IDS_HMS_MEMBER_NULL" />
                )}
              </Typography>
            </BorderCustom>
            <BorderCustom style={{ paddingLeft: 24 }}>
              <Typography variant="body2" style={{ color: GREY_400 }}>
                <FormattedMessage id="latestUpdate" />
              </Typography>
              {userManagementInfo?.updatedTime || <FormattedMessage id="IDS_HMS_MEMBER_NULL" />}
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
                <FormattedMessage id="updater" />
              </Typography>
              {userManagementInfo?.updateBy?.name || <FormattedMessage id="IDS_HMS_MEMBER_NULL" />}
            </Col>
          </Row>
          <Row>
            <LoadingButton
              size="medium"
              color="secondary"
              variant="contained"
              style={{ minWidth: 160, marginTop: 24, marginBottom: 32 }}
              disableElevation
              onClick={() => setOpen(true)}
            >
              <Row>
                {hotelId ? (
                  <DeleteIcon
                    className="svgFillAll"
                    style={{ fill: WHITE, stroke: SECONDARY, marginRight: 10 }}
                  />
                ) : (
                  userManagementInfo?.id === 1 && (
                    <IconClose
                      className="svgFillAll"
                      style={{ fill: WHITE, stroke: SECONDARY, marginRight: 10 }}
                    />
                  )
                )}
                <FormattedMessage
                  id={
                    hotelId
                      ? 'IDS_HMS_MEMBER_DELETE'
                      : userManagementInfo?.status === 1
                      ? 'IDS_HMS_MEMBER_DEACTIVATE'
                      : 'IDS_HMS_MEMBER_ACTIVATE'
                  }
                />
              </Row>
            </LoadingButton>
          </Row>
          <MemberInfo memberInfo={userManagementInfo} />
          <Divider style={{ margin: '16px 0px 24px 0px' }} />
          {hotelId ? (
            <form onSubmit={formik.handleSubmit}>
              <Col>
                <SingleSelect
                  id="groupId"
                  label={<FormattedMessage id="accManagement.groupUsers" />}
                  placeholder={intl.formatMessage({ id: 'choose' })}
                  value={formik.values.groupOperatorId}
                  formControlStyle={{ width: 240, marginRight: 0 }}
                  onSelectOption={(value: number) => {
                    formik.setFieldValue('groupOperatorId', value);
                  }}
                  getOptionLabel={(v: any) => v.name}
                  options={listOperator}
                  errorMessage={
                    formik.errors.groupOperatorId
                      ? (formik.errors.groupOperatorId as string)
                      : undefined
                  }
                />
                <Row style={{ alignItems: 'center', marginBottom: 32 }}>
                  <IconInfo
                    className="svgFillAll"
                    style={{ fill: PRIMARY, stroke: WHITE, width: 24, height: 24 }}
                  />
                  <Typography color="primary" variant="body2">
                    <FormattedMessage id="IDS_HMS_MEMBER_PROVIDER_TEXT" />
                  </Typography>
                </Row>
                <Row style={{ marginBottom: 74 }}>
                  <LoadingButton
                    style={{ minHeight: 40, minWidth: 150, marginRight: 20 }}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    loading={loading}
                    type="submit"
                  >
                    <FormattedMessage id="IDS_HMS_SAVE" />
                  </LoadingButton>
                  <LoadingButton
                    style={{ minHeight: 40, minWidth: 150, color: GREY_400 }}
                    variant="outlined"
                    disableElevation
                    loading={loading}
                    onClick={() => dispatch(goBackAction())}
                  >
                    <Typography variant="subtitle2" style={{ color: GREY_600 }}>
                      <FormattedMessage id="IDS_HMS_REJECT" />
                    </Typography>
                  </LoadingButton>
                </Row>
              </Col>
            </form>
          ) : (
            <MemberDecentralization
              listOperator={listOperator}
              listProvince={listProvince}
              onChangeRole={onChangeRole}
              searchDebounce={searchDebounce}
              listHotel={listHotel}
              userPermission={userPermission}
              assignPermission={assignPermission}
              loading={loading}
            />
          )}
        </Col>
      </Row>
      <ConfirmDialog
        open={open}
        onAccept={() => {
          userManagementInfo?.id &&
            (hotelId
              ? onDeleteUserFromHotel(hotelId, userManagementInfo?.id)
              : changeStatusUser(userManagementInfo?.id, userManagementInfo?.status === 1 ? 0 : 1));
        }}
        onClose={() => setOpen(false)}
        onReject={() => setOpen(false)}
        styleActions={{ justifyContent: 'center' }}
      >
        <Col style={{ alignItems: 'center', padding: '50px 0px 0px 0px' }}>
          <IconWarning />
          {!hotelId && (
            <Typography variant="subtitle1">
              <FormattedMessage
                id={
                  userManagementInfo?.status === 1
                    ? 'IDS_HMS_MEMBER_DEACTIVATE_CONFIRM'
                    : 'IDS_HMS_MEMBER_ACTIVATE_CONFIRM'
                }
              />
            </Typography>
          )}
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ maxWidth: '436px', margin: '25px 0px', textAlign: 'center' }}
          >
            <FormattedMessage
              id={
                hotelId
                  ? 'IDS_HMS_MEMBER_DELETE_INFO_NOTE'
                  : userManagementInfo?.status === 1
                  ? 'IDS_HMS_MEMBER_DEACTIVATE_NOTE'
                  : 'IDS_HMS_MEMBER_ACTIVATE_NOTE'
              }
            />
          </Typography>
        </Col>
      </ConfirmDialog>
    </Col>
  );
};

export default MemberDetailDesktop;
