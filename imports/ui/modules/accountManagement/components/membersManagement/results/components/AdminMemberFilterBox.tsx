import {
  ClickAwayListener,
  IconButton,
  InputAdornment,
  Popper,
  Typography,
} from '@material-ui/core';
import IconSearch from '@material-ui/icons/Search';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { AppState } from '../../../../../../redux/reducers';
import { actionGetApprovalHotel } from '../../../../../accommodation/accommodationService';
import { ReactComponent as FilterIcon } from '../../../../../../svg/filter.svg';
import { ReactComponent as CloseIcon } from '../../../../../../svg/ic_closeIcon.svg';
import { ReactComponent as RefreshIcon } from '../../../../../../svg/refresh.svg';
import {
  IMemberManagementFilter,
  listPermissions,
  defaultMemberManagementFilter,
} from '../../../constants';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { API_PATHS } from '../../../../../../configs/API';
import { Row, Col } from '../../../../../common/components/elements';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import { GREY_600, WHITE, TEAL } from '../../../../../../configs/colors';
import SingleSelect from '../../../../../common/components/SingleSelect';
import { LIST_STATUS } from '../../../../constant';
import FormControlAutoComplete from '../../../../../common/components/FormControlAutoComplete';
import FormControlSearchField from '../../../../../common/components/FormControlSearchField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import { ROLES } from '../../../../../../layout/constants';

