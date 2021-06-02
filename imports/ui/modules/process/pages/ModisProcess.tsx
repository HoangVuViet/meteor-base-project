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
            dataTitle="Độ ẩm"
            data={modisDataSetValues}
            interpolationMethod={interpolationMethod}
            command="python"
            fileName="process_modis.py"
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default ModisProcess;
