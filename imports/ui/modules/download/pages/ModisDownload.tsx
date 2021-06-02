import { Form, Formik } from 'formik';
import React from 'react';
import Download from '../components/Download';
import { modisProduct } from '../utils';

const ModisDownload: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Download dataTitle="Độ ẩm" product={modisProduct} fileName='download_modis.py' command="python"></Download>
        </Form>
      )}
    </Formik>
  );
};

export default ModisDownload;
