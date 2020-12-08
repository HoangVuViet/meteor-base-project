import { Button, Collapse, IconButton, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE_500, GREY_100, RED, RED_50, SECONDARY } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { ReactComponent as AddIconCircle } from '../../../../../../svg/ic_add_circle.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../svg/ic_delete.svg';
import CustomSwitch from '../../../../../common/components/CustomSwitch';
import { Col, Row } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../../common/FieldContent';
import { FEE_OPTION, TIME_OPTION, UNIT_OPTION } from '../../../../constant';

interface Props {
  values: some;
  refundFields: some[];
  setRefundFields(values: some): void;
}
const NewRateRefundPolicy: React.FC<Props> = props => {
  const { values, refundFields, setRefundFields } = props;

  const intl = useIntl();
  const {
    setFieldValue,
    submitCount,
    errors,
    touched,
    setValues,
    setErrors,
    handleReset,
  } = useFormikContext();

  const errorMessage = React.useMemo(() => {
    const temp: Array<any> = [];
    Object.keys(errors).forEach((key, index) => {
      if (
        Object.keys(touched).includes('hourBeforeCheckin') ||
        Object.keys(touched).includes('percentage') ||
        submitCount > 0
      ) {
        if (key.includes('hourBeforeCheckin') || key.includes('percentage'))
          temp.push(Object.values(errors)[index]);
      }
    });
    return temp;
  }, [errors, submitCount, touched]);

  const handleRefundFieldRemove = (index: number) => {
    let temp: some = { ...values };
    refundFields.forEach((elm: some, idx: number) => {
      if (idx >= index) {
        temp = {
          ...temp,
          [`hourBeforeCheckin_${idx}`]: values[`hourBeforeCheckin_${idx + 1}`],
          [`percentage_${idx}`]: values[`percentage_${idx + 1}`],
          [`basePriceType_${idx}`]: values[`basePriceType_${idx + 1}`],
          [`time_${idx}`]: values[`time_${idx + 1}`],
          [`feeId_${idx}`]: values[`feeId_${idx + 1}`],
        };
      }
    });
    if (submitCount > 0) {
      setErrors({});
      handleReset();
    }
    setValues(temp);
    setRefundFields([...refundFields.slice(0, index), ...refundFields.slice(index + 1)]);
  };

  const handleRefundFieldAdd = () => {
    const temp: some = {
      ...values,
      [`hourBeforeCheckin_${refundFields.length}`]: undefined,
      [`percentage_${refundFields.length}`]: undefined,
      [`basePriceType_${refundFields.length}`]: 1,
      [`time_${refundFields.length}`]: 0,
      [`feeId_${refundFields.length}`]: 0,
    };
    setValues(temp);
    setRefundFields([...refundFields, { isDelete: false }]);
  };

  return (
    <Col
      style={{
        marginLeft: 33,
        paddingLeft: 20,
        borderLeft: values.allowCancel ? `1px solid ${BLUE_500}` : 'none',
        marginBottom: 12,
      }}
    >
      <Row style={{ marginBottom: 12 }}>
        <Typography variant="subtitle2" component="p">
          <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_IS_REFUND" />
        </Typography>
        <CustomSwitch
          size="medium"
          checked={values.allowCancel}
          onChange={() => setFieldValue(`allowCancel`, !values.allowCancel)}
        />
      </Row>
      <Collapse in={values.allowCancel}>
        <Col>
          {refundFields.map((el: some, idx: number) => (
            <Fragment key={idx}>
              <Row>
                <Col>
                  <FieldTextContent
                    name={`hourBeforeCheckin_${idx}`}
                    style={{
                      width: 120,
                      borderRadius: '4px 0px 0px 4px',
                    }}
                    inputComponent={NumberFormatCustom as any}
                    formControlStyle={{
                      minWidth: 120,
                      width: 'auto',
                      marginRight: 0,
                    }}
                    label={intl.formatMessage({ id: 'IDS_HMS_POLICY_BEFORE_CHECKIN' })}
                    inputProps={{ maxLength: 3 }}
                    disableError
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`time_${idx}`}
                    label={null}
                    style={{
                      width: 100,
                      borderRadius: '0px 4px 4px 0px',
                      background: GREY_100,
                      borderLeft: 0,
                      marginTop: 24,
                    }}
                    formControlStyle={{ minWidth: 100, width: 'auto' }}
                    options={TIME_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`time_${idx}`, value);
                      setRefundFields(() => {
                        refundFields[idx].time = value;
                        return refundFields;
                      });
                    }}
                    disableError
                    disableCloseIcon
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`feeId_${idx}`}
                    style={{ marginTop: 24, width: 120 }}
                    formControlStyle={{ minWidth: 120 }}
                    options={FEE_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`feeId_${idx}`, value);
                      if (value === 0) setFieldValue(`percentage_${idx}`, undefined);
                    }}
                    disableError
                  />
                </Col>
                {values[`feeId_${idx}`] === 1 && (
                  <>
                    <Col>
                      <FieldTextContent
                        name={`percentage_${idx}`}
                        label={intl.formatMessage({ id: 'IDS_HMS_PAID' })}
                        style={{
                          width: 150,
                          borderRadius: '4px 0px 0px 4px',
                        }}
                        inputComponent={NumberFormatCustom as any}
                        formControlStyle={{
                          minWidth: 150,
                          width: 'auto',
                          marginRight: 0,
                        }}
                        inputProps={{
                          maxLength: 3,
                        }}
                        disableError
                      />
                    </Col>
                    <Col>
                      <FieldSelectContent
                        name={`basePriceType_${idx}`}
                        style={{
                          marginTop: 24,
                          width: 220,
                          borderRadius: '0px 4px 4px 0px',
                          background: GREY_100,
                          borderLeft: 0,
                        }}
                        formControlStyle={{ minWidth: 220, width: 'auto' }}
                        options={UNIT_OPTION}
                        getOptionLabel={value => intl.formatMessage({ id: value.name })}
                        onSelectOption={(value: number) => {
                          setFieldValue(`basePriceType_${idx}`, value);
                        }}
                        disableError
                        disableCloseIcon
                      />
                    </Col>
                  </>
                )}
                <Col>
                  {idx > 0 && (
                    <>
                      <IconButton
                        style={{ padding: 4 }}
                        onClick={() => handleRefundFieldRemove(idx)}
                      >
                        <DeleteIcon
                          style={{ padding: 0, stroke: SECONDARY }}
                          className="svgFillAll"
                        />
                      </IconButton>
                    </>
                  )}
                </Col>
              </Row>
            </Fragment>
          ))}
        </Col>
        {errorMessage.length > 0 ? (
          <Row style={{ background: RED_50, width: 600 }}>
            <Typography style={{ color: RED, padding: '12px 24px' }} variant="body2">
              {errorMessage[0]}
            </Typography>
          </Row>
        ) : null}
        <Row>
          <Button onClick={handleRefundFieldAdd} style={{ padding: 0 }}>
            <AddIconCircle style={{ marginRight: 4 }} />
            <Typography variant="body2" style={{ color: BLUE_500 }}>
              <FormattedMessage id="IDS_HMS_ADD_NEW_POLICY" />
            </Typography>
          </Button>
        </Row>
      </Collapse>
    </Col>
  );
};
export default NewRateRefundPolicy;
