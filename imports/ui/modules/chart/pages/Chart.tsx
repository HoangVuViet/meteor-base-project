import { Form, Formik } from 'formik';
import React from 'react';
import ChartDetail from '../components/ChartDetail';
interface Props {}
const Chart: React.FC<Props> = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => console.log('Submitting')}>
      {() => (
        <Form>
          <ChartDetail />
        </Form>
      )}
    </Formik>
  );
};
export default Chart;
