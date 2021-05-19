import * as React from 'react';
import StatisticalContent from '../components/StatisticalContent';

interface IStatisticalProps {}

const Statistical: React.FunctionComponent<IStatisticalProps> = (_props) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <StatisticalContent></StatisticalContent>
    </div>
  );
};

export default Statistical;
