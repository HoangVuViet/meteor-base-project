import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const AeronetProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Process
            dataTitle="aeronet"
            data={dataSetValues}
            interpolationMethod={interpolationMethod}
            command="python"
            fileName="process_modis.py"
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default AeronetProcess;
