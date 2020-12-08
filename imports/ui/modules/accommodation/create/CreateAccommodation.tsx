/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HOTEL_CREATE_TABS, ROUTES } from '../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import MiniSideBar from '../../common/components/MiniSideBar';
import { getProgressBar } from '../accommodationService';
import CreateHeader from '../common/CreateHeader';

const CreateAccommodation: React.FC = props => {
  const match: any = useRouteMatch();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [progressBar, setProgressBar] = React.useState<some | undefined>(undefined);
  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };
  const location = useLocation();

  const getRoomHotelCategories = async () => {
    try {
      const { data, code } = await dispatch(getProgressBar(match?.params?.hotelId));
      if (code === SUCCESS_CODE) {
        setProgressBar(data);
      }
    } catch (error) {
    } finally {
    }
  };

  const progressBarKey = React.useMemo(() => progressBar && Object.keys(progressBar), [
    progressBar,
  ]);

  const setUpRoutes = React.useMemo(() => {
    return HOTEL_CREATE_TABS.map((v: any) => {
      return {
        ...v,
        isDone:
          v.path === ROUTES.managerHotels.createHotel.nearBy ||
          progressBar?.[
            progressBarKey?.find(one =>
              one.toLowerCase().includes(
                v.path
                  ?.replace('/managerHotels/createHotel/', '')
                  .replace('/:hotelId', '')
                  .toLowerCase(),
              ),
            ) || ''
          ],
      };
    });
  }, [progressBarKey]);

  React.useEffect(() => {
    getRoomHotelCategories();
  }, [location.pathname]);

  return (
    <>
      <CreateHeader />
      <MiniSideBar
        data={setUpRoutes.map(v => {
          if (v.path) return { ...v, directPath: getPathName(v.path) };
          return v;
        })}
        progressPercent={progressBar?.percent}
      />
    </>
  );
};

export default CreateAccommodation;
