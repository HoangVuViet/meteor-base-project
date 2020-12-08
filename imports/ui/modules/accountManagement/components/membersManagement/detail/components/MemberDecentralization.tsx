import { ButtonBase, Chip, IconButton, Typography } from '@material-ui/core';
import { FormikErrors, useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import {
  BLUE,
  BLUE_250,
  GREY_400,
  GREY_600,
  PRIMARY,
  SECONDARY,
  TEAL,
  WHITE,
} from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { AppState } from '../../../../../../redux/reducers';
import { ReactComponent as IconAdd } from '../../../../../../svg/ic_add_circle.svg';
import { ReactComponent as IconDelete } from '../../../../../../svg/ic_delete.svg';
import { ReactComponent as IconInfo } from '../../../../../../svg/ic_info.svg';
import BootstrapTooltip from '../../../../../accommodation/common/BootstrapTooltip';
import { Col, Row } from '../../../../../common/components/elements';
import FormControlAutoComplete from '../../../../../common/components/FormControlAutoComplete';
import FormControlSearchField from '../../../../../common/components/FormControlSearchField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import { goBackAction } from '../../../../../common/redux/reducer';
import {
  AdminPermissions,
  Decentralization,
  defaultDecentralization,
  defaultPermissions,
  ProviderPermissions,
} from '../../../../ultis';
import { listPermissions } from '../../../constants';
import { ROLES } from '../../../../../../layout/constants';
import ConfirmDialog from '../../../../../common/components/ConfirmDialog';

interface Props {
  userPermission: Decentralization;
  listOperator: some[];
  listProvince: some[];
  listHotel: some[];
  loading?: boolean;
  onChangeRole: (value: string) => void;
  searchDebounce: (value: string) => void;
  assignPermission: (values: Decentralization) => void;
}
const MemberDecentralization: React.FC<Props> = props => {
  const {
    userPermission,
    onChangeRole,
    listOperator,
    listProvince,
    searchDebounce,
    listHotel,
    assignPermission,
    loading,
  } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const [openDialog, setOpenDialog] = React.useState(false);

  const schemaValid = yup.object().shape({
    roleType: yup.string().required(intl.formatMessage({ id: 'required' })),
    providers: yup
      .array()
      .nullable()
      .of(
        yup.object().shape({
          groupOperatorId: yup.string().required(intl.formatMessage({ id: 'required' })),
          hotelId: yup.number().required(intl.formatMessage({ id: 'required' })),
        }),
      ),
    admins: yup
      .array()
      .nullable()
      .of(
        yup.object().shape({
          groupOperatorId: yup.string().required(intl.formatMessage({ id: 'required' })),
          provinceIds: yup
            .array()
            .of(yup.number())
            .required(intl.formatMessage({ id: 'required' })),
        }),
      ),
  });
  const formik = useFormik({
    initialValues: userPermission,
    onSubmit: values => setOpenDialog(true),
    validationSchema: schemaValid,
  });

  const listUsedOperatorAdmin = React.useMemo(() => {
    return formik.values.admins?.map(v => v.groupOperatorId);
  }, [formik.values.admins]);

  const listUnusedRoleTypeAdmin = React.useMemo(
    () => listOperator.filter(v => !listUsedOperatorAdmin?.includes(v.id)),
    [listOperator, listUsedOperatorAdmin],
  );

  const isRoleAdmin = React.useMemo(() => {
    if (formik.values.roleType === ROLES.HMS_PRE_ADMIN) {
      return true;
    }
    return false;
  }, [formik.values.roleType]);

  const handleChangeRole = React.useCallback(
    (roleType?: string) => {
      if (roleType) {
        onChangeRole(roleType);
        if (roleType === ROLES.HMS_PRE_ADMIN) {
          formik.setValues({
            roleType,
            admins: [defaultPermissions as AdminPermissions],
            providers: [],
          });
        } else
          formik.setValues({
            roleType,
            providers: [defaultPermissions as ProviderPermissions],
            admins: [],
          });
      } else formik.setValues(defaultDecentralization);
    },
    [formik, onChangeRole],
  );

  const listHotelUsed = React.useMemo(() => {
    return formik.values.providers?.map(v => v.hotelId);
  }, [formik.values.providers]);

  React.useEffect(() => {
    if (formik.values.roleType) {
      onChangeRole(formik.values.roleType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.roleType]);

  React.useEffect(() => {
    formik.setValues(userPermission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPermission]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Col>
        <Typography variant="subtitle1" style={{ color: TEAL }}>
          <FormattedMessage id="IDS_HMS_MEMBER_DECENTRALIZATION" />
        </Typography>
        <FormControlAutoComplete
          label={<FormattedMessage id="accManagement.groupPermissions" />}
          value={
            listPermissions.slice(1).find((v: some) => v.type === formik.values.roleType) || null
          }
          placeholder={intl.formatMessage({ id: 'choose' })}
          formControlStyle={{ width: 240, marginRight: 0 }}
          onChange={(e: any, value: some | null) => handleChangeRole(value?.type)}
          getOptionLabel={value => intl.formatMessage({ id: value.name })}
          options={listPermissions.slice(1)}
          errorMessage={
            formik.errors.roleType && formik.submitCount > 0 ? formik.errors.roleType : undefined
          }
        />
        {formik.values.roleType && (
          <>
            {isRoleAdmin
              ? formik.values.admins?.length > 0 &&
                formik.values.admins?.map((v: AdminPermissions, index: number) => (
                  <Row key={index} style={{ flexWrap: 'wrap' }}>
                    <FormControlAutoComplete
                      id="groupOperatorId"
                      label={<FormattedMessage id="accManagement.groupUsers" />}
                      placeholder={intl.formatMessage({ id: 'choose' })}
                      value={listOperator.find(one => one.id === v.groupOperatorId) || null}
                      formControlStyle={{ minWidth: 240 }}
                      onChange={(e: any, value: some | null) => {
                        formik.setFieldValue('admins', [
                          ...formik.values.admins?.slice(0, index),
                          {
                            ...v,
                            groupOperatorId: value?.id,
                          },
                          ...formik.values.admins?.slice(index + 1),
                        ]);
                      }}
                      getOptionLabel={(val: any) => val.name}
                      options={listUnusedRoleTypeAdmin}
                      errorMessage={
                        (formik.errors.admins?.[index] as FormikErrors<AdminPermissions>)
                          ?.groupOperatorId && formik.submitCount > 0
                          ? (formik.errors.admins?.[index] as FormikErrors<AdminPermissions>)
                              ?.groupOperatorId
                          : undefined
                      }
                    />
                    <FormControlAutoComplete
                      multiple
                      placeholder={intl.formatMessage({ id: 'choose' })}
                      label={<FormattedMessage id="IDS_HMS_MEMBER_ZONE_MANAGEMENT" />}
                      value={listProvince.filter(one => v.provinceIds?.includes(one.id))}
                      formControlStyle={{ minWidth: 400 }}
                      options={listProvince}
                      disableClearable
                      getOptionLabel={one => one.name}
                      onChange={(e: any, value: some[]) => {
                        formik.setFieldValue('admins', [
                          ...formik.values.admins?.slice(0, index),
                          {
                            ...v,
                            provinceIds: value.map(one => one.id),
                          },
                          ...formik.values.admins?.slice(index + 1),
                        ]);
                      }}
                      getOptionSelected={(option, value) => {
                        return option.id === value.id;
                      }}
                      renderTags={(value: some[], getTagProps) => (
                        <BootstrapTooltip
                          title={value.map(one => one.name).join(', ')}
                          arrow
                          style={{ maxWidth: 370, borderRadius: 8 }}
                        >
                          <Row>
                            {value.map((option: some, idx: number) => {
                              if (idx < 2) {
                                return (
                                  <Chip
                                    style={{
                                      backgroundColor: BLUE_250,
                                      border: 'none',
                                      height: 28,
                                      padding: '4',
                                      maxWidth: 150,
                                    }}
                                    variant="outlined"
                                    label={option.name}
                                    {...getTagProps({ index: idx })}
                                  />
                                );
                              }
                              return null;
                            })}
                            {value.length > 2 && (
                              <>
                                &hellip;&nbsp;
                                <Col
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    backgroundColor: PRIMARY,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="body2" style={{ color: WHITE }}>
                                    {value.length - 2}
                                  </Typography>
                                </Col>
                              </>
                            )}
                          </Row>
                        </BootstrapTooltip>
                      )}
                      disableCloseOnSelect
                      errorMessage={
                        (formik.errors.admins?.[index] as FormikErrors<AdminPermissions>)
                          ?.provinceIds && formik.submitCount > 0
                          ? (formik.errors.admins?.[index] as FormikErrors<AdminPermissions>)
                              ?.provinceIds
                          : undefined
                      }
                    />
                    {index > 0 && (
                      <IconButton
                        onClick={() => {
                          formik.setFieldValue('admins', [
                            ...formik.values.admins?.slice(0, index),
                            ...formik.values.admins?.slice(index + 1),
                          ]);
                        }}
                      >
                        <IconDelete className="svgFillAll" style={{ stroke: SECONDARY }} />
                      </IconButton>
                    )}
                  </Row>
                ))
              : formik.values.providers?.length > 0 &&
                formik.values.providers?.map((v: ProviderPermissions, index: number) => (
                  <Col key={index}>
                    <Row style={{ flexWrap: 'wrap' }}>
                      <FormControlAutoComplete
                        id="groupOperatorId"
                        label={<FormattedMessage id="accManagement.groupUsers" />}
                        placeholder={intl.formatMessage({ id: 'choose' })}
                        value={listOperator.find(one => one.id === v.groupOperatorId) || null}
                        formControlStyle={{ width: 240 }}
                        style={{ minWidth: 240 }}
                        onChange={(e: any, value: some | null) => {
                          formik.setFieldValue('providers', [
                            ...formik.values.providers?.slice(0, index),
                            {
                              ...v,
                              groupOperatorId: value?.id,
                            },
                            ...formik.values.providers?.slice(index + 1),
                          ]);
                        }}
                        getOptionLabel={(val: any) => val.name}
                        options={listOperator}
                        errorMessage={
                          (formik.errors.providers?.[index] as FormikErrors<ProviderPermissions>)
                            ?.groupOperatorId && formik.submitCount > 0
                            ? (formik.errors.providers?.[index] as FormikErrors<
                                ProviderPermissions
                              >)?.groupOperatorId
                            : undefined
                        }
                      />
                      <FormControlSearchField
                        label={<FormattedMessage id="IDS_HMS_HOTEL" />}
                        value={v.hotelId}
                        placeholder={intl.formatMessage({ id: 'choose' })}
                        saveItem={v?.hotelName ? { id: v?.hotelId, name: v?.hotelName } : undefined}
                        formControlStyle={{ minWidth: 300 }}
                        onSearch={values => {
                          searchDebounce(values);
                        }}
                        onSelectOption={(value: number) => {
                          formik.setFieldValue('providers', [
                            ...formik.values.providers?.slice(0, index),
                            {
                              ...v,
                              hotelId: value || null,
                            },
                            ...formik.values.providers?.slice(index + 1),
                          ]);
                        }}
                        options={listHotel.filter(one => !listHotelUsed.includes(one.id))}
                        errorMessage={
                          (formik.errors.providers?.[index] as FormikErrors<ProviderPermissions>)
                            ?.hotelId && formik.submitCount > 0
                            ? (formik.errors.providers?.[index] as FormikErrors<
                                ProviderPermissions
                              >)?.hotelId
                            : undefined
                        }
                      />
                      {index > 0 && (
                        <IconButton
                          onClick={() =>
                            formik.setFieldValue('providers', [
                              ...formik.values.providers?.slice(0, index),
                              ...formik.values.providers?.slice(index + 1),
                            ])
                          }
                          style={{ padding: 4, marginLeft: 8 }}
                        >
                          <IconDelete className="svgFillAll" style={{ stroke: SECONDARY }} />
                        </IconButton>
                      )}
                    </Row>
                    <Row style={{ alignItems: 'center' }}>
                      <IconInfo
                        className="svgFillAll"
                        style={{ fill: PRIMARY, stroke: WHITE, width: 24, height: 24 }}
                      />
                      <Typography color="primary" variant="body2">
                        <FormattedMessage id="IDS_HMS_MEMBER_PROVIDER_TEXT" />
                      </Typography>
                    </Row>
                  </Col>
                ))}
            {(!isRoleAdmin || formik.values.admins?.length !== listOperator.length) && (
              <ButtonBase
                style={{ padding: 0, alignSelf: 'flex-start', margin: '26px 0px' }}
                disableRipple
                onClick={() => {
                  if (isRoleAdmin) {
                    formik.setFieldValue(
                      'admins',
                      formik.values.admins?.concat(defaultPermissions as AdminPermissions),
                    );
                  } else
                    formik.setFieldValue(
                      'providers',
                      formik.values.providers?.concat(defaultPermissions as ProviderPermissions),
                    );
                }}
              >
                <Row>
                  <IconAdd style={{ marginRight: 6 }} />
                  <Typography variant="body2" style={{ color: BLUE }}>
                    <FormattedMessage id="IDS_HMS_MEMBER_ADD_GROUP_OPERATOR" />
                  </Typography>
                </Row>
              </ButtonBase>
            )}
          </>
        )}
        <Row style={{ marginBottom: 74, marginTop: 20 }}>
          <LoadingButton
            style={{ minHeight: 40, minWidth: 150, marginRight: 20 }}
            variant="contained"
            color="secondary"
            disableElevation
            type="submit"
            loading={loading}
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
        <ConfirmDialog
          titleLabel={<FormattedMessage id="IDS_HMS_MEMBER_UPDATE_INFO" />}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onAccept={() => {
            assignPermission({
              ...formik.values,
              providers: formik.values.providers?.map(v => {
                return {
                  hotelId: v.hotelId,
                  groupOperatorId: v.groupOperatorId,
                };
              }),
              admins: formik.values.admins?.map(v => {
                return {
                  provinceIds: v.provinceIds,
                  groupOperatorId: v.groupOperatorId,
                };
              }),
            });
            setOpenDialog(false);
          }}
          onReject={() => setOpenDialog(false)}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ maxWidth: 430, margin: '24px' }}
          >
            <FormattedMessage id="IDS_HMS_MEMBER_UPDATE_INFO_NOTE" />
          </Typography>
        </ConfirmDialog>
      </Col>
    </form>
  );
};

export default MemberDecentralization;
