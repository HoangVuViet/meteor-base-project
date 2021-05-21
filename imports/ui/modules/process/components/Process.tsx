import { Button, Paper, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { Col, Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import LoadingButton from '../../common/components/LoadingButton';
import { isEmpty, some } from '/imports/ui/constants';

interface Props {
  dataTitle: string;
  data: some[];
  interpolationMethod: some[];
  fileName: string;
  command: string;
}

const Download: React.FC<Props> = (props) => {
  const { dataTitle, data, interpolationMethod, command, fileName } = props;

  const intl = useIntl();
  const { setFieldValue, values, isSubmitting, setSubmitting, resetForm } = useFormikContext();
  const [fileAmount, setFileAmount] = React.useState<string[]>([]);

  const handleUploadFile = async (e: any) => {
    setFileAmount(Object.values(e.target.files)?.map((el: some) => el?.name));
  };

  const runScript = React.useCallback(() => {
    setSubmitting(true);
    const temp = interpolationMethod.find(
      (el: some) => el?.id === (values as some)?.interpolationMethod,
    )?.name;
    Meteor.call(
      'method2',
      [
        command,
        fileName,
        'E:/APOM_PLATFORM/code/visualization/meteor-base-project/ImageDownload/',
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
              onChange={handleUploadFile}
              directory="E:/"
              webkitdirectory=""
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
            {!isEmpty(fileAmount) ? (
              <Fragment>
                {fileAmount?.map((el: string, idx: number) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    style={{ marginBottom: 12, whiteSpace: 'nowrap' }}
                  >
                    {el}
                  </Typography>
                ))}
              </Fragment>
            ) : (
              <Typography variant="body2" style={{ whiteSpace: 'nowrap' }} color="textSecondary">
                <FormattedMessage id="empty" />
              </Typography>
            )}
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
              width: 300,
            }}
            formControlStyle={{
              minWidth: 300,
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
              width: 300,
            }}
            formControlStyle={{
              minWidth: 300,
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
              height: 300,
            }}
          >
            {isSubmitting ? (
              <Typography variant="body2" style={{ whiteSpace: 'nowrap', color: '#ffb822' }}>
                <FormattedMessage id="isProgressing" />
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
            setTimeout(() => {
              setSubmitting(false);
            }, 10000);
            runScript();
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
            setFileAmount([]);
          }}
        >
          <FormattedMessage id="reject" />
        </Button>
      </Row>
    </Col>
  );
};

export default Download;
