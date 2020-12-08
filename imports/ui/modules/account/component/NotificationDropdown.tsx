import { Button, Collapse, IconButton, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
// import { useSnackbar } from 'notistack';
import { BLUE, GREY_300, PRIMARY, SECONDARY, WHITE } from '../../../configs/colors';
import { some } from '../../../constants';
import { HEADER_HEIGHT } from '../../../layout/constants';
import { ReactComponent as IconBellBlack } from '../../../svg/ic_notification.svg';
import { Row } from '../../common/components/elements';
import LoadingIcon from '../../common/components/LoadingIcon';
import { fakeNotification, fakeNotificationDialog } from '../constant';
import NotificationCard from './NotificationCard';
import NotificationDialog from './NotificationDialog';
import { AppState } from '../../../redux/reducers';
// import { fetchThunk } from '../../common/redux/thunk';
// import { API_PATHS } from '../../../configs/API';
// import { sendTokenToServer } from '../../auth/redux/authThunks';
// import { messaging } from '../../../service/firebase';

interface Props {}

const NotificationDropdown: React.FunctionComponent<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = React.useState<some | undefined>(undefined);
  const [isFocus, setFocus] = React.useState(false);
  const [detail, setDetail] = React.useState<some | undefined>(undefined);

  const fetchNotification = React.useCallback(() => {
    setData(fakeNotification.data);
  }, []);

  React.useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  const loadMore = React.useCallback(() => {
    // addMoreNotification();
  }, []);

  const seeAll = React.useCallback(async () => {
    // dispatch(readAllNotification());
  }, []);

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.relatedTarget instanceof Element) {
        if (e.currentTarget.contains(e.relatedTarget as Element)) {
        }
      }
      !detail && setFocus(false);
    },
    [detail],
  );
  React.useEffect(() => {
    // dispatch(sendTokenToServer());
  }, [dispatch]);

  React.useEffect(() => {}, []);

  return (
    <div
      tabIndex={-1}
      onBlur={onBlur}
      style={{
        outline: 'none',
        margin: '0px 32px 0px 24px',
      }}
    >
      <IconButton
        style={{
          padding: 0,
          marginRight: '10px',
          position: 'relative',
          background: PRIMARY,
        }}
        onClick={() => {
          setFocus(!isFocus);
        }}
      >
        <IconBellBlack />
        {data && data.numberNotiUnread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: -2,
              background: SECONDARY,
              fontSize: '10px',
              color: 'white',
              width: '12px',
              height: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              border: `1px solid ${WHITE}`,
            }}
          >
            {/* {data.numberNotiUnread > 50 ? '50+' : data.numberNotiUnread} */}
          </span>
        )}
      </IconButton>
      {data && (
        <Collapse
          in={isFocus}
          unmountOnExit
          style={{
            position: 'absolute',
            width: '424px',
            zIndex: 1400,
            top: HEADER_HEIGHT,
            right: 0,
          }}
        >
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 400px)',
            }}
            variant="outlined"
          >
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 18px',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${GREY_300}`,
              }}
            >
              <Typography variant="h6">
                <FormattedMessage id="notification" />
              </Typography>
              {data.numberNotiUnread > 0 && (
                <Button variant="text" style={{ padding: '4px' }} onClick={seeAll}>
                  <Typography variant="body2" style={{ color: BLUE }}>
                    <FormattedMessage id="markReadAll" values={{ num: data.numberNotiUnread }} />
                  </Typography>
                </Button>
              )}
            </Row>
            <PerfectScrollbar options={{ wheelPropagation: false }} style={{ flex: 1 }}>
              {data.notificationList?.length > 0 ? (
                <InfiniteScroll
                  pageStart={1}
                  initialLoad={false}
                  loadMore={loadMore}
                  hasMore={data.notificationList?.length < data.total}
                  loader={
                    <LoadingIcon
                      key="loader"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  }
                  useWindow={false}
                >
                  <div>
                    {data.notificationList.map((v: some, index: number) => (
                      <NotificationCard
                        key={v.id}
                        data={v}
                        onClick={() => {
                          setDetail(fakeNotificationDialog);
                        }}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                />
              )}
            </PerfectScrollbar>
            <div
              style={{
                height: '42px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderTop: `1px solid ${GREY_300}`,
              }}
            >
              {data.notificationList?.length > 0 && (
                // <Link to={{ pathname: ROUTES.management, search: getLink() }}>
                <Button variant="text" style={{ padding: '4px', color: BLUE }}>
                  <Typography variant="body2">
                    <FormattedMessage id="seeAll" />
                  </Typography>
                </Button>
                // </Link>
              )}
            </div>
          </Paper>
        </Collapse>
      )}
      <NotificationDialog data={detail} onClose={() => setDetail(undefined)} />
    </div>
  );
};

export default NotificationDropdown;
