import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../redux/reducers';
import { goToAction } from '../../../../common/redux/reducer';
import ApprovalHeaderCommon from '../../../common/ApprovalHeaderCommon';
import BookingDashboard from '../components/BookingDashboard';
import { IBookingFilter, IBookingDefaultPagination } from '../utils';
import { some } from '../../../../../constants';
import { fakeData } from '../components/dataFake';

const Booking: React.FC = props => {
  const match: any = useRouteMatch();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const getPathNameReplace = (path: string, hotelId: string) => {
    return path.replace(':hotelId', hotelId).replace(':tabValue', match?.params?.tabValue);
  };

  const handleChangeHotel = (hotelId: string) => {
    dispatch(goToAction({ pathname: getPathNameReplace(match?.path, hotelId) }));
    window.location.reload();
  };

  const [loading, setLoading] = React.useState(false);
  const [bookingDataList, setBookingDataList] = React.useState<some>({});
  const [filter, setFilter] = React.useState<IBookingFilter>(IBookingDefaultPagination);

  const fetchData = React.useCallback(async (resultFilter: IBookingFilter) => {
    try {
      // const params: some = {
      //   pageOffset: resultFilter.pageOffset,
      //   pageSize: resultFilter.pageSize,
      // };
      // if (resultFilter && resultFilter.term) {
      //   params.term = resultFilter.term;
      // }
      // const searchStr = querystring.stringify(params);
      // const dataSubmit: some = {
      //   provinceIds: resultFilter.provinceIds,
      //   status: resultFilter.status,
      //   starNumbers: resultFilter.starNumbers,
      // };
      setLoading(true);
      // const res = await dispatch(actionGetApprovalHotel(dataSubmit, searchStr));
      // if (res?.code === SUCCESS_CODE) {
      //   setData(res?.data);
      // }
      setBookingDataList(fakeData.data);

      setLoading(false);
    } catch (error) {}
  }, []);

  React.useEffect(() => {
    fetchData(filter);
  }, [fetchData, filter]);

  return (
    <>
      <ApprovalHeaderCommon handleChangeHotel={values => handleChangeHotel(values)} />
      <BookingDashboard
        loading={loading}
        bookingDataList={bookingDataList}
        setFilter={setFilter}
        filter={filter}
      />
    </>
  );
};

export default Booking;
