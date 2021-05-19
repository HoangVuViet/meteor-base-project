import * as React from 'react';
import StatisticalContent from '../components/StatisticalContent';
import { some } from '/imports/ui/constants';

interface IStatisticalProps {
  position: some;
  address: string;
}

const Statistical: React.FunctionComponent<IStatisticalProps> = (props) => {
  const { position, address } = props;
  console.log('position', position);
  return (
    <div style={{ marginBottom: 20 }}>
      <StatisticalContent></StatisticalContent>
    </div>
  );
};

export default Statistical;
