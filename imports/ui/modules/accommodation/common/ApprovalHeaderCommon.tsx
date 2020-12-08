import { Typography } from '@material-ui/core';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector, connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_600 } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../constants';
import { ROLES } from '../../../layout/constants';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as BackIcon } from '../../../svg/ic_back.svg';
import { ReactComponent as WarningIcon } from '../../../svg/ic_warning.svg';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { Col, Row } from '../../common/components/elements';
import SingleSelect from '../../common/components/SingleSelect';
import { goToAction } from '../../common/redux/reducer';
import { actionGetApprovalHotel } from '../accommodationService';

function mapStateToProps(state: AppState) {
  return { locale: state.intl.locale, roleUser: state.auth.roleUser };
}
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
  handleChangeHotel: (values: string) => void;
}

const ApprovalHeaderCommon: React.FC<Props> = props => {
  const { roleUser, handleChangeHotel } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { generalHotelInfo } = useSelector((state: AppState) => state.accommodation, shallowEqual);

  const [listHotel, setListHotel] = React.useState<some[]>([]);
  const [hotelIdParams, setHotelIdParams] = React.useState(generalHotelInfo?.id);

  const checkRoleAdmin = React.useMemo(() => {
    return roleUser?.some((v: any) => v.description === ROLES.HMS_PRE_ADMIN);
  }, [roleUser]);

  const isApproval = generalHotelInfo?.approveStatus === 'approved';

  const handleBack = () => {
    dispatch(
      goToAction({
        // eslint-disable-next-line no-nested-ternary
        pathname: checkRoleAdmin
          ? isApproval
            ? ROUTES.managerHotels.results.approve
            : ROUTES.managerHotels.results.pending
          : ROUTES.homeDashboard,
      }),
    );
  };

  const fetchListHotel = async () => {
    const hotelParams = {
      isApproved: true,
      pageSize: 1000,
      pageOffset: 0,
    };
    try {
      const res = await dispatch(actionGetApprovalHotel({}, queryString.stringify(hotelParams)));
      if (res?.code === SUCCESS_CODE) {
        setListHotel(res?.data?.items);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchListHotel(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setHotelIdParams(generalHotelInfo?.id);
  }, [generalHotelInfo]);

  return (
    <>
      <div className="hotel-wrapper approval-header" style={{ padding: 0 }}>
        <Row style={{ justifyContent: 'space-between', flex: 1 }}>
          <div className="back-header-container">
            <BackIcon onClick={handleBack} />
            <Typography variant="body2" component="p" className="home-text">
              <FormattedMessage id="IDS_HMS_HOME" />
            </Typography>
            &nbsp;&nbsp;
            {generalHotelInfo?.name && (
              <>
                <span style={{ fontSize: 30, color: GREY_600, marginTop: -16 }}>.</span>
                <Typography variant="body2" component="p" className="home-text">
                  {generalHotelInfo?.name}
                </Typography>
              </>
            )}
          </div>
          {isApproval && !checkRoleAdmin && (
            <Row>
              <Typography variant="body2" style={{ marginBottom: 16, marginRight: 10 }}>
                <FormattedMessage id="IDS_HMS_SELECT_HOTEL" />
              </Typography>
              <SingleSelect
                style={{ width: 438 }}
                value={hotelIdParams || null}
                options={listHotel}
                onSelectOption={(value: string) => setHotelIdParams(value)}
              />
            </Row>
          )}
        </Row>
      </div>
      <ConfirmDialog
        open={hotelIdParams && hotelIdParams !== generalHotelInfo?.id}
        onAccept={() => handleChangeHotel(hotelIdParams)}
        onClose={() => setHotelIdParams(generalHotelInfo?.id)}
        maxWidth="sm"
      >
        <Col style={{ alignItems: 'center' }}>
          <div className="dialog-content" style={{ textAlign: 'center' }}>
            <WarningIcon style={{ margin: '0 auto', marginTop: 36, marginBottom: 16 }} />
            <Row style={{ flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_SELECT_HOTEL_DIALOG_CONTENT1" />
              </Typography>
              &nbsp;
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {listHotel.find(v => v.id === generalHotelInfo?.id)?.name}
              </Typography>
              &nbsp;
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_SELECT_HOTEL_DIALOG_CONTENT2" />
              </Typography>
              &nbsp;
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {listHotel.find(v => v.id === hotelIdParams)?.name}
              </Typography>
              &nbsp;
            </Row>
          </div>
        </Col>
      </ConfirmDialog>
    </>
  );
};

export default connect(mapStateToProps)(ApprovalHeaderCommon);
