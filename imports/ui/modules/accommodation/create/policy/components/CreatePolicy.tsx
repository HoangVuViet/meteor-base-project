import { Divider } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import { some } from '../../../../../constants';
import { Col } from '../../../../common/components/elements';
import { isEmpty } from '../../../utils';
import { IFields } from '../utils';
import ChildrenPolicy from './ChildrenPolicy';
import GeneralPolicy from './GeneralPolicy';
import RefundPolicy from './RefundPolicy';

interface Props {
  fields: some[];
  values: some;
  refundFields: IFields[];
  setRefundFields(values: some): void;
  setFields(values: some): void;
  data?: some;
}
const CreatePolicy: React.FC<Props> = props => {
  const { fields, refundFields, setFields, setRefundFields, values, data } = props;

  const { setValues } = useFormikContext();
  const checkValue = (value?: any) => {
    if (isEmpty(value)) return value;
    return value ? 'yes' : 'no';
  };
  React.useEffect(() => {
    let temp: some = {
      allowSmoking: checkValue(data?.policyGeneral?.allowSmoking),
      allowPet: checkValue(data?.policyGeneral?.allowPet),
      allowEvent: checkValue(data?.policyGeneral?.allowEvent),
      hasRestriction: data?.policyGeneral?.hasRestriction
        ? data?.policyGeneral?.hasRestriction
        : false,
      allowCancellation: data?.policyCancel?.allowCancel ? 'yes' : 'no',
    };
    if (!isEmpty(data?.policyChildren?.childrenFees)) {
      data?.policyChildren?.childrenFees?.forEach((el: some, index: number) => {
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
    if (!isEmpty(data?.policyCancel?.cancelFees)) {
      data?.policyCancel?.cancelFees?.forEach((el: some, index: number) => {
        temp = {
          ...temp,
          [`hourBeforeCheckin_${index}`]:
            el?.hourBeforeCheckin >= 24 ? el?.hourBeforeCheckin / 24 : el?.hourBeforeCheckin,
          [`time_${index}`]: el?.hourBeforeCheckin >= 24 ? 0 : 1,
          [`basePriceType_${index}`]: el?.type === 'PERCENT' ? 1 : 2,
          [`feeId_${index}`]: el?.value ? 1 : 0,
          [`percentage_${index}`]: el?.value,
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
    setValues(temp);
    // eslint-disable-next-line
  }, [data]);

  return (
    <Col>
      <GeneralPolicy />
      <Divider style={{ margin: '16px 0px' }} />
      <ChildrenPolicy values={values} fields={fields} setFields={setFields} />
      <Divider />
      <RefundPolicy values={values} refundFields={refundFields} setRefundFields={setRefundFields} />
      <Divider />
    </Col>
  );
};
export default CreatePolicy;
