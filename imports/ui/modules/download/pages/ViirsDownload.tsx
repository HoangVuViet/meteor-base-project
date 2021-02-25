import { Form, Formik } from 'formik';
import React from 'react';
import Download from '../components/Download';
import { landsatProduct } from '../utils';

const ViirsDownload: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Download
            dataTitle="VIIRS"
            product={landsatProduct}
            fileName="download_viirs.py"
            command="python"
          ></Download>
        </Form>
      )}
    </Formik>
  );
};

export default ViirsDownload;
