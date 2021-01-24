import { Button, Paper, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { Col, Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import { some } from '/imports/ui/constants';

interface Props {
  dataTitle: string;
  data: some[];
  interpolationMethod: some[];
}

const Download: React.FC<Props> = (props) => {
  const { dataTitle, data, interpolationMethod } = props;

  const intl = useIntl();
  const { setFieldValue, values } = useFormikContext();

  console.log(values as some);

  return (
    <Col style={{ marginLeft: 20 }}>
      <Row style={{ marginBottom: 12 }}>
        <Typography variant="h6" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
          <FormattedMessage id="process" />
        </Typography>
        &nbsp;
        <Typography variant="h6" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
          <FormattedMessage id={dataTitle} />
        </Typography>
      </Row>
      <Col style={{ marginLeft: 30 }}>
        <Row style={{ justifyContent: 'flex-start', marginBottom: 30 }}>
          <Typography
            variant="body2"
            style={{
              marginRight: 110,
              whiteSpace: 'nowrap',
              alignSelf: 'flex-start',
            }}
          >
            <FormattedMessage id="chooseFile" />
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            style={{ width: 150, whiteSpace: 'nowrap' }}
            onClick={() => {
              document.getElementById(`upload_file`)?.click();
            }}
          >
            <input
              type="file"
              style={{ display: 'none' }}
              id={`upload_file`}
              accept="image/jpeg,image/png,application/pdf"
              multiple
              // onChange={handleUploadFile}
            />

            <FormattedMessage id="chooseFile" />
          </Button>
        </Row>
        <Row style={{ justifyContent: 'flex-start', marginBottom: 30 }}>
          <Typography
            variant="body2"
            style={{
              marginRight: 80,
              whiteSpace: 'nowrap',
              alignSelf: 'flex-start',
            }}
          >
            <FormattedMessage id="files" />
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
        <Row>
          <Typography
            variant="body2"
            style={{ marginBottom: 30, marginRight: 120, whiteSpace: 'nowrap' }}
          >
            <FormattedMessage id="dataSet" />
          </Typography>
          <FieldSelectContent
            name="dataSet"
            label={null}
            style={{
              width: 250,
            }}
            formControlStyle={{
              minWidth: 250,
            }}
            options={data}
            getOptionLabel={(value) => value.name}
            onSelectOption={(value: number) => {
              setFieldValue('dataSet', value);
            }}
            placeholder={intl.formatMessage({ id: 'choose' })}
            disableError
          />
        </Row>
        <Row>
          <Typography
            variant="body2"
            style={{ marginBottom: 30, marginRight: 36, whiteSpace: 'nowrap' }}
          >
            <FormattedMessage id="interpolationMethod" />
          </Typography>
          <FieldSelectContent
            name="interpolationMethod"
            label={null}
            style={{
              width: 250,
            }}
            formControlStyle={{
              minWidth: 250,
            }}
            options={interpolationMethod}
            getOptionLabel={(value) => value.name}
            onSelectOption={(value: number) => {
              setFieldValue('interpolationMethod', value);
            }}
            placeholder={intl.formatMessage({ id: 'choose' })}
            disableError
          />
        </Row>
        {/* <Row>
          <Col>
            <Typography
              variant="body2"
              style={{ marginBottom: 30, marginRight: 36, whiteSpace: 'nowrap' }}
            >
              <FormattedMessage id="Độ phân giải x" />
            </Typography>
            <FieldTextContent
              name={`price`}
              label={null}
              style={{ width: 250 }}
              formControlStyle={{ minWidth: 250 }}
              inputProps={{
                maxLength: 12,
              }}
              disableError
            />
          </Col>
        </Row> */}
        <Row style={{ justifyContent: 'flex-start', marginBottom: 30 }}>
          <Typography
            variant="body2"
            style={{
              marginRight: 105,
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
