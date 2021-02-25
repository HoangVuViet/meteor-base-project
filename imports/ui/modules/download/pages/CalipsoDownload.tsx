import { Form, Formik } from 'formik';
import React from 'react';
import Download from '../components/Download';
import { calipsoProduct } from '../utils';

const CalipsoDownload: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Download
            dataTitle="calipso"
            product={calipsoProduct}
            fileName="download_calipso.py"
            command="python"
          ></Download>
        </Form>
      )}
    </Formik>
  );
};

export default CalipsoDownload;
