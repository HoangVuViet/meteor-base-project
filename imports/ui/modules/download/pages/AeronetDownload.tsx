import { Form, Formik } from 'formik';
import React from 'react';
import Download from '../components/Download';
import { landsatProduct } from '../utils';

const AeronetDownload: React.FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({}) => (
        <Form>
          <Download dataTitle="aeronet" product={landsatProduct} fileName='download_landsat.py' command="python"></Download>
        </Form>
      )}
    </Formik>
  );
};

export default AeronetDownload;
