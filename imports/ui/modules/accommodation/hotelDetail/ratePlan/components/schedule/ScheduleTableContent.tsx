import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styled from 'styled-components';
import { Moment } from 'moment';
import { Typography } from '@material-ui/core';
import { Col, Row } from '../../../../../common/components/elements';
import {
  BLUE_500,
  GREY_100,
  GREY_400,
  GREY_600,
  GREY_900,
  RED,
  TEAL,
  WHITE,
} from '../../../../../../configs/colors';
import SingleSelect from '../../../../../common/components/SingleSelect';
import ScheduleCell from './ScheduleCell';
import { some } from '../../../../../../constants';
import { checkRole, isEmpty } from '../../../../utils';
import { ReactComponent as IconPerson } from '../../../../../../svg/ic_person.svg';
import { ReactComponent as IconArrowRight } from '../../../../../../svg/ic_arrow_right.svg';
import SetupPriceDialog from './SetupPriceDialog';
import ScheduleDrag from './ScheduleDrag';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { ROLES } from '../../../../../../layout/constants';
import { AppState } from '../../../../../../redux/reducers';

const Head = styled.td`
  height: 30px;
  text-align: center;
  width: 132px;
`;

const Cell = styled.td`
  height: 0.5px;
  box-sizing: border-box;
  padding: 0px;
  user-select: none;
`;
interface Props {
  endTime: Moment;
  dayData: Moment[];
  roomData: some;
  roomItem: some;
  roomIdx: number;
  rateTypes: some;
  updateRateType: (val: number, id: number) => void;
  fetchData: () => void;
}
let left = 0;
const ScheduleTableContent: React.FC<Props> = props => {
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);
  const intl = useIntl();
  const { dayData, roomItem, roomIdx, rateTypes, endTime, roomData } = props;
  const isAdmin = checkRole(ROLES.HMS_PRE_ADMIN, roleUser);
  const [collapse, setCollapse] = React.useState<number[]>([]);
  const [rateSelected, setRateSelected] = React.useState<some | null>(null);
  const [scrollLeft, setScrollLeft] = React.useState<boolean>(false);
  const roomId = roomItem?.room?.id;
  const standardAdult: number = roomItem?.room?.standardAdult || 0;

  const handleScroll = (isLeft: boolean) => {
    const scheduleWrapper: any = document.querySelector('.schedule-container');
    if (scheduleWrapper) {
      if (isLeft) {
        left -= 200;
        if (left <= 0 && scrollLeft) setScrollLeft(false);
        scheduleWrapper.scrollTo({
          left: left - 200,
          behavior: 'smooth',
        });
      } else {
        left += 200;
        if (left > 0 && !scrollLeft) setScrollLeft(true);
        scheduleWrapper.scrollTo({
          left: left + 200,
          behavior: 'smooth',
        });
      }
    }
  };
  return (
    <>
      <table
        style={{ borderCollapse: 'collapse', paddingTop: 10, overflow: 'auto' }}
        draggable={false}
      >
        {roomIdx === 0 && (
          <thead>
            <tr>
              <td colSpan={4} />
              {dayData.map((v, index) => {
                const isFirstMonth = v.date() === 1 || index === 0;
                const isCannotView = v.isAfter(endTime);
                return (
                  <td style={{ borderLeft: isFirstMonth ? `0.5px solid ${GREY_400}` : undefined }}>
                    {isFirstMonth && (
                      <div
                        style={{
                          display: 'flex',
                          padding: '8px 0 8px 8px',
                          alignItems: 'center',
                          color: !isCannotView ? GREY_900 : GREY_400,
                        }}
                      >
                        <Typography variant="subtitle2" style={{ userSelect: 'none' }}>
                          <FormattedMessage
                            id="IDS_HMS_MONTH"
                            values={{ month: !isEmpty(dayData) && dayData[index].format('MM') }}
                          />
                        </Typography>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr
              style={{
                background: WHITE,
                maxWidth: 132,
                userSelect: 'none',
                position: 'relative',
              }}
            >
              <Head
                style={{
                  borderBottom: `0.5px solid ${GREY_400}`,
                  paddingRight: 4,
                  fontSize: 12,
                  lineHeight: '18px',
                  color: GREY_400,
                  minWidth: 200,
                  maxWidth: 200,
                }}
                colSpan={4}
              />
              {dayData.map((v, index) => {
                const isSunday = v.format('dd').replace('T', '') === 'CN';
                const isSaturday = v.format('dd').replace('T', '') === '7';
                const isCannotView = v.isAfter(endTime);
                return (
                  <Head
                    key={index}
                    style={{
                      border: `0.5px solid ${GREY_400}`,
                      borderTop: 'none',
                      borderRight: `0.5px solid ${isSunday && !isCannotView ? GREY_900 : GREY_400}`,
                      paddingRight: 4,
                      fontSize: 12,
                      lineHeight: '18px',
                      color: (isSunday || isSaturday) && !isCannotView ? GREY_900 : GREY_400,
                      opacity: isCannotView ? 0.5 : 1,
                    }}
                  >
                    <Typography variant="body2" style={{ textAlign: 'right' }}>
                      {isSunday ? (
                        <FormattedMessage id="IDS_HMS_SUNDAY" />
                      ) : (
                        <FormattedMessage
                          id="IDS_HMS_DAY_IN_WEEK"
                          values={{ day: dayData[index].format('dd').replace('T', '') }}
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'right', color: GREY_900 }}>
                      {dayData[index].date()}
                    </Typography>
                  </Head>
                );
              })}
              {scrollLeft && (
                <td style={{ display: 'flex' }}>
                  <IconArrowRight
                    className="svgFilAll arrow-schedule left"
                    onClick={() => handleScroll(true)}
                  />
                </td>
              )}
              <td style={{ display: 'flex' }}>
                <IconArrowRight
                  className="svgFilAll arrow-schedule right"
                  onClick={() => handleScroll(false)}
                />
              </td>
            </tr>
          </thead>
        )}
        <thead>
          <tr>
            <td colSpan={4} style={{ minWidth: 200, maxWidth: 200 }}>
              <Typography
                variant="subtitle2"
                component="p"
                style={{
                  color: TEAL,
                  marginBottom: 8,
                  marginLeft: 12,
                  marginRight: -2,
                  borderRight: `0.5px solid ${GREY_400}`,
                }}
              >
                {roomItem?.room?.name}
              </Typography>
            </td>
            <td colSpan={15} style={{ position: 'sticky', left: 200 }}>
              {!isEmpty(roomItem?.rateTypes) ? (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginTop: 12,
                    opacity: isAdmin ? 1 : 0,
                    pointerEvents: !isAdmin ? 'none' : undefined,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    style={{ width: 106, marginRight: 12, marginBottom: 20, marginLeft: 12 }}
                  >
                    <FormattedMessage id="IDS_HMS_RATE_TYPE_PLACEHOLDER" />
                  </Typography>
                  <SingleSelect
                    label=""
                    value={rateTypes[roomId]}
                    disableCloseIcon
                    style={{ width: 278 }}
                    formControlStyle={{ minWidth: 278, width: 278, marginRight: 0 }}
                    options={roomItem?.rateTypes}
                    onSelectOption={(value: number) => props.updateRateType(value, roomId)}
                    optional
                    getOptionLabel={v => intl.formatMessage({ id: v.name })}
                  />
                </div>
              ) : (
                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  style={{ width: '100%', marginRight: 12, color: RED, marginLeft: 12 }}
                >
                  <FormattedMessage id="IDS_HMS_EMPTY_RATE_PLAN" />
                </Typography>
              )}
            </td>
            <td colSpan={4} style={{ position: 'sticky', left: 1300 }}>
              <Typography
                gutterBottom
                variant="body2"
                component="p"
                style={{ width: '100%', marginRight: 12, textAlign: 'right' }}
              >
                <FormattedMessage id="IDS_HMS_EMPTY_ROOM_MAX" />: {roomItem?.room?.totalRoom || 0}
              </Typography>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td
              colSpan={4}
              style={{ borderBottom: `0.5px solid ${GREY_400}`, minWidth: 200, maxWidth: 200 }}
            />
            <Cell draggable={false} style={{ background: GREY_100 }} />
          </tr>
        </tbody>

        {!isEmpty(roomItem?.rateTypes) && (
          <tbody>
            <tr>
              <td
                colSpan={4}
                style={{ borderBottom: `0.5px solid ${GREY_400}`, minWidth: 200, maxWidth: 200 }}
              >
                <Typography variant="subtitle2" component="p" style={{ marginLeft: 12 }}>
                  <FormattedMessage id="IDS_HMS_SELL_STATUS" />
                </Typography>
              </td>
              <ScheduleDrag
                roomItem={roomItem}
                endTime={endTime}
                dayData={dayData}
                rowType="status"
                roomData={roomData}
                rateTypes={rateTypes}
                fetchData={props?.fetchData}
              />
            </tr>
          </tbody>
        )}
        <tbody>
          <tr>
            <td
              colSpan={4}
              style={{ borderBottom: `0.5px solid ${GREY_400}`, minWidth: 200, maxWidth: 200 }}
            >
              {!isEmpty(roomItem?.rateTypes) && (
                <Typography variant="subtitle2" component="p" style={{ marginLeft: 12 }}>
                  <FormattedMessage id="IDS_HMS_EMPTY_ROOM_NUMBER" />
                </Typography>
              )}
            </td>
            <ScheduleDrag
              roomItem={roomItem}
              endTime={endTime}
              dayData={dayData}
              rowType="room"
              roomData={roomData}
              rateTypes={rateTypes}
              fetchData={props?.fetchData}
            />
          </tr>
        </tbody>

        {!isEmpty(roomItem?.ratePlans) &&
          !isEmpty(roomItem?.rateTypes) &&
          roomItem?.ratePlans
            .filter((v: some) => v?.rateTypeId === rateTypes[roomId])
            .map((rateItem: some, idx: number) => (
              <>
                <tbody key={rateItem?.id}>
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        borderBottom: `0.5px solid ${GREY_400}`,
                        minWidth: 200,
                        maxWidth: 200,
                      }}
                    >
                      <Col>
                        <Row>
                          <ArrowDropDownIcon
                            onClick={() => {
                              const temp = collapse.includes(rateItem?.id)
                                ? collapse.filter(v => v !== rateItem?.id)
                                : [...collapse, rateItem?.id];
                              setCollapse(temp);
                            }}
                            style={{
                              transform: collapse.includes(rateItem?.id)
                                ? 'rotate(180deg)'
                                : undefined,
                              cursor: 'pointer',
                            }}
                          />
                          <Typography variant="subtitle2" component="p">
                            {rateItem?.name}
                          </Typography>
                        </Row>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          className="sub-item"
                          onClick={() => {
                            if (!rateItem?.basedAnotherRatePlan) setRateSelected(rateItem);
                          }}
                          style={{
                            color: !rateItem?.basedAnotherRatePlan ? BLUE_500 : undefined,
                            cursor: !rateItem?.basedAnotherRatePlan ? 'pointer' : 'not-allowed',
                            opacity: !rateItem?.basedAnotherRatePlan ? 1 : 0.6,
                          }}
                        >
                          <IconPerson
                            className="svgFillAll"
                            style={{ fill: !rateItem?.basedAnotherRatePlan ? BLUE_500 : GREY_900 }}
                          />
                          &nbsp;x
                          {standardAdult}&nbsp;
                          <FormattedMessage id="ratePackage.update" />
                        </Typography>
                      </Col>
                    </td>
                    <ScheduleDrag
                      roomItem={roomItem}
                      endTime={endTime}
                      dayData={dayData}
                      rowType="rate"
                      roomData={roomData}
                      rateTypes={rateTypes}
                      rateItem={rateItem}
                      fetchData={props?.fetchData}
                    />
                  </tr>
                </tbody>
                {collapse.includes(rateItem?.id) && (
                  <tbody key={`${rateItem?.id}_${idx}`}>
                    {Array(standardAdult > 0 ? standardAdult - 1 : 0)
                      .fill(0)
                      .map((v: any, i: number) => {
                        return (
                          <tr key={i}>
                            <td
                              colSpan={4}
                              style={{
                                borderBottom: `0.5px solid ${GREY_400}`,
                                minWidth: 200,
                                maxWidth: 200,
                              }}
                            >
                              <Typography variant="subtitle2" component="p" className="sub-item">
                                <IconPerson className="svgFillAll" style={{ fill: GREY_600 }} />{' '}
                                &nbsp;x{standardAdult - 1 - i}
                              </Typography>
                            </td>
                            {dayData.map((cell: Moment, cellIndex: number) => {
                              const prices = rateItem?.prices[standardAdult - 1 - i];
                              const priceDay = prices[cell.format(DATE_FORMAT_BACK_END)];
                              const priceCell = priceDay?.price || null;
                              return (
                                <ScheduleCell
                                  key={cellIndex}
                                  price={priceCell}
                                  isCannotView={cell.isAfter(endTime)}
                                />
                              );
                            })}
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </>
            ))}
      </table>
      {!isEmpty(rateSelected) && (
        <SetupPriceDialog
          fetchData={props?.fetchData}
          handleClose={() => setRateSelected(null)}
          standardAdult={standardAdult}
          rateSelected={rateSelected}
        />
      )}
    </>
  );
};

export default React.memo(ScheduleTableContent);
