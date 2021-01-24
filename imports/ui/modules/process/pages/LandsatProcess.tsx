import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const LandsatProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ isSubmitting }) => (
        <Form>
          <Process dataTitle="Landsat" data={dataSetValues} interpolationMethod={interpolationMethod}></Process>
          <Row style={{ marginTop: 30, marginBottom: 20, marginLeft: 50 }}>
            <LoadingButton
              type="submit"
              color="secondary"
              variant="contained"
              disableElevation
              style={{ marginRight: 24, width: 100, whiteSpace: 'nowrap' }}
              loading={isSubmitting}
              // onClick={() => {

              // }}
            >
              <FormattedMessage id="start" />
            </LoadingButton>
            <Button
              variant="outlined"
              disableElevation
              style={{ width: 100 }}
              // onClick={() => {
              // }}
            >
              <FormattedMessage id="IDS_HMS_REJECT" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LandsatProcess;
