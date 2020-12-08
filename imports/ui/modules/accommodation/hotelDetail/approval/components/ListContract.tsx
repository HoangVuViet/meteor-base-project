import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import moment from 'moment';
import ContractItem from './ContractItem';
import { isEmpty } from '../../../utils';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { some } from '../../../../../constants';

interface Props {
  contract: some[];
  rateTypes: some;
  contractTypes: some;
  contractHotel: some;
  isApproval?: boolean;
  removeContract?: (index: number) => void;
  fetchContract?: () => void;
}

const ListContract: React.FC<Props> = props => {
  const { contract, rateTypes, contractTypes, contractHotel, isApproval } = props;
  const { setValues, values } = useFormikContext();
  const fillValueTime = (type: string, val: any) => {
    if (type === 'BOOKING') return null;
    if (type === 'TWICE_MONTHLY') return val;
    return !isEmpty(val) ? val[0] : null;
  };
  const handleFillData = () => {
    let temp = { ...(values as any) };
    contractHotel?.items.forEach((data: any, index: number) => {
      temp = {
        ...temp,
        [`id_${index}`]: data?.id,
        [`rateTypeId_${index}`]: data?.rateTypeId,
        [`contractTypeId_${index}`]: data?.contractTypeId,
        [`contractCode_${index}`]: data?.contractCode,
        [`commission_${index}`]: data?.commission,
        [`hotelInvoiceTypeId_${index}`]: data?.hotelInvoiceTypeId,
        [`startDate_${index}`]: moment(data?.startDate, DATE_FORMAT_BACK_END),
        [`endDate_${index}`]: !isEmpty(data?.endDate)
          ? moment(data?.endDate, DATE_FORMAT_BACK_END)
          : undefined,
        [`files_${index}`]: data?.files,
        [`paymentTime_${index}`]: data?.paymentTime?.timeType,
        [`paymentTimeValue_${index}`]: fillValueTime(
          data?.paymentTime?.timeType,
          data?.paymentTime?.values,
        ),
        [`crossCheckingTime_${index}`]: data?.crossCheckingTime?.timeType,
        [`crossCheckingTimeValue_${index}`]: fillValueTime(
          data?.crossCheckingTime?.timeType,
          data?.crossCheckingTime?.values,
        ),
      };
    });
    setValues(temp);
  };
  const remove = (index: number) => {
    const temp = {
      ...(values as any),
      [`id_${index}`]: undefined,
      [`rateTypeId_${index}`]: undefined,
      [`contractTypeId_${index}`]: undefined,
      [`contractCode_${index}`]: undefined,
      [`commission_${index}`]: undefined,
      [`hotelInvoiceTypeId_${index}`]: undefined,
      [`startDate_${index}`]: undefined,
      [`endDate_${index}`]: undefined,
      [`files_${index}`]: undefined,
      [`paymentTime_${index}`]: undefined,
      [`paymentTimeValue_${index}`]: undefined,
      [`crossCheckingTime_${index}`]: undefined,
      [`crossCheckingTimeValue_${index}`]: undefined,
    };
    setValues(temp);
    if (props.removeContract) props.removeContract(index);
  };
  useEffect(() => {
    if (!isEmpty(contractHotel?.items)) handleFillData();
    // eslint-disable-next-line
  }, [contractHotel]);
  return (
    <>
      {contract.map((element, idx: number) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          {!element.isDelete && (
            <ContractItem
              index={idx}
              rateTypes={rateTypes}
              contractTypes={contractTypes}
              isApproval={isApproval}
              remove={() => remove(idx)}
              contractItem={!isEmpty(contractHotel?.items) ? contractHotel?.items[idx] : {}}
              fetchContract={props?.fetchContract}
            />
          )}
        </div>
      ))}
    </>
  );
};
export default React.memo(ListContract);
