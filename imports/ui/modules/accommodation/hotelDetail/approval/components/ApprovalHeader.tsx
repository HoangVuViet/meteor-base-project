import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { GREY_100, CRAYOLA, LIGHT_CRAYOLA } from '../../../../../configs/colors';
import { ReactComponent as LocationIcon } from '../../../../../svg/ic_location.svg';
import { Col, Row } from '../../../../common/components/elements';
import { isEmpty } from '../../../utils';
import ApproveDialog from './ApproveDialog';
import ContractDialog from './ContractDialog';
import RejectDialog from './RejectDialog';
import Link from '../../../../common/components/Link';
import { ROUTES } from '../../../../../configs/routes';
import { ASIDE_ITEM_HEIGHT, ROLES, ASIDE_TOP_HEIGHT } from '../../../../../layout/constants';
import { AppState } from '../../../../../redux/reducers';
import { actionGetHotelDuplicate } from '../../../accommodationService';
import { SUCCESS_CODE } from '../../../../../constants';

const mapStateToProps = (state: AppState) => {
  return {
    roleUser: state.auth.roleUser,
    generalHotelInfo: state.accommodation.generalHotelInfo,
  };
};
interface Props extends ReturnType<typeof mapStateToProps> {}

const ApprovalHeader: React.FC<Props> = props => {
  const match: any = useRouteMatch();
  const { roleUser, generalHotelInfo } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isDuplicate, setIsDuplicate] = React.useState(false);

  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };
  const checkRoleAdmin = React.useMemo(() => {
    return roleUser?.some((v: any) => v.description === ROLES.HMS_PRE_ADMIN);
  }, [roleUser]);

  const fetchHotelDuplicate = async (hotelId: number) => {
    try {
      const res = await dispatch(actionGetHotelDuplicate(hotelId));
      if (res?.code === SUCCESS_CODE) {
        setIsDuplicate(!!(res?.data?.items?.length > 0));
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    generalHotelInfo?.id && fetchHotelDuplicate(generalHotelInfo?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalHotelInfo?.id]);

  return (
    <>
      <Row
        className="header-approval-wrapper"
        style={{
          position: 'sticky',
          top: checkRoleAdmin ? ASIDE_ITEM_HEIGHT + ASIDE_TOP_HEIGHT : ASIDE_ITEM_HEIGHT,
          background: GREY_100,
          zIndex: 1,
          marginBottom: 0,
          paddingBottom: 20,
          paddingTop: 8,
        }}
      >
        <Col style={{ width: '100%' }}>
          <Row>
            <Typography variant="h5" component="p" className="title-header">
              {generalHotelInfo?.name ? (
                generalHotelInfo?.name
              ) : (
                <FormattedMessage id="IDS_HMS_UPDATING" />
              )}
            </Typography>
            {isDuplicate && generalHotelInfo?.approveStatus === 'unapproved' && (
              <div
                style={{
                  borderRadius: 100,
                  backgroundColor: LIGHT_CRAYOLA,
                  height: 32,
                  padding: '6px 12px',
                  marginLeft: 12,
                }}
              >
                <Typography variant="body2" style={{ color: CRAYOLA }}>
                  <FormattedMessage id="IDS_HMS_ACCOMMODATION_IS_DUPLICATE" />
                </Typography>
              </div>
            )}
          </Row>

          {generalHotelInfo?.starRating && (
            <Rating value={generalHotelInfo?.starRating} readOnly size="small" />
          )}
          <Row style={{ display: 'flex' }}>
            <LocationIcon />
            <Typography variant="body2" component="span" style={{ marginLeft: 4 }}>
              {generalHotelInfo?.address || <FormattedMessage id="IDS_HMS_UPDATING" />}
            </Typography>
          </Row>
        </Col>
        {!isEmpty(generalHotelInfo) && (
          <Col style={{ display: 'flex', flexDirection: 'row' }}>
            {generalHotelInfo?.approveStatus === 'approved' ? (
              <>
                <Link to={{ pathname: getPathName(ROUTES.managerHotels.hotelInfo.rate.plan) }}>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    style={{ width: 180, marginLeft: 16 }}
                  >
                    <FormattedMessage id="IDS_HMS_PRICE_AND_ROOM_EMPTY" />
                  </Button>
                </Link>
                <Link
                  to={{ pathname: getPathName(ROUTES.managerHotels.hotelInfo.promotion.listing) }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    fullWidth
                    style={{ width: 220, marginLeft: 16, whiteSpace: 'nowrap' }}
                  >
                    <FormattedMessage id="IDS_HMS_PROMOTIONS" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <ContractDialog />
                <ApproveDialog />
                <RejectDialog />
              </>
            )}
          </Col>
        )}
      </Row>
    </>
  );
};

export default connect(mapStateToProps)(ApprovalHeader);
