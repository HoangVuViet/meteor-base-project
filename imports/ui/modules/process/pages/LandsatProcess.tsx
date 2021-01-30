import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const LandsatProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Process
            dataTitle="Landsat"
            data={dataSetValues}
            interpolationMethod={interpolationMethod}
            command="python"
            fileName="test.py"
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default LandsatProcess;
