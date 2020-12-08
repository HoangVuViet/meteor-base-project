import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { actionsGetHotelGeneralInfo } from '../../../accommodationService';
import HotelDashboardDesktop from '../components/HotelDashboardDesktop';

interface Props {}
const HotelDashboard: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const [generalInfo, setGeneral] = React.useState<any>();

  const fetchData = async () => {
    try {
      const { data, code } = await dispatch(actionsGetHotelGeneralInfo(match?.params?.hotelId));
      if (code === SUCCESS_CODE) setGeneral(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  return <HotelDashboardDesktop generalInfo={generalInfo} />;
};

export default HotelDashboard;
