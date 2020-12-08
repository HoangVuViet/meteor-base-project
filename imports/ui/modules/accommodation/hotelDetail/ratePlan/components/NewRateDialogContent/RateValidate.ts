import moment from 'moment';
import * as yup from 'yup';
import { some } from '../../../../../../constants';
import { ROLES } from '../../../../../../layout/constants';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { MAX_AGE } from '../../../../constant';
import { checkRole, isEmpty } from '../../../../utils';

export const getSchemaValidate = (
  intl: any,
  childrenFields: some[],
  refundFields: some[],
  rushHourFields: some[],
  roleUser?: some,
) => {
  let result: some = {};
  result = {
    ...result,
    rateName: yup.string().required(intl.formatMessage({ id: 'required' })),
    rateType: checkRole(ROLES.HMS_PRE_ADMIN, roleUser)
      ? yup.string().required(intl.formatMessage({ id: 'required' }))
      : null,
    cutOffDay: yup.number().when('checkCutOffDay', {
      is: value => value === 'yes',
      then: yup
        .number()
        .required(intl.formatMessage({ id: 'required' }))
        .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
    }),
    minStaying: yup.number().when('minNightStaying', {
      is: value => value === 'yes',
      then: yup
        .number()
        .required(intl.formatMessage({ id: 'required' }))
        .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
    }),
    maxStaying: yup
      .number()
      .when('maxNightStaying', {
        is: value => value === 'yes',
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
      })
      .when('minStaying', {
        is: value => !isEmpty(value),
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
          .moreThan(
            yup.ref(`minStaying`),
            intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN_NIGHT_COMPARE_ERROR' }),
          ),
      }),
    minRoom: yup.number().when('checkMinRoom', {
      is: value => value === 'yes',
      then: yup
        .number()
        .required(intl.formatMessage({ id: 'required' }))
        .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
    }),
    extraBedPrice: yup.number().when('checkExtraBed', {
      is: value => value === 'yes',
      then: yup
        .number()
        .required(intl.formatMessage({ id: 'required' }))
        .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' })),
    }),

    basedRatePlanId: yup.number().when('basedAnotherRate', {
      is: value => value !== 'no',
      then: yup
        .number()
        .required(intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN_ANOTHER_RATE_PLAN_SELECT_ERROR' })),
    }),
    changeBasedAmount: yup
      .number()
      .when('basedAnotherRate', {
        is: value => value !== 'no',
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' })),
      })
      .when('changeBasedType', {
        is: value => value !== 0,
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .max(100, intl.formatMessage({ id: 'IDS_HMS_RATE_PERCENT_ERROR' }))
          .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' })),
      }),
  };
  childrenFields.forEach((el: some, idx: number) => {
    result = {
      ...result,
      [`ageFrom_${idx}`]: yup
        .number()
        .when('basedChildrenPolicy', {
          is: value => value === 'no',
          then: yup.number().required(intl.formatMessage({ id: 'required' })),
        })
        .when(`ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
          return schema.test({
            name: 'compareAgeType',
            test: (ageFromAfter: number) => {
              return !(ageToBefore && ageFromAfter && Number(ageToBefore) >= Number(ageFromAfter));
            },
            message: intl.formatMessage({
              id: 'IDS_HMS_POLICY_CHILDREN_SETTING_AGE_MATCH_ERROR',
            }),
          });
        })
        .when(`ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
          return schema.test({
            name: 'compareAgeType',
            test: (ageFromAfter: number) => {
              return !(
                ageToBefore &&
                ageFromAfter &&
                Number(ageToBefore) !== Number(ageFromAfter) - 1
              );
            },
            message: intl.formatMessage({
              id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
            }),
          });
        }),
      [`ageTo_${idx}`]: yup
        .number()
        .when('basedChildrenPolicy', {
          is: value => value === 'no',
          then: yup.number().required(intl.formatMessage({ id: 'required' })),
        })
        .test({
          name: 'checkLastAgeTo',
          test: (ageToAfter: number) => {
            return !(idx === childrenFields.length - 1 && ageToAfter && ageToAfter !== MAX_AGE);
          },
          message: intl.formatMessage({
            id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
          }),
        }),
      [`price_${idx}`]: yup.number().when(`currencyId_${idx}`, {
        is: value => value === 1,
        then: yup
          .number()
          .nullable()
          .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
          .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' }))
          .required(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_PRICE_ERROR' })),
      }),
    };
  });

  refundFields.forEach((el: some, idx: number) => {
    result = {
      ...result,
      [`hourBeforeCheckin_${idx}`]: yup
        .number()
        .when(['allowCancel', 'basedCancellationPolicy'], {
          is: (allowCancelValue, basedCancellationPolicyValue) =>
            allowCancelValue && basedCancellationPolicyValue === 'no',
          then: yup.number().required(intl.formatMessage({ id: 'required' })),
        })
        .when(`time_${idx}`, {
          is: value => {
            return value !== 1;
          },
          then: yup
            .number()
            .nullable()
            .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
            .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' })),
          otherwise: yup
            .number()
            .nullable()
            .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' }))
            .max(23, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' })),
        }),
      [`percentage_${idx}`]: yup
        .number()
        .when(['allowCancel', 'basedCancellationPolicy', `feeId_${idx}`], {
          is: (allowCancelValue, basedCancellationPolicyValue, feeId) =>
            allowCancelValue && basedCancellationPolicyValue === 'no' && feeId === 1,
          then: yup
            .number()
            .required(intl.formatMessage({ id: 'required' }))
            .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' })),
        }),
    };
  });

  rushHourFields.forEach((elm: some, index: number) => {
    result = {
      ...result,
      [`fromDate_${index}`]: yup
        .string()
        .required(intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN_DATE_SELECT_ERROR' }))
        .when(`toDate_${index}`, (dateTo: string, schema: any) => {
          return schema.test({
            name: 'checkExistDateTo',
            test: (dateFrom: string) =>
              !!dateTo ||
              (dateFrom &&
                dateTo &&
                moment(dateFrom, DATE_FORMAT_BACK_END, true).isSame(
                  moment(dateTo, DATE_FORMAT_BACK_END, true),
                )),
            message: intl.formatMessage({
              id: 'IDS_HMS_RATE_PLAN_DATE_SELECT_ERROR',
            }),
          });
        })
        .when(`toDate_${index - 1}`, (dateToBefore: string, schema: any) => {
          return schema.test({
            name: 'compareDate',
            test: (dateFromAfter: string) => {
              return !(
                dateFromAfter &&
                dateToBefore &&
                moment(dateToBefore, DATE_FORMAT_BACK_END, true).isAfter(
                  moment(dateFromAfter, DATE_FORMAT_BACK_END, true),
                )
              );
            },
            message: intl.formatMessage({
              id: 'IDS_HMS_RATE_PLAN_DATE_OVERLAP_ERROR',
            }),
          });
        }),

      [`rush_${index}_maxStaying`]: yup.number().when(`rushHourNightStaying_${index}`, {
        is: value => value === 'yes',
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
      }),
      [`rush_${index}_minStaying`]: yup.number().when(`rushHourNightStaying_${index}`, {
        is: value => value === 'yes',
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
      }),
      [`rush_${index}_extraBedPrice`]: yup.number().when(`rushHourSurchargePolicy_${index}`, {
        is: value => value === 'yes',
        then: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' })),
      }),
    };
    elm?.rushHourChildrenFields.forEach((el: some, idx: number) => {
      result = {
        ...result,
        [`rush_${index}_ageFrom_${idx}`]: yup
          .number()
          .when(`rushHourSurchargePolicy_${index}`, {
            is: value => value === 'yes',
            then: yup.number().required(intl.formatMessage({ id: 'required' })),
          })
          .when(`rush_${index}_ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
            return schema.test({
              name: 'compareAgeType',
              test: (ageFromAfter: number) => {
                return !(ageToBefore && ageFromAfter && ageToBefore >= ageFromAfter);
              },
              message: intl.formatMessage({
                id: 'IDS_HMS_POLICY_CHILDREN_SETTING_AGE_MATCH_ERROR',
              }),
            });
          })
          .when(`rush_${index}_ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
            return schema.test({
              name: 'compareAgeType',
              test: (ageFromAfter: number) => {
                return !(ageToBefore && ageFromAfter && ageToBefore !== ageFromAfter - 1);
              },
              message: intl.formatMessage({
                id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
              }),
            });
          }),
        [`rush_${index}_ageTo_${idx}`]: yup
          .number()
          .when(`rushHourSurchargePolicy_${index}`, {
            is: value => value === 'yes',
            then: yup.number().required(intl.formatMessage({ id: 'required' })),
          })
          .test({
            name: 'checkLastAgeTo',
            test: (ageToAfter: number) => {
              return !(
                idx === elm?.rushHourChildrenFields.length - 1 &&
                ageToAfter &&
                ageToAfter !== MAX_AGE
              );
            },
            message: intl.formatMessage({
              id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
            }),
          }),
        [`rush_${index}_price_${idx}`]: yup.number().when(`rush_${index}_currencyId_${idx}`, {
          is: value => value === 1,
          then: yup
            .number()
            .nullable()
            .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
            .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' }))
            .required(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_PRICE_ERROR' })),
        }),
      };
    });
    elm?.rushHourRefundFields.forEach((el: some, idx: number) => {
      result = {
        ...result,
        [`rush_${index}_hourBeforeCheckin_${idx}`]: yup
          .number()
          .when([`rush_${index}_allowCancel`, `rushHourCancellationPolicy_${index}`], {
            is: (allowCancelValue, basedCancellationPolicyValue) =>
              allowCancelValue && basedCancellationPolicyValue === 'yes',
            then: yup.number().required(intl.formatMessage({ id: 'required' })),
          })
          .when(`rush_${index}_time_${idx}`, {
            is: value => {
              return value !== 1;
            },
            then: yup
              .number()
              .nullable()
              .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
              .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' }))
              .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' })),
            otherwise: yup
              .number()
              .nullable()
              .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' }))
              .max(23, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' })),
          }),
        [`rush_${index}_percentage_${idx}`]: yup
          .number()
          .when(
            [
              `rush_${index}_allowCancel`,
              `rushHourCancellationPolicy_${index}`,
              `rush_${index}_feeId_${idx}`,
            ],
            {
              is: (allowCancelValue, basedCancellationPolicyValue, feeId) =>
                allowCancelValue && basedCancellationPolicyValue === 'yes' && feeId === 1,
              then: yup
                .number()
                .required(intl.formatMessage({ id: 'required' }))
                .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' }))
                .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' })),
            },
          ),
      };
    });
  });

  return result;
};
