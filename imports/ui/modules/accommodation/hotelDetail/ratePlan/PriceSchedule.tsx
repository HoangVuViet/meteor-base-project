import React from 'react';
import moment, { Moment } from 'moment';
import { Button, Typography } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Row } from '../../../common/components/elements';
import './RatePlan.scss';
import SingleSelect from '../../../common/components/SingleSelect';
import { VIEWS } from '../../constant';
import Calendar from './components/calendar/Calendar';
import DateRangeFormControl from '../../../common/components/DateRangeFormControl';
import Schedule from './components/schedule/Schedule';
import { AppState } from '../../../../redux/reducers';
import { updateCalendarView } from '../../redux/accommodationReducer';

const PriceSchedule: React.FunctionComponent = props => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { isCalendar } = useSelector((state: AppState) => state.accommodation, shallowEqual);
  const [startDate, setStartDate] = React.useState<Moment>(moment());
  const [endDate, setEndDate] = React.useState<Moment>(
    moment()
      .add(1, 'M')
      .endOf('month'),
  );
  const outsideRange = (e: Moment, start?: Moment) =>
    start
      ? start.startOf('day').isAfter(e)
      : moment()
          .startOf('day')
          .isAfter(e);

  return (
    <>
      <Row className="header-approval-wrapper" style={{ marginBottom: 0 }}>
        {!isCalendar ? (
          <Row style={{ width: '100%' }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              style={{ marginBottom: 20, marginRight: 20 }}
            >
              <FormattedMessage id="IDS_HMS_SETUP_RANGE" />
            </Typography>
            <DateRangeFormControl
              style={{ marginRight: 10, minWidth: 278 }}
              optional
              onChange={(start, end) => {
                if (start) setStartDate(start.isBefore(moment(), 'days') ? moment() : start);
                if (end) setEndDate(end.isBefore(moment(), 'days') ? moment() : end);
              }}
              startDate={startDate}
              endDate={endDate}
              isOutsideRange={outsideRange}
            />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disableElevation
              style={{ marginBottom: 20, minWidth: 90, marginLeft: 16 }}
            >
              <FormattedMessage id="IDS_HMS_SHOW" />
            </Button>
          </Row>
        ) : (
          <Row style={{ width: '100%' }} />
        )}
        <Row style={{ alignItems: 'center' }}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="p"
            style={{ width: 90, marginRight: 12, marginBottom: 20 }}
          >
            <FormattedMessage id="IDS_HMS_VIEW_TYPE" />
          </Typography>
          <SingleSelect
            label=""
            value={isCalendar ? 1 : 0}
            style={{ width: 200 }}
            formControlStyle={{ minWidth: 200, width: 200, marginRight: 0 }}
            options={VIEWS}
            onSelectOption={(value: number) => dispatch(updateCalendarView(value === 1))}
            optional
            getOptionLabel={v => intl.formatMessage({ id: v.name })}
          />
        </Row>
      </Row>
      {isCalendar ? <Calendar /> : <Schedule startTime={startDate} endTime={endDate} />}
    </>
  );
};

export default PriceSchedule;
