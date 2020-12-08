import { Collapse, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { BLUE_500, TEAL } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { ROLES } from '../../../../../../layout/constants';
import { AppState } from '../../../../../../redux/reducers';
import { ReactComponent as BedIcon } from '../../../../../../svg/ic_bed.svg';
import { ReactComponent as BedSingleIcon } from '../../../../../../svg/ic_bed_single.svg';
import { ReactComponent as BillIcon } from '../../../../../../svg/ic_bill.svg';
import { ReactComponent as ClockIcon } from '../../../../../../svg/ic_clock.svg';
import { ReactComponent as DoorIcon } from '../../../../../../svg/ic_door.svg';
import { ReactComponent as KidIcon } from '../../../../../../svg/ic_kid.svg';
import { ReactComponent as NightIcon } from '../../../../../../svg/ic_night.svg';
import { ReactComponent as PersonIcon } from '../../../../../../svg/ic_person.svg';
import { ReactComponent as PolicyIcon } from '../../../../../../svg/ic_policy.svg';
import { ReactComponent as ReceptionIcon } from '../../../../../../svg/ic_reception.svg';
import { ReactComponent as SettingActiveIcon } from '../../../../../../svg/ic_setting_active.svg';
import { Col, Row } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../../common/FieldContent';
import { CUSTOMER_TYPES } from '../../../../constant';
import { checkRole, ICheckBox, isEmpty } from '../../../../utils';
import BasedAnotherRate from './BasedAnotherRate';
import NewRateDialogCheckBoxes from './NewRateDialogCheckBoxes';
import NewRateDialogRadioGroup from './NewRateDialogRadioGroup';
import NewRateRefundPolicy from './NewRateRefundPolicy';
import NewRateRushHour from './NewRateRushHour';
import NewRateSurchargePolicy from './NewRateSurchargePolicy';

interface Props {
  rateTypes?: some;
  values: some;
  refundFields: some[];
  setRefundFields(values: some): void;
  childrenFields: some[];
  setChildrenFields(values: some): void;
  rateTypesList: some;
  listRooms: some[];
  rushHourFields: some[];
  setRushHourFields: (value: some[]) => void;
  checkBoxList: ICheckBox;
  setCheckBoxList: (value: ICheckBox) => void;
  ratePlanDetail?: some;
  ratePlanID?: number;
  listAmenities: some;
}
const NewRateDialogContent: React.FC<Props> = props => {
  const {
    values,
    rateTypes,
    refundFields,
    setRefundFields,
    childrenFields,
    setChildrenFields,
    rateTypesList,
    listRooms,
    rushHourFields,
    setRushHourFields,
    checkBoxList,
    setCheckBoxList,
    ratePlanDetail,
    ratePlanID,
    listAmenities,
  } = props;

  const intl = useIntl();
  const { setFieldValue, setValues } = useFormikContext();
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);

  const handleChange = (checkBoxData: some, type: string, value: boolean) => {
    if (type === 'roomsTypes') {
      let temp = [...checkBoxList.roomsTypes];
      if (value) temp.push(checkBoxData);
      else temp = temp.filter(item => item.id !== checkBoxData.id);
      setCheckBoxList({ ...checkBoxList, roomsTypes: [...temp] });
    } else if (type === 'customerTypes') {
      let temp = [...checkBoxList.customerTypes];
      if (value) temp.push(checkBoxData);
      else temp = temp.filter(item => item.id !== checkBoxData.id);
      setCheckBoxList({ ...checkBoxList, customerTypes: [...temp] });
    } else if (type === 'platformTypes') {
      let temp = [...checkBoxList.platformTypes];
      if (value) temp.push(checkBoxData);
      else temp = temp.filter(item => item.id !== checkBoxData.id);
      setCheckBoxList({ ...checkBoxList, platformTypes: [...temp] });
    } else {
      let temp = [...checkBoxList.amenitiesTypes];
      if (value) temp.push(checkBoxData);
      else temp = temp.filter(item => item.id !== checkBoxData.id);
      setCheckBoxList({ ...checkBoxList, amenitiesTypes: [...temp] });
    }
  };

  React.useEffect(
    () => {
      const listRoomsDependent = rateTypesList?.items
        ?.filter((elm: some) => elm?.rateType?.id === (values as some)?.rateType)
        .find((el: some) => el?.id === values.basedRatePlanId)?.rooms;
      if (!isEmpty(listRoomsDependent)) {
        setCheckBoxList({
          ...checkBoxList,
          roomsTypes: [...listRoomsDependent],
        });
      }
      if (
        (!values?.rateType && values.basedAnotherRate === 'yes') ||
        isEmpty(rateTypesList?.items?.filter((elm: some) => elm?.rateType?.id === values?.rateType))
      ) {
        setFieldValue('basedAnotherRate', 'no');
      }
      if ((values as some).basedAnotherRate === 'no') {
        setFieldValue('basedRatePlanId', undefined);
        setCheckBoxList({
          ...checkBoxList,
          roomsTypes: [...listRooms],
        });
      }
    },
    // eslint-disable-next-line
    [values, rateTypesList],
  );

  React.useEffect(() => {
    if (ratePlanDetail) {
      const rateDetailTemp: some = {
        platformTypes: !isEmpty(ratePlanDetail?.platforms)
          ? (ratePlanDetail?.platforms).map((el: some) => {
              return { id: el };
            })
          : [],
        customerTypes: !isEmpty(ratePlanDetail?.customerTypes)
          ? (ratePlanDetail?.customerTypes).map((el: some) => {
              return { id: el };
            })
          : [],
        roomsTypes: !isEmpty(ratePlanDetail?.rooms) ? ratePlanDetail?.rooms : [],
        amenitiesTypes: !isEmpty(ratePlanDetail?.amenityIds)
          ? (ratePlanDetail?.amenityIds).map((el: some, index: number) => {
              return { id: el };
            })
          : [],
      };
      setCheckBoxList({ ...checkBoxList, ...rateDetailTemp });
      let temp: some = {
        rateName: ratePlanDetail?.name,
        rateType: ratePlanDetail?.rateType?.id,
        vatIncluded: ratePlanDetail?.vatIncluded ? 'yes' : 'no',
        minNightStaying: ratePlanDetail?.minStaying ? 'no' : 'yes',
        minStaying: !isEmpty(ratePlanDetail?.minStaying) ? ratePlanDetail?.minStaying : 0,
        checkMinRoom: ratePlanDetail?.minRoom ? 'no' : 'yes',
        minRoom: !isEmpty(ratePlanDetail?.minRoom) ? ratePlanDetail?.minRoom : 0,
        maxNightStaying: ratePlanDetail?.maxStaying ? 'no' : 'yes',
        maxStaying: !isEmpty(ratePlanDetail?.maxStaying) ? ratePlanDetail?.maxStaying : 1,
        checkCutOffDay: ratePlanDetail?.cutoffDay ? 'no' : 'yes',
        cutOffDay: !isEmpty(ratePlanDetail?.cutoffDay) ? ratePlanDetail?.cutoffDay : 0,
        checkExtraBed: ratePlanDetail?.policySurcharge?.extraBedPrice ? 'yes' : 'no',
        basedCancellationPolicy: ratePlanDetail?.basedCancellationPolicy ? 'yes' : 'no',
        allowCancel: ratePlanDetail?.policyCancel?.allowCancel,
        basedChildrenPolicy: ratePlanDetail?.basedChildrenPolicy ? 'yes' : 'no',
        basedAnotherRate: ratePlanDetail?.basedAnotherRate ? 'yes' : 'no',
        extraBedPrice: ratePlanDetail?.policySurcharge?.extraBedPrice,
        basedRatePlanId: ratePlanDetail?.basedRatePlan?.basedRatePlanId,
        checkUpDown: ratePlanDetail?.basedRatePlan?.changeBasedAmount > 0 ? 0 : 1,
        changeBasedAmount: !isEmpty(ratePlanDetail?.basedRatePlan)
          ? Math.abs(ratePlanDetail?.basedRatePlan?.changeBasedAmount)
          : 0,
        changeBasedType: ratePlanDetail?.basedRatePlan?.changeBasedType === 'PERCENTAGE' ? 1 : 0,
      };
      if (!isEmpty(ratePlanDetail?.policyChildren)) {
        ratePlanDetail?.policyChildren?.childrenFees?.forEach((el: some, index: number) => {
          temp = {
            ...temp,
            [`ageFrom_${index}`]: el?.ageFrom,
            [`ageTo_${index}`]: el?.ageTo,
            [`currencyId_${index}`]: el?.price ? 1 : 0,
            [`price_${index}`]: el?.price,
          };
        });
      } else {
        temp = {
          ...temp,
          ageFrom_0: 0,
          currencyId_0: 0,
        };
      }
      if (!isEmpty(ratePlanDetail?.policyCancel?.cancelFees)) {
        ratePlanDetail?.policyCancel?.cancelFees?.forEach((el: some, index: number) => {
          temp = {
            ...temp,
            [`hourBeforeCheckin_${index}`]:
              el?.hourBeforeCheckin >= 24 ? el?.hourBeforeCheckin / 24 : el?.hourBeforeCheckin,
            [`time_${index}`]: el?.hourBeforeCheckin >= 24 ? 0 : 1,
            [`basePriceType_${index}`]: el?.type === 'PERCENT' ? 1 : 2,
            [`feeId_${index}`]: el?.value ? 1 : 0,
            [`percentage_${index}`]: el?.type !== 'PERCENT' ? el?.value : undefined,
          };
        });
      } else {
        temp = {
          ...temp,
          allowCancel: true,
          time_0: 0,
          feeId_0: 0,
          basePriceType_0: 1,
        };
      }
      if (!isEmpty(ratePlanDetail?.policyHighSeasons)) {
        ratePlanDetail?.policyHighSeasons?.forEach((elm: some, index: number) => {
          temp = {
            ...temp,
            [`fromDate_${index}`]: elm?.fromDate,
            [`toDate_${index}`]: elm?.toDate,
            [`rush_${index}_maxStaying`]: !isEmpty(elm?.maxStaying) ? elm?.maxStaying : 1,
            [`rush_${index}_minStaying`]: !isEmpty(elm?.minStaying) ? elm?.minStaying : 1,
            [`rushHourCancellationPolicy_${index}`]: !isEmpty(elm?.policyCancel) ? 'yes' : 'no',
            [`rushHourSurchargePolicy_${index}`]: !isEmpty(elm?.policyChildren) ? 'yes' : 'no',
            [`rushHourNightStaying_${index}`]: !isEmpty(elm?.minStaying) ? 'yes' : 'no',
            [`rush_${index}_allowCancel`]: !isEmpty(elm?.policyCancel?.allowCancel),
            [`rush_${index}_extraBedPrice`]: elm?.policySurcharge?.extraBedPrice,
          };
          if (!isEmpty(elm?.policyCancel?.cancelFees)) {
            elm?.policyCancel?.cancelFees?.forEach((el: some, idx: number) => {
              temp = {
                ...temp,
                [`rush_${index}_hourBeforeCheckin_${idx}`]:
                  el?.hourBeforeCheckin >= 24 ? el?.hourBeforeCheckin / 24 : el?.hourBeforeCheckin,
                [`rush_${index}_time_${idx}`]: el?.hourBeforeCheckin >= 24 ? 0 : 1,
                [`rush_${index}_basePriceType_${idx}`]: el?.type === 'PERCENT' ? 1 : 2,
                [`rush_${index}_feeId_${idx}`]: el?.value ? 1 : 0,
                [`rush_${index}_percentage_${idx}`]: el?.value,
              };
            });
          } else {
            temp = {
              ...temp,
              [`rush_${index}_allowCancel`]: true,
              [`rush_${index}_time_0`]: 0,
              [`rush_${index}_feeId_0`]: 0,
              [`rush_${index}_basePriceType_0`]: 1,
            };
          }
          if (!isEmpty(elm?.policyChildren?.childrenFees)) {
            elm?.policyChildren?.childrenFees?.forEach((el: some, idx: number) => {
              temp = {
                ...temp,
                [`rush_${index}_ageFrom_${idx}`]: el?.ageFrom,
                [`rush_${index}_ageTo_${idx}`]: el?.ageTo,
                [`rush_${index}_currencyId_${idx}`]: el?.price ? 1 : 0,
                [`rush_${index}_price_${idx}`]: el?.price,
              };
            });
          } else {
            temp = {
              ...temp,
              [`rush_${index}_ageFrom_0`]: 0,
              [`rush_${index}_currencyId_0`]: 0,
            };
          }
        });
      }
      setValues(temp);
    }
    // eslint-disable-next-line
  }, [ratePlanDetail]);
  return (
    <Col>
      <Typography variant="h5" component="p" className="contract-header">
        <FormattedMessage
          id={
            !isEmpty(ratePlanDetail)
              ? 'IDS_HMS_EDIT_RATE_PLAN_TITLE'
              : 'IDS_HMS_NEW_RATE_PLAN_TITLE'
          }
        />
      </Typography>

      <Row style={{ marginBottom: 8 }}>
        <Row>
          <FieldTextContent
            name="rateName"
            label={intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_PLAN_NAME' })}
            inputProps={{ maxLength: 150 }}
            style={{ width: 320 }}
            formControlStyle={{ minWidth: 320 }}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_ENTER_NAME' })}
          />
        </Row>
        {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) && (
          <Row>
            <FieldSelectContent
              name="rateType"
              label={intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_TYPE_FIELD' })}
              placeholder={intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_TYPE_FIELD_PLACEHOLDER' })}
              style={{ width: 320 }}
              formControlStyle={{ minWidth: 320 }}
              options={rateTypes?.items || []}
              getOptionLabel={(v: any) => v.name}
              onSelectOption={(value: number) => {
                setFieldValue('rateType', value);
              }}
            />
          </Row>
        )}
      </Row>
      <NewRateDialogRadioGroup
        fieldName="basedAnotherRate"
        iconLabel={
          <SettingActiveIcon
            style={{
              stroke: TEAL,
              fill: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_SETTING_METHOD"
        radioLabelApplied="IDS_HMS_NEW_RATE_EXISTED_RATE_USEAGE"
        radioLabelDeclined="IDS_HMS_NEW_RATE_PRIVATE_RATE"
        rateTypesList={rateTypesList}
        ratePlanID={ratePlanID}
        optional
      />
      <Collapse
        in={values.basedAnotherRate === 'yes'}
        style={{
          marginLeft: 40,
        }}
      >
        <BasedAnotherRate rateTypesList={rateTypesList} />
      </Collapse>
      <NewRateDialogCheckBoxes
        iconLabel={
          <BedSingleIcon
            style={{
              stroke: TEAL,
              fill: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_ROOM_APPLIED"
        checkBoxContent={listRooms}
        checkBoxList={checkBoxList}
        handleChange={handleChange}
        typeChange="roomsTypes"
        listRoomsDependent={
          rateTypesList?.items
            ?.filter((elm: some) => elm?.rateType?.id === values?.rateType)
            .find((el: some) => el?.id === values.basedRatePlanId)?.rooms || []
        }
      />
      <NewRateDialogCheckBoxes
        iconLabel={
          <PersonIcon
            style={{
              stroke: TEAL,
              fill: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_CUSTOMER_TYPE"
        checkBoxContent={CUSTOMER_TYPES}
        checkBoxList={checkBoxList}
        handleChange={handleChange}
        typeChange="customerTypes"
      />
      <NewRateDialogRadioGroup
        fieldName="basedCancellationPolicy"
        iconLabel={
          <PolicyIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_REFUND_POLICY"
      />
      <Collapse in={values.basedCancellationPolicy === 'no'}>
        <NewRateRefundPolicy
          refundFields={refundFields}
          setRefundFields={setRefundFields}
          values={values}
        />
      </Collapse>
      <NewRateDialogRadioGroup
        fieldName="checkExtraBed"
        iconLabel={
          <BedIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_RATE_PLAN_EXTRA_BED"
        radioLabelApplied="IDS_HMS_YES"
        radioLabelDeclined="IDS_HMS_NO"
      />
      <Collapse in={values.checkExtraBed === 'yes'}>
        <Row
          style={{
            marginLeft: 33,
            paddingLeft: 20,
            borderLeft: `1px solid ${BLUE_500}`,
            marginBottom: 12,
            width: 300,
          }}
        >
          <FieldTextContent
            name="extraBedPrice"
            label={intl.formatMessage({ id: 'IDS_HMS_ROOM_EXTRA_BED_PRICE' })}
            inputComponent={NumberFormatCustom as any}
            inputProps={{ maxLength: 12 }}
            endAdornment={
              <span className="end-adornment">
                {intl.formatMessage({ id: 'IDS_HMS_MONEY_UNIT' })}
              </span>
            }
            optional
            placeholder={intl.formatMessage({ id: 'IDS_HMS_POLICY_ENTER_PRICE' })}
          />
        </Row>
      </Collapse>
      <NewRateDialogRadioGroup
        fieldName="basedChildrenPolicy"
        iconLabel={
          <KidIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_POLICY_SURCHARGE"
      />
      <Collapse in={values.basedChildrenPolicy === 'no'}>
        <NewRateSurchargePolicy
          values={values}
          childrenFields={childrenFields}
          setChildrenFields={setChildrenFields}
        />
      </Collapse>
      <NewRateDialogRadioGroup
        fieldName="vatIncluded"
        iconLabel={
          <BillIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_VAT_INCLUDED"
        radioLabelApplied="IDS_HMS_YES"
        radioLabelDeclined="IDS_HMS_NO"
      />
      <NewRateDialogRadioGroup
        fieldName="checkCutOffDay"
        iconLabel={
          <ClockIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_DAY_CUSTOMER_ORDER"
        radioLabelApplied="IDS_HMS_NOT_REQUESTED"
        radioLabelDeclined="IDS_HMS_DAY_REQUESTED"
        checkDayOrRoomRequested={values.checkCutOffDay === 'no'}
        fieldDayOrRoomRequestedName="cutOffDay"
        optional
      />
      <NewRateDialogRadioGroup
        fieldName="minNightStaying"
        iconLabel={
          <NightIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_MIN_DAY_STAYING"
        radioLabelApplied="IDS_HMS_NOT_REQUESTED"
        radioLabelDeclined="IDS_HMS_NIGHT_REQUESTED"
        checkDayOrRoomRequested={values.minNightStaying === 'no'}
        fieldDayOrRoomRequestedName="minStaying"
        optional
      />
      <NewRateDialogRadioGroup
        fieldName="maxNightStaying"
        iconLabel={
          <NightIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_NEW_RATE_TYPE_MAX_DAY_STAYING"
        radioLabelApplied="IDS_HMS_NOT_REQUESTED"
        radioLabelDeclined="IDS_HMS_NIGHT_REQUESTED"
        checkDayOrRoomRequested={values.maxNightStaying === 'no'}
        fieldDayOrRoomRequestedName="maxStaying"
        optional
      />
      <NewRateDialogRadioGroup
        fieldName="checkMinRoom"
        iconLabel={
          <DoorIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_ROOM_MINIMUM_ROOM"
        radioLabelApplied="IDS_HMS_NOT_REQUESTED"
        radioLabelDeclined="IDS_HMS_ROOM_REQUESTED"
        checkDayOrRoomRequested={values.checkMinRoom === 'no'}
        fieldDayOrRoomRequestedName="minRoom"
        optional
      />
      <NewRateDialogCheckBoxes
        iconLabel={
          <ReceptionIcon
            style={{
              stroke: TEAL,
            }}
            className="svgFillAll"
          />
        }
        label="IDS_HMS_RATE_PLAN_AMENITIES"
        checkBoxContent={listAmenities?.items?.filter((el: some) => el.id === 16) || []}
        checkBoxList={checkBoxList}
        handleChange={handleChange}
        typeChange="amenitiesTypes"
        leftLabel="IDS_HMS_RATE_PLAN_MEAL"
        optional
      />
      <NewRateDialogCheckBoxes
        checkBoxContent={listAmenities?.items?.filter((el: some) => el.id !== 16) || []}
        checkBoxList={checkBoxList}
        handleChange={handleChange}
        typeChange="amenitiesTypes"
        leftLabel="IDS_HMS_RATE_PLAN_AMENITIES_OTHERS"
      />
      <NewRateRushHour
        values={values}
        rushHourFields={rushHourFields}
        setRushHourFields={setRushHourFields}
      />
    </Col>
  );
};
export default NewRateDialogContent;