interface Props {
  filter: IMemberManagementFilter;
  onUpdateFilter: (values: IMemberManagementFilter) => void;
}
const AdminMemberFilterBox: React.FC<Props> = props => {
  const { filter, onUpdateFilter } = props;
  const intl = useIntl();
  const [openFilter, setOpenFilter] = React.useState(false);
  const [listHotel, setListHotel] = React.useState([]);
  const [listProvince, setListProvince] = React.useState([
    { id: undefined, name: intl.formatMessage({ id: 'all' }) },
  ]);
  const [listOperator, setListOperator] = React.useState([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const formik = useFormik({
    initialValues: filter,
    onSubmit: values => {
      console.log();
      onUpdateFilter({ ...values, term: values.term.trim() });
    },
  });

  const inputRef = React.useRef<any>();

  const fetchData = React.useCallback(
    async (resultFilter: string) => {
      try {
        setListHotel([]);
        const params: some = {
          isApproved: true,
        };
        if (resultFilter) {
          params.term = resultFilter;
        }
        const searchStr = queryString.stringify(params);
        const dataSubmit: some = {};
        const res = await dispatch(actionGetApprovalHotel(dataSubmit, searchStr));
        if (res?.code === SUCCESS_CODE) {
          setListHotel(res?.data?.items);
        }
      } catch (error) {}
    },
    [dispatch],
  );

  const searchDebounce = React.useCallback(
    debounce(
      (value: string) => {
        if (value.length > 0) {
          fetchData(value);
        }
        if (value === '' || value.length === 0) {
          setListHotel([]);
        }
      },
      300,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const fetchListProvince = React.useCallback(
    debounce(
      async () => {
        try {
          const json = await dispatch(fetchThunk(API_PATHS.getProvinceByCountry(1)));
          if (json?.code === SUCCESS_CODE) {
            setListProvince(listProvince.concat(json.data?.items));
          }
        } catch (error) {}
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const fetchListOperator = React.useCallback(
    debounce(
      async (role: string) => {
        try {
          const json = await dispatch(fetchThunk(API_PATHS.getGroupOperator(role)));
          if (json?.code === SUCCESS_CODE) {
            setListOperator(json.data?.items);
          }
        } catch (error) {}
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  React.useEffect(() => {
    formik.setValues(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  React.useEffect(() => {
    fetchListProvince();
  }, [fetchListProvince]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row style={{ alignItems: 'flex-start', zIndex: 2 }}>
        <ClickAwayListener onClickAway={() => setOpenFilter(false)}>
          <div>
            <Row>
              <FormControlTextField
                name="term"
                value={formik.values.term}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_MEMBER_PLACE_HOLDER' })}
                formControlStyle={{ width: 544, marginRight: 0 }}
                onChange={formik.handleChange}
                startAdornment={
                  <InputAdornment position="end" variant="filled">
                    <IconSearch fontSize="small" style={{ color: GREY_600 }} />
                  </InputAdornment>
                }
                inputProps={{ maxLength: 100, autoComplete: 'off' }}
                focused={openFilter}
                innerRef={inputRef}
                onClick={() => setOpenFilter(true)}
              />
              <IconButton
                style={{
                  position: 'relative',
                  padding: 0,
                  bottom: 10,
                  right: 30,
                }}
                onClick={() => setOpenFilter(!openFilter)}
              >
                {openFilter ? <CloseIcon /> : <FilterIcon />}
              </IconButton>
            </Row>
            <Popper
              open={openFilter}
              anchorEl={inputRef?.current}
              placement="bottom"
              transition
              style={{ width: 544 }}
            >
              <Col
                style={{
                  padding: '16px 16px 24px 16px',
                  backgroundColor: WHITE,
                  boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="subtitle2" style={{ color: TEAL }}>
                  <FormattedMessage id="filterBy" />
                </Typography>
                <Row>
                  <SingleSelect
                    id="status"
                    label={<FormattedMessage id="status" />}
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    formControlStyle={{ width: 240 }}
                    onSelectOption={(value: number) => {
                      formik.setFieldValue('status', value);
                    }}
                    optional
                    getOptionLabel={(v: any) => intl.formatMessage({ id: v.name })}
                    options={LIST_STATUS}
                  />
                  <FormControlAutoComplete
                    label={<FormattedMessage id="accManagement.groupPermissions" />}
                    value={
                      listPermissions.find((v: some) => v.type === formik.values.roleType) || null
                    }
                    formControlStyle={{ width: 240, marginRight: 0 }}
                    onChange={(e: any, value: some | null) => {
                      formik.setFieldValue('roleType', value?.type, true);
                      value && fetchListOperator(value?.type);
                      if (formik.values.roleType === ROLES.HMS_PRE_PROVIDER) {
                        formik.setFieldValue('hotelId', undefined);
                        setListHotel([]);
                      }
                    }}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    options={listPermissions as some[]}
                  />
                </Row>
                {formik.values.roleType && (
                  <Row>
                    {formik.values.roleType === ROLES.HMS_PRE_PROVIDER ? (
                      <FormControlSearchField
                        label={<FormattedMessage id="IDS_HMS_HOTEL" />}
                        value={formik.values.hotelId}
                        optional
                        formControlStyle={{ width: 240, marginRight: 30 }}
                        onSearch={values => {
                          searchDebounce(values);
                        }}
                        onSelectOption={(values: number) => {
                          formik.setFieldValue('hotelId', values);
                        }}
                        options={[
                          { id: undefined, name: intl.formatMessage({ id: 'all' }) },
                        ].concat(listHotel)}
                      />
                    ) : (
                      <FormControlAutoComplete
                        label={<FormattedMessage id="IDS_HMS_MEMBER_ZONE_MANAGEMENT" />}
                        value={
                          listProvince.find((v: some) => v.id === formik.values.provinceIds) || null
                        }
                        formControlStyle={{ width: 240, marginRight: 30 }}
                        onChange={(e: any, value: some | null) => {
                          formik.setFieldValue('provinceIds', value?.id, true);
                        }}
                        getOptionLabel={(value: any) => value?.name}
                        options={listProvince}
                      />
                    )}
                    <SingleSelect
                      id="groupOperatorId"
                      label={<FormattedMessage id="accManagement.groupUsers" />}
                      onChange={formik.handleChange}
                      value={formik.values.groupOperatorId}
                      formControlStyle={{ width: 240, marginRight: 0 }}
                      onSelectOption={(value: number) => {
                        formik.setFieldValue('groupOperatorId', value);
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      options={[{ id: undefined, name: intl.formatMessage({ id: 'all' }) }].concat(
                        listOperator,
                      )}
                    />
                  </Row>
                )}

                <Row style={{ alignSelf: 'flex-end' }}>
                  <IconButton
                    style={{ padding: 8, marginRight: 16 }}
                    onClick={() =>
                      onUpdateFilter({
                        ...defaultMemberManagementFilter,
                        pageSize: formik.values.pageSize,
                        pageOffset: formik.values.pageOffset,
                      })
                    }
                  >
                    <RefreshIcon />
                  </IconButton>
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    disableElevation
                    type="submit"
                    onClick={() => {
                      onUpdateFilter({ ...formik.values, term: formik.values.term.trim() });
                    }}
                    style={{ minWidth: 150, height: 40, alignSelf: 'flex-end' }}
                  >
                    <Typography variant="body2">
                      <FormattedMessage id="apply" />
                    </Typography>
                  </LoadingButton>
                </Row>
              </Col>
            </Popper>
          </div>
        </ClickAwayListener>
      </Row>
    </form>
  );
};

export default AdminMemberFilterBox;
