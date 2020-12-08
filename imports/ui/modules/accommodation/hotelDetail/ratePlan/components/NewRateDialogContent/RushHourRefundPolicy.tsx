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
  rushIndex: number;
  rushHourRefundFields: some[];
  rushHourFields: some[];
  setRushHourFields(values: some): void;
}
const RushHourRefundPolicy: React.FC<Props> = props => {
  const { values, rushHourRefundFields, setRushHourFields, rushHourFields, rushIndex } = props;

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
        Object.keys(touched).includes(`rush_${rushIndex}_hourBeforeCheckin`) ||
        Object.keys(touched).includes(`rush_${rushIndex}_percentage`) ||
        submitCount > 0
      ) {
        if (
          key.includes(`rush_${rushIndex}_percentage`) ||
          key.includes(`rush_${rushIndex}_hourBeforeCheckin`)
        )
          temp.push(Object.values(errors)[index]);
      }
    });
    return temp;
  }, [errors, rushIndex, submitCount, touched]);

  const handleRefundFieldRemove = (index: number) => {
    let valueTemp: some = { ...values };
    const temp = [
      ...rushHourRefundFields.slice(0, index),
      ...rushHourRefundFields.slice(index + 1),
    ];
    setRushHourFields(
      rushHourFields.map((elm: some, idx: number) => {
        if (idx === rushIndex) {
          return {
            ...elm,
            rushHourRefundFields: [...temp],
          };
        }
        return elm;
      }),
    );

    rushHourRefundFields.forEach((elm: some, idx: number) => {
      if (idx >= index) {
        valueTemp = {
          ...valueTemp,
          [`rush_${rushIndex}_hourBeforeCheckin_${idx}`]: values[
            `rush_${rushIndex}_hourBeforeCheckin_${idx + 1}`
          ],
          [`rush_${rushIndex}_percentage_${idx}`]: values[
            `rush_${rushIndex}_percentage_${idx + 1}`
          ],
          [`rush_${rushIndex}_basePriceType_${idx}`]: values[
            `rush_${rushIndex}_basePriceType_${idx + 1}`
          ],
          [`rush_${rushIndex}_feeId_${idx}`]: values[`rush_${rushIndex}_feeId_${idx + 1}`],
          [`rush_${rushIndex}_time_${idx}`]: values[`rush_${rushIndex}_time_${idx + 1}`],
        };
      }
    });
    if (submitCount > 0) {
      setErrors({});
      handleReset();
    }
    setValues(valueTemp);
  };

  const handleRefundFieldAdd = () => {
    const valueTemp: some = {
      ...values,
      [`rush_${rushIndex}_time_${rushHourRefundFields.length}`]: 0,
      [`rush_${rushIndex}_basePriceType_${rushHourRefundFields.length}`]: 1,
      [`rush_${rushIndex}_hourBeforeCheckin_${rushHourRefundFields.length}`]: undefined,
      [`rush_${rushIndex}_percentage_${rushHourRefundFields.length}`]: undefined,
      [`rush_${rushIndex}_feeId_${rushHourRefundFields.length}`]: 0,
    };
    setValues(valueTemp);
    setRushHourFields(
      rushHourFields.map((elm: some, idx: number) => {
        if (idx === rushIndex) elm.rushHourRefundFields.push({ isDelete: false });
        return elm;
      }),
    );
  };
  return (
    <Col style={{ marginLeft: 10 }}>
      <Row style={{ marginBottom: 12 }}>
        <Typography variant="subtitle2" component="p">
          <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_IS_REFUND" />
        </Typography>
        <CustomSwitch
          size="medium"
          checked={values[`rush_${rushIndex}_allowCancel`]}
          onChange={() =>
            setFieldValue(`rush_${rushIndex}_allowCancel`, !values[`rush_${rushIndex}_allowCancel`])
          }
        />
      </Row>
      <Collapse in={values[`rush_${rushIndex}_allowCancel`]}>
        <Col>
          {rushHourRefundFields.map((el: some, idx: number) => (
            <Fragment key={idx}>
              <Row>
                <Col>
                  <FieldTextContent
                    name={`rush_${rushIndex}_hourBeforeCheckin_${idx}`}
                    style={{ width: 110, borderRadius: '4px 0px 0px 4px' }}
                    inputComponent={NumberFormatCustom as any}
                    formControlStyle={{ minWidth: 110, width: 'auto', marginRight: 0 }}
                    label={intl.formatMessage({ id: 'IDS_HMS_POLICY_BEFORE_CHECKIN' })}
                    inputProps={{ maxLength: 3 }}
                    disableError
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`rush_${rushIndex}_time_${idx}`}
                    label={null}
                    style={{
                      width: 96,
                      borderRadius: '0px 4px 4px 0px',
                      background: GREY_100,
                      borderLeft: 0,
                      marginTop: 24,
                    }}
                    formControlStyle={{ minWidth: 96, width: 'auto' }}
                    options={TIME_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rush_${rushIndex}_time_${idx}`, value);
                    }}
                    disableError
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`rush_${rushIndex}_feeId_${idx}`}
                    style={{ marginTop: 24, width: 120 }}
                    formControlStyle={{ minWidth: 120 }}
                    options={FEE_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rush_${rushIndex}_feeId_${idx}`, value);
                      if (value === 0)
                        setFieldValue(`rush_${rushIndex}_percentage_${idx}`, undefined);
                    }}
                    disableError
                  />
                </Col>
                {values[`rush_${rushIndex}_feeId_${idx}`] === 1 && (
                  <>
                    <Col>
                      <FieldTextContent
                        name={`rush_${rushIndex}_percentage_${idx}`}
                        label={intl.formatMessage({ id: 'IDS_HMS_PAID' })}
                        style={{ width: 80, borderRadius: '4px 0px 0px 4px' }}
                        inputComponent={NumberFormatCustom as any}
                        formControlStyle={{ minWidth: 80, width: 'auto', marginRight: 0 }}
                        inputProps={{
                          maxLength: 3,
                        }}
                        disableError
                      />
                    </Col>
                    <Col>
                      <FieldSelectContent
                        name={`rush_${rushIndex}_basePriceType_${idx}`}
                        style={{
                          marginTop: 24,
                          width: 220,
                          borderRadius: '0px 4px 4px 0px',
                          background: GREY_100,
                          borderLeft: 0,
                        }}
                        label={null}
                        formControlStyle={{ minWidth: 220, width: 'auto' }}
                        options={UNIT_OPTION}
                        getOptionLabel={value => intl.formatMessage({ id: value.name })}
                        onSelectOption={(value: number) => {
                          setFieldValue(`rush_${rushIndex}_basePriceType_${idx}`, value);
                        }}
                        disableError
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
          <Button onClick={handleRefundFieldAdd}>
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
export default RushHourRefundPolicy;
