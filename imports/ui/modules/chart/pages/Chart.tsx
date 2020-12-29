import { Form, Formik } from 'formik';
import React from 'react';
import ChartDetail from '../components/ChartDetail';

interface Props {}
const Chart: React.FC<Props> = (props) => {
  return (
    <Formik
      initialValues={{ dataType: 'MOD', radius: '5', time: '30' }}
      onSubmit={() => console.log('Submitting')}
    >
      {() => {
        return (
          <Form>
            <ChartDetail></ChartDetail>
          </Form>
        );
      }}
    </Formik>
  );
};
export default Chart;
