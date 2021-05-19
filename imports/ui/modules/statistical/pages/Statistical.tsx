import * as React from 'react';
import { useDispatch } from 'react-redux';
import StatisticalContent from '../components/StatisticalContent';
import { some } from '/imports/ui/constants';
import { setWhere } from '/imports/ui/redux/initReducer';

interface IStatisticalProps {
  position: some;
  address: string;
}

const Statistical: React.FunctionComponent<IStatisticalProps> = (props) => {
  const { position, address } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      setWhere({
        position: position,
        address: address,
      }),
    );
  }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <StatisticalContent></StatisticalContent>
    </div>
  );
};

export default Statistical;
