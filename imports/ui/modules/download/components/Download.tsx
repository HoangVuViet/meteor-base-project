import { Button, Paper, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FormattedMessage, useIntl } from 'react-intl';
import DateRangeFormControl from '../../common/components/DateRangeFormControl';
import { Col, Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import LoadingButton from '../../common/components/LoadingButton';
import { some } from '/imports/ui/constants';
import { C_DATE_FORMAT } from '/imports/ui/models/moment';

interface Props {
  dataTitle: string;
  product: some[];
  fileName: string;
  command: string;
}

const Download: React.FC<Props> = (props) => {
  const { dataTitle, product, command, fileName } = props;

  const intl = useIntl();
  const { setFieldValue, values, isSubmitting, resetForm, setSubmitting } = useFormikContext();
  const runScript = React.useCallback(() => {
    setSubmitting(true);
    const temp = product.find((el: some) => el?.id === (values as some)?.product)?.name;
    // const valuePassedToSever = `${(values as some)?.fromOrderDate} ${
    //   (values as some)?.toOrDerDate
    // } ${temp}`;
    Meteor.call(
      'method1',
      [
        command,
        fileName,
        `${(values as some)?.fromOrderDate}`,
        `${(values as some)?.toOrDerDate}`,
        temp,
      ],
      (_error: any, result: any) => {
        console.log(result);
      },
    );
    setSubmitting(false);
  }, [values, command]);

  return (
    <Col style={{ marginLeft: 20, marginTop: 10 }}>
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
              moment((values as some).fromOrderDate, C_DATE_FORMAT, true).isValid()
                ? moment((values as some).fromOrderDate, C_DATE_FORMAT, true)
                : undefined
            }
            endDate={
              (values as some).toOrDerDate &&
              moment((values as some).toOrDerDate, C_DATE_FORMAT, true).isValid()
                ? moment((values as some).toOrDerDate, C_DATE_FORMAT, true)
                : undefined
            }
            style={{ minWidth: 250 }}
            optional
            onChange={(startDate: any, endDate: any) => {
              setFieldValue(`fromOrderDate`, startDate?.format(C_DATE_FORMAT));
              setFieldValue(`toOrDerDate`, endDate?.format(C_DATE_FORMAT));
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
              height: 300,
            }}
          >
            {isSubmitting ? (
              <Typography variant="body2" style={{ whiteSpace: 'nowrap', color: '#ffb822' }}>
                <FormattedMessage id="isDownloading" />
              </Typography>
            ) : (
              <Typography variant="body2" style={{ whiteSpace: 'nowrap' }} color="textSecondary">
                <FormattedMessage id="emptyStatus" />
              </Typography>
            )}
          </Paper>
        </Row>
      </Col>
      <Row style={{ marginTop: 30, marginBottom: 20, marginLeft: 30 }}>
        <LoadingButton
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          style={{ marginRight: 24, width: 100, whiteSpace: 'nowrap' }}
          loading={isSubmitting}
          onClick={() => {
            runScript();
            setTimeout(() => {
              setSubmitting(false);
            }, 60000);
          }}
        >
          <FormattedMessage id="start" />
        </LoadingButton>
        <Button
          variant="outlined"
          disableElevation
          style={{ width: 100 }}
          onClick={() => {
            resetForm();
          }}
        >
          <FormattedMessage id="reject" />
        </Button>
      </Row>
    </Col>
  );
};

export default Download;
