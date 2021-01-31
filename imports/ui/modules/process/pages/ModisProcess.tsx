import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { interpolationMethod, modisDataSetValues } from '../utils';

const ModisProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Process
            dataTitle="modis"
            data={modisDataSetValues}
            interpolationMethod={interpolationMethod}
            command="python"
            fileName="download_modis.py"
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default ModisProcess;
