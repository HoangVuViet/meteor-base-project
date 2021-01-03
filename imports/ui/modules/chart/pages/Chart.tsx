import { csv } from 'd3';
import { Form, Formik } from 'formik';
import React from 'react';
import ChartDetail from '../components/ChartDetail';
import { some, URL_BASE } from '/imports/ui/constants';
interface Props {}
const Chart: React.FC<Props> = (props: any) => {
  const [data, setData] = React.useState<some[]>([]);
  const fetchData = React.useCallback(() => {
    csv(URL_BASE + '/data/Landsat_15m_0.03km_NghiaDo.csv').then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Formik initialValues={{}} onSubmit={() => console.log('Submitting')}>
      {() => (
        <Form>
          <ChartDetail
            chartData={data.map((el: some) => {
              return {
                x: el?.Sate_AOD,
                y: el?.AERONET_AOD,
              };
            })}
          />
        </Form>
      )}
    </Formik>
  );
};
export default Chart;
