import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_600, RED, TEAL } from '../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { Col, snackbarSetting } from '../../../../common/components/elements';
import { actionDeleteRatePlan, actionUpdateRatePlan } from '../../../accommodationService';
import { CUSTOMER, serviceAttached } from '../../../constant';
import { isEmpty } from '../../../utils';
import DeleteRateDialog from './DeleteRateDialog';

interface RatePlanProps {
  item: some;
  handleFetchData: () => void;
  setRatePlanID: (value: number | undefined) => void;
}

const RatePlanItem: React.FC<RatePlanProps> = props => {
  const { item, setRatePlanID } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const match: any = useRouteMatch();
  const [isDelete, setDelete] = useState<boolean>(false);

  const getCustomer = () => {
    if (isEmpty(item?.customerTypes)) return '-';
    if (item?.customerTypes.length === 4) return <FormattedMessage id="IDS_HMS_ALL_CUSTOMER" />;
    const result: Array<string> = [];
    item?.customerTypes.forEach((el: string) => {
      result.push(intl.formatMessage({ id: CUSTOMER[el] }));
    });
    return result.join(', ');
  };

  const handleResponse = (res: any) => {
    if (res?.code === SUCCESS_CODE) {
      props.handleFetchData();
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
      );
    } else {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };
  const handleDelete = async () => {
    try {
      const res = await dispatch(actionDeleteRatePlan(match?.params?.hotelId, item?.id));
      handleResponse(res);
      setDelete(false);
    } catch (error) {}
  };
  const handleActive = async () => {
    try {
      const res = await dispatch(
        actionUpdateRatePlan(match?.params?.hotelId, { id: item?.id, active: !item?.active }),
      );
      handleResponse(res);
    } catch (error) {}
  };
  const getServiceAttached = () => {
    const result: Array<any> = [];
    if (item?.amenityIds)
      item?.amenityIds.map((el: number, idx: number) => {
        result.push(serviceAttached.find(element => element.id === el));
      });
    return result;
  };

  return (
    <>
      <Accordion
        style={{ marginBottom: 16, marginTop: 0, borderRadius: 12 }}
        className="rate-plan-item"
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                {item?.name}
              </Typography>
              <Typography
                variant="subtitle2"
                component="p"
                style={{ color: item?.active ? TEAL : RED }}
              >
                <FormattedMessage id={item?.active ? 'active' : 'inactivate'} />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_RATE_TYPE" />
              </Typography>
              <Typography variant="subtitle2" component="p">
                {item?.rateType?.name || '-'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_CREATED_DATE" />
              </Typography>
              <Typography variant="subtitle2" component="p">
                {!isEmpty(item?.audit) ? item?.audit?.createdTime : '-'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_CREATE_BY" />
              </Typography>
              <Typography variant="subtitle2" component="p">
                {!isEmpty(item?.audit) ? item?.audit?.createdByName : '-'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_REVENUE_LINE" />
              </Typography>
              <Typography variant="subtitle2" component="p">
                -
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="rate-content">
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_ROOM_TYPE" />
              </Typography>
              {isEmpty(item?.rooms)
                ? '-'
                : item?.rooms.map((el: some, idx: number) => (
                    <Typography variant="subtitle2" component="p" key={idx}>
                      {el?.name}
                    </Typography>
                  ))}
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_SERVICE" />
              </Typography>
              {getServiceAttached().length > 0 &&
                getServiceAttached().map((el: any, idx: number) => (
                  <Typography key={idx} variant="subtitle2" style={{ listStyleType: 'none' }}>
                    <FormattedMessage id={el.name} />
                  </Typography>
                ))}
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="IDS_HMS_APP" />
              </Typography>
              <Typography variant="subtitle2" component="p">
                {getCustomer()}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" component="p" style={{ color: GREY_600 }}>
                <FormattedMessage id="managerHotels.hotelInfo.policy" />
              </Typography>
              <Col>
                {item?.basedCancellationPolicy ? (
                  <>
                    <Typography variant="subtitle2" component="p">
                      <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_POLICY_DEFAULT_APPLIED" />
                    </Typography>
                    {item?.cutoffDay ? (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_ORDER_OPTION_1" />
                        &nbsp;
                        {item?.cutoffDay}
                        &nbsp;
                        <FormattedMessage id="IDS_HMS_DAY" />
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_NOT_ORDER" />
                      </Typography>
                    )}
                    {item?.minStaying && (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_ORDER_OPTION_2" />
                        &nbsp;
                        {item?.minStaying}
                        &nbsp;
                        <FormattedMessage id="IDS_HMS_NIGHT" />
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    {item?.cancellationPolicy?.allowCancel ? (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_GENERAL_CANCEL" />
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_GENERAL_NOT_REFUND" />
                      </Typography>
                    )}
                    {item?.cutoffDay ? (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_ORDER_OPTION_1" />
                        &nbsp;
                        {item?.cutoffDay}
                        &nbsp;
                        <FormattedMessage id="IDS_HMS_DAY" />
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_NOT_ORDER" />
                      </Typography>
                    )}
                    {item?.minStaying && (
                      <Typography variant="subtitle2" component="p">
                        <FormattedMessage id="IDS_HMS_RATE_PLAN_ROOM_ORDER_OPTION_2" />
                        &nbsp;
                        {item?.minStaying}
                        &nbsp;
                        <FormattedMessage id="IDS_HMS_NIGHT" />
                      </Typography>
                    )}
                  </>
                )}
              </Col>
            </Grid>
            <Grid item xs={3}>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                className="active-btn"
                onClick={handleActive}
              >
                <FormattedMessage id={item?.active ? 'IDS_HMS_DEACTIVE' : 'enable'} />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                className="active-btn"
                onClick={() => setRatePlanID(item?.id)}
              >
                <FormattedMessage id="accManagement.edit" />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                className="delete-btn"
                onClick={() => setDelete(true)}
              >
                <FormattedMessage id="IDS_HMS_DELETE" />
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {isDelete && (
        <DeleteRateDialog handleSubmit={handleDelete} handleClose={() => setDelete(false)} />
      )}
    </>
  );
};

export default React.memo(RatePlanItem);
