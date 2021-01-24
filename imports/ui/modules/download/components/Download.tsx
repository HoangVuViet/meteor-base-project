import { Paper, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import moment from 'moment';
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FormattedMessage, useIntl } from 'react-intl';
import DateRangeFormControl from '../../common/components/DateRangeFormControl';
import { Col, Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import { some } from '/imports/ui/constants';
import { DATE_FORMAT_BACK_END } from '/imports/ui/models/moment';

interface Props {
  dataTitle: string;
  product: some[];
}

const Download: React.FC<Props> = (props) => {
  const { dataTitle, product } = props;

  const intl = useIntl();
  const { setFieldValue, values } = useFormikContext();

  console.log(values as some);

  return (
    <Col style={{ marginLeft: 20 }}>
      <Row style={{ marginBottom: 12 }}>
        <Typography variant="h6" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
          <FormattedMessage id="download" />
        </Typography>
        &nbsp;
        <Typography variant="h6" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
          <FormattedMessage id={dataTitle} />
        </Typography>
      </Row>
      <Col style={{ marginLeft: 30 }}>
        <Row>
          <Typography
            variant="body2"
            style={{ marginBottom: 20, marginRight: 42, whiteSpace: 'nowrap' }}
          >
            <FormattedMessage id="timeChoosing" />
          </Typography>
          <DateRangeFormControl
            startDate={
              (values as some).fromOrderDate &&
              moment((values as some).fromOrderDate, DATE_FORMAT_BACK_END, true).isValid()
                ? moment((values as some).fromOrderDate, DATE_FORMAT_BACK_END, true)
                : undefined
            }
            endDate={
              (values as some).toOrDerDate &&
              moment((values as some).toOrDerDate, DATE_FORMAT_BACK_END, true).isValid()
                ? moment((values as some).toOrDerDate, DATE_FORMAT_BACK_END, true)
                : undefined
            }
            style={{ minWidth: 250 }}
            optional
            onChange={(startDate: any, endDate: any) => {
              setFieldValue(`fromOrderDate`, startDate?.format(DATE_FORMAT_BACK_END));
              setFieldValue(`toOrDerDate`, endDate?.format(DATE_FORMAT_BACK_END));
            }}
            isOutsideRange={() => false}
            label={intl.formatMessage({ id: 'timeChoosing' })}
          />
        </Row>
        <Row>
          <Typography
            variant="body2"
            style={{ marginBottom: 30, marginRight: 56, whiteSpace: 'nowrap' }}
          >
            <FormattedMessage id="product" />
          </Typography>
          <FieldSelectContent
            name="product"
            label={null}
            style={{
              width: 250,
            }}
            formControlStyle={{
              minWidth: 250,
            }}
            options={product}
            getOptionLabel={(value) => value.name}
            onSelectOption={(value: number) => {
              setFieldValue('product', value);
            }}
            placeholder={intl.formatMessage({ id: 'choose' })}
            disableError
          />
        </Row>
        <Row style={{ justifyContent: 'flex-start' }}>
          <Typography
            variant="body2"
            style={{
              marginBottom: 30,
              marginRight: 55,
              whiteSpace: 'nowrap',
              alignSelf: 'flex-start',
            }}
          >
            <FormattedMessage id="status" />
          </Typography>
          <Paper
            variant="outlined"
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: '#f5f5f5',
              boxShadow: 'none',
              width: 500,
            }}
          >
            <Typography variant="body2" style={{ marginBottom: 12, whiteSpace: 'nowrap' }}>
              <FormattedMessage id="success" />
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 12, whiteSpace: 'nowrap' }}>
              <FormattedMessage id="success" />
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 12, whiteSpace: 'nowrap' }}>
              <FormattedMessage id="success" />
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 12, whiteSpace: 'nowrap' }}>
              <FormattedMessage id="success" />
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 12, whiteSpace: 'nowrap' }}>
              <FormattedMessage id="success" />
            </Typography>
          </Paper>
        </Row>
      </Col>
    </Col>
  );
};

export default Download;
