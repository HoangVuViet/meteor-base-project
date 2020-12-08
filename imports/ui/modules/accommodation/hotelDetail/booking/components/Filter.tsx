import { IconButton, InputAdornment, Popper, Typography } from '@material-ui/core';
import IconSearch from '@material-ui/icons/Search';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { GREY_600, TEAL, WHITE } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { ReactComponent as FilterIcon } from '../../../../../svg/filter.svg';
import { ReactComponent as CloseIcon } from '../../../../../svg/ic_closeIcon.svg';
import { ReactComponent as RefreshIcon } from '../../../../../svg/refresh.svg';
import DateRangeFormControl from '../../../../common/components/DateRangeFormControl';
import { Col, Row } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import { ORDER_STATUS_TYPES } from '../utils';

interface Props {
  onUpdateFilter: (values: some) => void;
}

const Filter: React.FC<Props> = props => {
  const initialValues: some = {};
  const { onUpdateFilter } = props;
  const [openFilter, setOpenFilter] = React.useState(false);
  const inputRef = React.useRef<any>();

  const intl = useIntl();

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={async (values, { setSubmitting }) => {}}>
        {({ values, resetForm, setFieldValue }) => {
          return (
            <Form>
              <Row style={{ alignItems: 'flex-start' }}>
                <div>
                  <Row>
                    <FieldTextContent
                      name="term"
                      placeholder={intl.formatMessage({
                        id: 'IDS_HMS_BOOKING_FILTER_PLACEHOLDER',
                      })}
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
                        boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Typography variant="subtitle2" style={{ color: TEAL }}>
                        <FormattedMessage id="filterBy" />
                      </Typography>
                      <Row style={{ margin: '20px 0px 12px 0px' }}>
                        <DateRangeFormControl
                          startDate={
                            values.fromOrderDate &&
                            moment(values.fromOrderDate, DATE_FORMAT_BACK_END, true).isValid()
                              ? moment(values.fromOrderDate, DATE_FORMAT_BACK_END, true)
                              : undefined
                          }
                          endDate={
                            values.toOrDerDate &&
                            moment(values.toOrDerDate, DATE_FORMAT_BACK_END, true).isValid()
                              ? moment(values.toOrDerDate, DATE_FORMAT_BACK_END, true)
                              : undefined
                          }
                          style={{ minWidth: 250, marginRight: 12 }}
                          optional
                          onChange={(startDate: any, endDate: any) => {
                            setFieldValue(`fromOrderDate`, startDate?.format(DATE_FORMAT_BACK_END));
                            setFieldValue(`toOrDerDate`, endDate?.format(DATE_FORMAT_BACK_END));
                          }}
                          isOutsideRange={(e: any) => false}
                          label={intl.formatMessage({ id: 'IDS_HMS_BOOKING_TIME_ORDER' })}
                        />
                        <DateRangeFormControl
                          startDate={
                            values.fromStayingDate &&
                            moment(values.fromStayingDate, DATE_FORMAT_BACK_END, true).isValid()
                              ? moment(values.fromStayingDate, DATE_FORMAT_BACK_END, true)
                              : undefined
                          }
                          endDate={
                            values.toStayingDate &&
                            moment(values.toStayingDate, DATE_FORMAT_BACK_END, true).isValid()
                              ? moment(values.toStayingDate, DATE_FORMAT_BACK_END, true)
                              : undefined
                          }
                          style={{ minWidth: 250 }}
                          optional
                          onChange={(startDate: any, endDate: any) => {
                            setFieldValue(
                              `fromStayingDate`,
                              startDate?.format(DATE_FORMAT_BACK_END),
                            );
                            setFieldValue(`toStayingDate`, endDate?.format(DATE_FORMAT_BACK_END));
                          }}
                          isOutsideRange={(e: any) => false}
                          label={intl.formatMessage({ id: 'IDS_HMS_STAYING_TIME' })}
                        />
                      </Row>
                      <Row>
                        <FieldSelectContent
                          name="nccMT"
                          label={intl.formatMessage({ id: 'IDS_HMS_BOOKING_NCC_MYTOUR' })}
                          placeholder={intl.formatMessage({
                            id: 'choose',
                          })}
                          optional
                          style={{ minWidth: 512 }}
                          formControlStyle={{ width: 512, marginRight: 0 }}
                          options={ORDER_STATUS_TYPES}
                          getOptionLabel={value => intl.formatMessage({ id: value.name })}
                          onSelectOption={(value: any) => {
                            setFieldValue('nccMT', value);
                          }}
                        />
                      </Row>
                      <Row style={{ alignSelf: 'flex-end' }}>
                        <IconButton
                          style={{ padding: 8, marginRight: 16 }}
                          onClick={() => resetForm()}
                        >
                          <RefreshIcon />
                        </IconButton>
                        <LoadingButton
                          variant="contained"
                          color="secondary"
                          type="submit"
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
                      </Row>
                    </Col>
                  </Popper>
                </div>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Filter;
