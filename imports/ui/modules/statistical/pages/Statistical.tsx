import * as React from 'react';
import { useDispatch } from 'react-redux';
import StatisticalContent from '../components/StatisticalContent';
import { some } from '/imports/ui/constants';
import { setWhere } from '/imports/ui/redux/initReducer';

interface IStatisticalProps {
  position: some;
  address: string;
  progress: number;
}

const Statistical: React.FunctionComponent<IStatisticalProps> = (props) => {
  const { position, address, progress } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      setWhere({
        position: position,
        address: address,
        progress: progress,
      }),
    );
  }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <StatisticalContent />
    </div>
  );
};

export default Statistical;
