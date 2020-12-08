import {
  Button,
  Collapse,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  BLUE_500,
  GREY_100,
  GREY_500,
  RED,
  RED_50,
  SECONDARY,
} from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { ReactComponent as DeleteIcon } from '../../../../../svg/ic_delete.svg';
import { Col, Row } from '../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import { FEE_OPTION, TIME_OPTION, UNIT_OPTION } from '../../../constant';

interface Props {
  values: some;
  refundFields: some[];
  setRefundFields(values: some): void;
}
const RefundPolicy: React.FC<Props> = props => {
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
    <Col>
      <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 16 }}>
        <Col style={{ marginRight: 32 }}>
          <Typography variant="h6">
            <FormattedMessage id="IDS_HMS_REFUND_POLICY" />
          </Typography>
          <Col>
            <Row style={{ marginBottom: 20, marginTop: 16 }}>
              <Field
                name="allowCancellation"
                as={(propsField: any) => (
                  <Row>
                    <RadioGroup {...propsField} row>
                      <FormControlLabel
                        value="no"
                        style={{ paddingRight: 28 }}
                        control={<Radio style={{ color: SECONDARY }} size="small" />}
                        label={
                          <Typography variant="body2">
                            <FormattedMessage id="IDS_HMS_GENERAL_NOT_REFUND" />
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio style={{ color: SECONDARY }} size="small" />}
                        label={
                          <Typography variant="body2">
                            <FormattedMessage id="IDS_HMS_GENERAL_CANCEL" />
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </Row>
                )}
              />
            </Row>
            <Row />
          </Col>
          <Collapse in={values.allowCancellation === 'yes'}>
            <Col>
              <Col>
                {refundFields.map((el: some, idx: number) => (
                  <Fragment key={idx}>
                    <Row>
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
                              marginTop: 24,
                              borderRadius: '0px 4px 4px 0px',
                              background: GREY_100,
                              borderLeft: 0,
                            }}
                            formControlStyle={{
                              minWidth: 100,
                              width: 'auto',
                            }}
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
                          />
                        </Col>
                        <Col>
                          <FieldSelectContent
                            name={`feeId_${idx}`}
                            style={{
                              width: 120,
                              marginTop: 24,
                            }}
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
                      </Row>
                      {values[`feeId_${idx}`] === 1 && (
                        <>
                          <Col>
                            <FieldTextContent
                              name={`percentage_${idx}`}
                              label={intl.formatMessage({ id: 'IDS_HMS_PRICE' })}
                              style={{
                                width: 128,
                                borderRadius: '4px 0px 0px 4px',
                              }}
                              inputComponent={NumberFormatCustom as any}
                              formControlStyle={{
                                minWidth: 128,
                                width: 'auto',
                                marginRight: 0,
                              }}
                              value={values[`percentage_${idx}`]}
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
                                width: 200,
                                borderRadius: '0px 4px 4px 0px',
                                background: GREY_100,
                                borderLeft: 0,
                              }}
                              formControlStyle={{ minWidth: 200 }}
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
                                style={{ padding: 0, stroke: RED }}
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
                <Row style={{ background: RED_50, width: 500 }}>
                  <Typography style={{ color: RED, padding: '12px 12px' }} variant="body2">
                    {errorMessage[0]}
                  </Typography>
                </Row>
              ) : null}
              <Row style={{ marginBottom: 16, marginTop: 8 }}>
                <Button
                  onClick={handleRefundFieldAdd}
                  disabled={values[`feeId_${refundFields.length - 1}`] !== 1}
                >
                  <AddIconCircle
                    className="svgFillAll"
                    style={{
                      marginRight: 4,
                      stroke:
                        values[`feeId_${refundFields.length - 1}`] !== 1 ? GREY_500 : BLUE_500,
                    }}
                  />
                  <Typography
                    variant="body2"
                    style={{
                      color: values[`feeId_${refundFields.length - 1}`] !== 1 ? GREY_500 : BLUE_500,
                    }}
                  >
                    <FormattedMessage id="IDS_HMS_ADD_NEW_POLICY" />
                  </Typography>
                </Button>
              </Row>
            </Col>
          </Collapse>
        </Col>
        {values.allowCancellation === 'yes' && (
          <Col>
            <Row style={{ marginTop: 8, paddingRight: 40 }}>
              <Col>
                {values.hourBeforeCheckin_0 && (
                  <Paper
                    elevation={3}
                    style={{ padding: '16px 12px', width: 400 }}
                    variant="outlined"
                  >
                    <Col>
                      <Row>
                        <Typography variant="body2" gutterBottom>
                          <FormattedMessage id="IDS_HMS_POLICY_REFUND" />
                        </Typography>
                      </Row>
                      {values.percentage_0 < 100 && values.hourBeforeCheckin_0 > 0 ? (
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="li"
                          color="textSecondary"
                          style={{ width: 400, padding: '0px 16px' }}
                        >
                          <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_4" />
                          &nbsp;{`${values.hourBeforeCheckin_0}`}&nbsp;
                          <span>
                            {!values.time_0
                              ? intl.formatMessage({
                                  id: 'IDS_HMS_DAY',
                                })
                              : intl.formatMessage({
                                  id: 'IDS_HMS_HOUR',
                                })}
                          </span>
                          &nbsp;
                          <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_6" />
                          <span>,</span>&nbsp;
                          <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_5" />
                          &nbsp;
                          <FormattedMessage id="IDS_HMS_POLICY_ROOM_VALUE" />
                        </Typography>
                      ) : null}
                      {refundFields.map((el: some, idx: number) => (
                        <Fragment key={idx}>
                          {!el.isDelete && (
                            <Row>
                              {values[`hourBeforeCheckin_${idx}`] && (
                                <Row style={{ width: 400, marginLeft: 16 }}>
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    component="li"
                                    color="textSecondary"
                                  >
                                    {values[`percentage_${idx}`] > 0 ? (
                                      <>
                                        <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_1" />
                                        &nbsp;{`${values[`percentage_${idx}`]}`}
                                        <span>
                                          {values[`basePriceType_${idx}`] === 1
                                            ? '%'
                                            : intl.formatMessage({
                                                id: 'IDS_HMS_CHILDREN_PRICE_FIRST_DAY',
                                              })}
                                        </span>
                                        &nbsp;
                                        <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_2" />
                                        &nbsp;{`${values[`hourBeforeCheckin_${idx}`]}`}&nbsp;
                                        <span>
                                          {!values[`time_${idx}`]
                                            ? intl.formatMessage({
                                                id: 'IDS_HMS_DAY',
                                              })
                                            : intl.formatMessage({
                                                id: 'IDS_HMS_HOUR',
                                              })}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <FormattedMessage id="IDS_HMS_POLICY_REFUND_OPTION_3" />
                                        &nbsp;{`${values[`hourBeforeCheckin_${idx}`]}`}&nbsp;
                                        <span>
                                          {!values[`time_${idx}`]
                                            ? intl.formatMessage({
                                                id: 'IDS_HMS_DAY',
                                              })
                                            : intl.formatMessage({
                                                id: 'IDS_HMS_HOUR',
                                              })}
                                        </span>
                                      </>
                                    )}
                                  </Typography>
                                </Row>
                              )}
                            </Row>
                          )}
                        </Fragment>
                      ))}
                    </Col>
                  </Paper>
                )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Col>
  );
};
export default RefundPolicy;
