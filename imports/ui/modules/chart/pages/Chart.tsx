import { Form, Formik } from 'formik';
import React from 'react';
import ChartDetail from '../components/ChartDetail';
interface Props {}
const Chart: React.FC<Props> = () => {
  return (
    <Formik
      initialValues={{ dataType: 1, radius: 12, station: 2, time: 15 }}
      onSubmit={() => console.log('Submitting')}
    >
      {() => (
        <Form>
          <ChartDetail />
        </Form>
      )}
    </Formik>
  );
};
export default Chart;
