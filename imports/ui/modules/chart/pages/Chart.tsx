import { Form, Formik } from 'formik';
import React from 'react';
import ChartDetail from '../components/ChartDetail';
interface Props {}
const Chart: React.FC<Props> = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <div style={{marginLeft: 20, marginTop: -30}}>
          <ChartDetail />
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Chart;
