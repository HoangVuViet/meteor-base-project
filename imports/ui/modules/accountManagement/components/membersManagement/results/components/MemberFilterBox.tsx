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
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../../configs/API';
import { GREY_600, TEAL, WHITE } from '../../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { AppState } from '../../../../../../redux/reducers';
import { ReactComponent as FilterIcon } from '../../../../../../svg/filter.svg';
import { ReactComponent as CloseIcon } from '../../../../../../svg/ic_closeIcon.svg';
import { ReactComponent as RefreshIcon } from '../../../../../../svg/refresh.svg';
import { Col, Row } from '../../../../../common/components/elements';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import SingleSelect from '../../../../../common/components/SingleSelect';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { LIST_STATUS } from '../../../../constant';
import { defaultMemberManagementFilter, IMemberManagementFilter } from '../../../constants';
import { ROLES } from '../../../../../../layout/constants';

interface Props {
  filter: IMemberManagementFilter;
  onUpdateFilter: (values: IMemberManagementFilter) => void;
}

const MemberFilterBox: React.FC<Props> = props => {
  const { filter, onUpdateFilter } = props;
  const intl = useIntl();
  const [openFilter, setOpenFilter] = React.useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listOperator, setListOperator] = React.useState<some[]>([]);
  const inputRef = React.useRef<any>();

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

  const formik = useFormik({
    initialValues: filter,
    onSubmit: values => {
      onUpdateFilter(values);
    },
  });

  React.useEffect(() => {
    fetchListOperator(ROLES.HMS_PRE_PROVIDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <ClickAwayListener onClickAway={() => setOpenFilter(false)}>
        <Col>
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
            style={{ minWidth: 520 }}
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
                  getOptionLabel={(v: any) => intl.formatMessage({ id: v.name })}
                  options={LIST_STATUS}
                />

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
                    listOperator as any,
                  )}
                />
              </Row>
              <Row style={{ justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={() => {
                    onUpdateFilter(defaultMemberManagementFilter);
                  }}
                >
                  <RefreshIcon />
                </IconButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: 150 }}
                  disableElevation
                  onClick={() => onUpdateFilter(formik.values)}
                >
                  <Typography variant="body2">
                    <FormattedMessage id="apply" />
                  </Typography>
                </LoadingButton>
              </Row>
            </Col>
          </Popper>
        </Col>
      </ClickAwayListener>
    </form>
  );
};

export default MemberFilterBox;
