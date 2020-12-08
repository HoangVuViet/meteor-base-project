import {
  ClickAwayListener,
  IconButton,
  InputAdornment,
  Popper,
  Typography,
} from '@material-ui/core';
import IconSearch from '@material-ui/icons/Search';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_600, TEAL, WHITE } from '../../../../configs/colors';
import { some } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { ReactComponent as FilterIcon } from '../../../../svg/filter.svg';
import { ReactComponent as CloseIcon } from '../../../../svg/ic_closeIcon.svg';
import { Col, Row } from '../../../common/components/elements';
import FormControlAutoComplete from '../../../common/components/FormControlAutoComplete';
import LoadingButton from '../../../common/components/LoadingButton';
import { actionsGetListHotel, actionsGetListProvinces } from '../../accommodationService';
import { FieldSelectContent, FieldTextContent } from '../../common/FieldContent';
import { STAR_LIST } from '../../constant';

interface Props {
  onUpdateFilter: (values: any) => void;
}
const Filter: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { onUpdateFilter } = props;
  const [openFilter, setOpenFilter] = useState(false);
  const [listHotel, setListHotel] = useState<some>({});
  const [listProvince, setListProvince] = useState<some>({});

  const intl = useIntl();

  const inputRef = useRef<any>();
  const fetchData = async () => {
    try {
      const [resHotels, resProvinces] = await Promise.all([
        dispatch(actionsGetListHotel()),
        dispatch(actionsGetListProvinces()),
      ]);
      setListHotel(resHotels?.data);
      setListProvince(resProvinces?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Formik initialValues={{}} onSubmit={async (values, { setSubmitting }) => {}}>
        {({ values, isSubmitting, resetForm, setFieldValue }) => {
          // const valueForm: some = { ...values };
          // const hotelValue = listHotel.items
          //   ? listHotel?.items.find((v: any) => v.id === valueForm.chainIds)
          //   : null;
          // const provinceValue = listProvince.items
          //   ? listProvince?.items.find((v: any) => v.id === valueForm.provinceIds)
          //   : null;
          return (
            <Form>
              <Row style={{ alignItems: 'flex-start' }}>
                <ClickAwayListener onClickAway={() => setOpenFilter(false)}>
                  <div>
                    <Row>
                      <FieldTextContent
                        name="term"
                        placeholder={intl.formatMessage({ id: 'ratePackage.searchByIdOrName' })}
                        formControlStyle={{ width: 544, marginRight: 0 }}
                        startAdornment={
                          <InputAdornment position="end" variant="filled">
                            <IconSearch fontSize="small" style={{ color: GREY_600 }} />
                          </InputAdornment>
                        }
                        inputProps={{ autoComplete: 'off' }}
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
                          boxShadow:
                            '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Typography variant="subtitle2" style={{ color: TEAL }}>
                          <FormattedMessage id="filterBy" />
                        </Typography>
                        <Row style={{ margin: '16px 0px 16px 0px' }}>
                          <FormControlAutoComplete
                            label={<FormattedMessage id="ratePackage.listHotel" />}
                            placeholder={intl.formatMessage({ id: 'choose' })}
                            style={{ width: 156 }}
                            formControlStyle={{ minWidth: 156, marginRight: 20 }}
                            optional
                            disabled
                            value={null}
                            options={listHotel?.items}
                            onChange={(e: any, value: some | null) =>
                              setFieldValue('chainIds', value?.id)
                            }
                            getOptionLabel={(v: any) => v?.hotelName || ''}
                          />
                          <FieldSelectContent
                            name="starNumbers"
                            label={<FormattedMessage id="ratePackage.starRating" />}
                            style={{ width: 156 }}
                            formControlStyle={{ minWidth: 156, marginRight: 20 }}
                            placeholder={intl.formatMessage({ id: 'choose' })}
                            optional
                            multiple
                            options={STAR_LIST}
                            getOptionLabel={v => v.name}
                            onSelectOption={(value: any) => {
                              setFieldValue('starNumbers', value);
                            }}
                          />
                          <FieldSelectContent
                            name="provinceIds"
                            label={<FormattedMessage id="city" />}
                            placeholder={intl.formatMessage({ id: 'choose' })}
                            style={{ width: 156 }}
                            optional
                            multiple
                            options={listProvince?.items}
                            getOptionLabel={(v: any) => v?.name || ''}
                            onSelectOption={(value: any) => {
                              setFieldValue('provinceIds', value);
                            }}
                          />
                          {/* <FormControlAutoComplete
                            label={<FormattedMessage id="city" />}
                            placeholder={intl.formatMessage({ id: 'choose' })}
                            style={{ width: 156 }}
                            optional
                            multiple
                            value={provinceValue}
                            options={listProvince?.items}
                            onChange={(e: any, value: some | null) =>
                              setFieldValue('provinceIds', value?.id)
                            }
                            getOptionLabel={(v: any) => v?.name || ''}
                          /> */}
                        </Row>
                        <LoadingButton
                          variant="contained"
                          color="secondary"
                          disableElevation
                          style={{ minWidth: 150, height: 40, alignSelf: 'flex-end' }}
                          onClick={() => {
                            onUpdateFilter(values);
                            setOpenFilter(false);
                          }}
                        >
                          <Typography variant="body2">
                            <FormattedMessage id="apply" />
                          </Typography>
                        </LoadingButton>
                      </Col>
                    </Popper>
                  </div>
                </ClickAwayListener>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Filter;
