import { Form, Formik } from 'formik';
import React from 'react';
import Process from '../components/Process';
import { dataSetValues, interpolationMethod } from '../utils';

const CalipsoProcess: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Process
            dataTitle="Nhiệt độ"
            data={dataSetValues}
            interpolationMethod={interpolationMethod}
            command="python"
            fileName="process_calipso.py"
          ></Process>
        </Form>
      )}
    </Formik>
  );
};

export default CalipsoProcess;
