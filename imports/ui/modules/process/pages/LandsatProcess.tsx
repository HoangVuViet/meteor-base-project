import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const LandsatProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({  }) => (
        <Form>
          <Process
            dataTitle="Landsat"
            data={dataSetValues}
            interpolationMethod={interpolationMethod}
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default LandsatProcess;