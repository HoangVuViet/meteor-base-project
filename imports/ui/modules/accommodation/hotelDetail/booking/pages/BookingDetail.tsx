import React from 'react';
import { some } from '../../../../../constants';
import BookingDetailContent from '../components/BookingDetailContent';
import { fakeDetailData } from '../components/dataDetailFake';

const BookingDetail: React.FC = props => {
  // const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // const match: any = useRouteMatch();
  const [loading, setLoading] = React.useState(false);

  const [bookingDetail, setBookingDetail] = React.useState<some>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setBookingDetail(fakeDetailData.data);
      setLoading(false);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return <BookingDetailContent bookingDetailData={bookingDetail} loading={loading} />;
};

export default BookingDetail;
