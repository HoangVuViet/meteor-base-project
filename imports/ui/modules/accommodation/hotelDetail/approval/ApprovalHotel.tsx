import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { APPROVAL_HOTEL_TABS } from '../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { goToAction } from '../../../common/redux/reducer';
import ApprovalHeaderCommon from '../../common/ApprovalHeaderCommon';
import TabsMenu from '../../common/TabsMenu';
import './Approval.scss';
import ApprovalHeader from './components/ApprovalHeader';
import { actionsGetHotelGeneralInfo } from '../../accommodationService';
import { setGeneralHotelInfo } from '../../redux/accommodationReducer';

const ApprovalHotel: React.FC = props => {
  const match: any = useRouteMatch();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [generalInfo, setGeneral] = useState<some>({});

  const fetchData = async () => {
    try {
      const { data, code } = await dispatch(actionsGetHotelGeneralInfo(match?.params?.hotelId));
      dispatch(setGeneralHotelInfo(data));
      if (code === SUCCESS_CODE) setGeneral(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);
  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };
  const getPathNameReplace = (path: string, hotelId: string) => {
    return path.replace(':hotelId', hotelId).replace(':tabValue', match?.params?.tabValue);
  };

  const handleChangeHotel = (hotelId: string) => {
    dispatch(goToAction({ pathname: getPathNameReplace(match?.path, hotelId) }));
    window.location.reload();
  };
  const getTabMenu = () => {
    if (generalInfo?.approveStatus === 'approved') return APPROVAL_HOTEL_TABS;
    return APPROVAL_HOTEL_TABS.filter(v => v?.name !== 'IDS_HMS_CONTRACT');
  };
  return (
    <>
      <ApprovalHeaderCommon handleChangeHotel={values => handleChangeHotel(values)} />
      <ApprovalHeader />
      <TabsMenu
        data={getTabMenu().map(v => {
          if (v.path) return { ...v, directPath: getPathName(v.path) };
          return v;
        })}
      />
    </>
  );
};

export default ApprovalHotel;
