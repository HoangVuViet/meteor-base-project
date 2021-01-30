import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const ModisProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({  }) => (
        <Form>
          <Process
            dataTitle="modis"
            data={dataSetValues}
            interpolationMethod={interpolationMethod}
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default ModisProcess;
