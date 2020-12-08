import { Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { GREY_100, RED, RED_50 } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { Row } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../../common/FieldContent';
import { RATIO_OPTION, UP_DOWN_OPTION } from '../../../../constant';

interface Props {
  rateTypesList: some;
}
const BasedAnotherRate: React.FC<Props> = props => {
  const { rateTypesList } = props;

  const intl = useIntl();
  const { setFieldValue, errors, submitCount, values } = useFormikContext();

  const errorMessage = React.useMemo(() => {
    const temp: Array<any> = [];
    Object.keys(errors).forEach((key, index) => {
      if (submitCount > 0) {
        if (key.includes('changeBasedAmount') || key.includes('basedRatePlanId'))
          temp.push(Object.values(errors)[index]);
      }
    });
    return temp;
  }, [errors, submitCount]);

  return (
    <>
      <Row>
        <FieldSelectContent
          name="basedRatePlanId"
          label={intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_TYPE_CHOOSING' })}
          placeholder={intl.formatMessage({
            id: 'choose',
          })}
          style={{
            width: 320,
          }}
          formControlStyle={{ minWidth: 320 }}
          options={
            rateTypesList?.items?.filter(
              (elm: some) => elm?.rateType?.id === (values as some)?.rateType,
            ) || []
          }
          getOptionLabel={(v: any) => v.name}
          onSelectOption={(value: number) => {
            setFieldValue('basedRatePlanId', value);
          }}
          optional
          disableError
        />
        <FieldSelectContent
          name="checkUpDown"
          label={
            <span style={{ whiteSpace: 'nowrap' }}>
              {intl.formatMessage({ id: 'IDS_HMS_NEW_RATE_TYPE_EXISTED_RATE_DIFENRENCE' })}
            </span>
          }
          style={{
            width: 128,
          }}
          formControlStyle={{ minWidth: 128 }}
          options={UP_DOWN_OPTION}
          getOptionLabel={value => intl.formatMessage({ id: value.name })}
          onSelectOption={(value: number) => {
            setFieldValue('checkUpDown', value);
          }}
          optional
        />
        <Row style={{ marginTop: 24, marginLeft: -80 }}>
          <FieldTextContent
            name="changeBasedAmount"
            style={{
              width: 120,
              borderRadius: '4px 0px 0px 4px',
            }}
            label={null}
            inputComponent={NumberFormatCustom as any}
            formControlStyle={{ minWidth: 120, width: 'auto', marginRight: 0 }}
            inputProps={{
              maxLength: 12,
            }}
            placeholder={intl.formatMessage({
              id: 'IDS_HMS_INPUT_NUMBER',
            })}
            disableError
          />
          <FieldSelectContent
            name="changeBasedType"
            label={null}
            style={{
              width: 100,
              borderRadius: '0px 4px 4px 0px',
              background: GREY_100,
              borderLeft: 0,
            }}
            formControlStyle={{ minWidth: 100, width: 'auto' }}
            options={RATIO_OPTION}
            getOptionLabel={value => intl.formatMessage({ id: value.name })}
            onSelectOption={(value: number) => {
              setFieldValue(`changeBasedType`, value);
            }}
            disableError
            disableCloseIcon
          />
        </Row>
      </Row>
      {errorMessage.length > 0 ? (
        <Row
          style={{
            background: RED_50,
            width: 600,
            marginBottom: 8,
          }}
        >
          <Typography
            style={{
              color: RED,
              padding: '12px 24px',
            }}
            variant="body2"
          >
            {errorMessage[0]}
          </Typography>
        </Row>
      ) : null}
    </>
  );
};
export default BasedAnotherRate;
