import { Button, IconButton, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE_500, GREY_500, RED, RED_50, SECONDARY } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { ReactComponent as AddIconCircle } from '../../../../../../svg/ic_add_circle.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../svg/ic_delete.svg';
import { Col, Row } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../../common/FieldContent';
import { MAX_AGE, CHILDREN_AGE_OPTION, FEE_OPTION } from '../../../../constant';

interface Props {
  values: some;
  rushIndex: number;
  rushHourFields: some[];
  rushHourChildrenFields: some[];
  setRushHourFields(values: some): void;
}
const RushHourSurchargePolicy: React.FC<Props> = props => {
  const { values, rushHourChildrenFields, rushIndex, rushHourFields, setRushHourFields } = props;

  const {
    setFieldValue,
    submitCount,
    errors,
    touched,
    setValues,
    setErrors,
    handleReset,
  } = useFormikContext();
  const intl = useIntl();

  const errorMessage = React.useMemo(() => {
    const temp: Array<any> = [];
    Object.keys(errors).forEach((key, index) => {
      if (Object.keys(touched).includes('rush_ageTo') || submitCount > 0) {
        if (
          key.includes(`rush_${rushIndex}_ageFrom`) ||
          key.includes(`rush_${rushIndex}_ageTo`) ||
          key.includes(`rush_${rushIndex}_price`)
        )
          temp.push(Object.values(errors)[index]);
      }
    });
    return temp;
  }, [errors, rushIndex, submitCount, touched]);

  const handleRemove = React.useCallback(
    (index: number) => {
      let valueTemp: some = { ...values };
      const temp = [
        ...rushHourChildrenFields.slice(0, index),
        ...rushHourChildrenFields.slice(index + 1),
      ];
      setRushHourFields(
        rushHourFields.map((elm: some, idx: number) => {
          if (idx === rushIndex) {
            return {
              ...elm,
              rushHourChildrenFields: [...temp],
            };
          }
          return elm;
        }),
      );
      rushHourChildrenFields.forEach((elm: some, idx: number) => {
        if (idx >= index && idx < rushHourChildrenFields.length - 1) {
          valueTemp = {
            ...valueTemp,
            [`rush_${rushIndex}_ageTo_${idx}`]: values[`rush_${rushIndex}_ageTo_${idx + 1}`],
            [`rush_${rushIndex}_ageFrom_${idx}`]: values[`rush_${rushIndex}_ageFrom_${idx + 1}`],
            [`rush_${rushIndex}_price_${idx}`]: values[`rush_${rushIndex}_price_${idx + 1}`],
            [`rush_${rushIndex}_currencyId_${idx}`]: values[
              `rush_${rushIndex}_currencyId_${idx + 1}`
            ],
          };
        } else if (index < rushHourChildrenFields.length - 1) {
          valueTemp = {
            ...valueTemp,
            [`rush_${rushIndex}_ageTo_${index - 1}`]:
              values[`rush_${rushIndex}_ageFrom_${index + 1}`] - 1,
          };
        }
      });
      delete valueTemp[`rush_${rushIndex}_ageTo_${rushHourChildrenFields.length - 1}`];
      delete valueTemp[`rush_${rushIndex}_ageFrom_${rushHourChildrenFields.length - 1}`];
      if (submitCount > 0) {
        setErrors({});
        handleReset();
      }
      setValues(valueTemp);
    },
    // eslint-disable-next-line
    [rushHourChildrenFields, values, submitCount],
  );

  const handleAdd = () => {
    const valueTemp: some = {
      ...values,
      [`rush_${rushIndex}_currencyId_${rushHourChildrenFields.length}`]: 0,
      [`rush_${rushIndex}_ageTo_${rushHourChildrenFields.length}`]: values[
        `rush_${rushIndex}_ageTo_${rushHourChildrenFields.length}`
      ],
      [`rush_${rushIndex}_price_${rushHourChildrenFields.length}`]: undefined,
      [`rush_${rushIndex}_ageFrom_${rushHourChildrenFields.length}`]: values[
        `rush_${rushIndex}_ageFrom_${rushHourChildrenFields.length}`
      ],
    };
    setValues(valueTemp);
    setRushHourFields(
      rushHourFields.map((elm: some, idx: number) => {
        if (idx === rushIndex) elm.rushHourChildrenFields.push({ isDelete: false });
        return elm;
      }),
    );
  };
  return (
    <Col
      style={{
        marginLeft: 10,
      }}
    >
      <Row style={{ marginBottom: 12, width: 300 }}>
        <FieldTextContent
          name={`rush_${rushIndex}_extraBedPrice`}
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
      <Col style={{ marginRight: 32 }}>
        <Row>
          <Typography variant="subtitle1" gutterBottom>
            <FormattedMessage id="IDS_HMS_CHILDREN_PRICE" />
          </Typography>
        </Row>
        <Col>
          {rushHourChildrenFields.map((el: some, idx: number) => (
            <Fragment key={idx}>
              <Row style={{ marginTop: 8 }}>
                <Col>
                  <FieldSelectContent
                    name={`rush_${rushIndex}_ageFrom_${idx}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_AGE_FROM' })}
                    style={{ width: 100 }}
                    formControlStyle={{ minWidth: 100 }}
                    options={CHILDREN_AGE_OPTION.filter((elm, index) => {
                      if (idx === 0) return elm.id === 0;
                      return values[`rush_${rushIndex}_ageTo_${idx - 1}`] &&
                        values[`rush_${rushIndex}_ageTo_${idx - 1}`] < MAX_AGE
                        ? elm.id > values[`rush_${rushIndex}_ageTo_${idx - 1}`]
                        : elm.id;
                    })}
                    getOptionLabel={(v: any) => v.id}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rush_${rushIndex}_ageFrom_${idx}`, value);
                      if (value <= MAX_AGE)
                        setFieldValue(`rush_${rushIndex}_ageTo_${idx - 1}`, value - 1);
                    }}
                    disabled={idx === 0}
                    disableError
                    optional
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`rush_${rushIndex}_ageTo_${idx}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_AGE_TO' })}
                    style={{ width: 100 }}
                    formControlStyle={{ minWidth: 100 }}
                    options={CHILDREN_AGE_OPTION.filter((elm, index) =>
                      values[`rush_${rushIndex}_ageFrom_${idx}`]
                        ? elm.id >= values[`rush_${rushIndex}_ageFrom_${idx}`]
                        : elm.id,
                    )}
                    getOptionLabel={(v: any) => v.id}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rush_${rushIndex}_ageTo_${idx}`, value);
                      if (value < MAX_AGE)
                        setFieldValue(`rush_${rushIndex}_ageFrom_${idx + 1}`, value + 1);
                    }}
                    disableError
                    optional
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`rush_${rushIndex}_currencyId_${idx}`}
                    style={{ marginTop: 25, width: 120 }}
                    formControlStyle={{ minWidth: 120 }}
                    options={FEE_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rush_${rushIndex}_currencyId_${idx}`, value);
                    }}
                    disableError
                  />
                </Col>
                {values[`rush_${rushIndex}_currencyId_${idx}`] === 1 && (
                  <FieldTextContent
                    name={`rush_${rushIndex}_price_${idx}`}
                    style={{ width: 280 }}
                    label={intl.formatMessage({ id: 'IDS_HMS_PRICE' })}
                    value={values[`rush_${rushIndex}_price_${idx}`]}
                    inputComponent={NumberFormatCustom as any}
                    inputProps={{
                      maxLength: 12,
                    }}
                    endAdornment={
                      <span className="end-adornment" style={{ whiteSpace: 'nowrap' }}>
                        {intl.formatMessage({ id: 'IDS_HMS_POLICY_CHILDREN_UNIT' })}
                      </span>
                    }
                    disableError
                    optional
                  />
                )}
                <Col>
                  {idx > 0 && (
                    <IconButton style={{ padding: 4 }} onClick={() => handleRemove(idx)}>
                      <DeleteIcon
                        style={{ padding: 0, stroke: SECONDARY }}
                        className="svgFillAll"
                      />
                    </IconButton>
                  )}
                </Col>
              </Row>
            </Fragment>
          ))}
        </Col>
        {errorMessage.length > 0 ? (
          <Row style={{ background: RED_50, marginBottom: 16, width: 600 }}>
            <Typography style={{ color: RED, padding: '12px 24px' }} variant="body2">
              {errorMessage[0]}
            </Typography>
          </Row>
        ) : null}
        {rushHourChildrenFields.length < MAX_AGE / 2 ? (
          <Row style={{ marginBottom: 16 }}>
            <Button
              onClick={handleAdd}
              disabled={
                (values[`rush_${rushIndex}_ageTo_${rushHourChildrenFields.length - 1}`] === 12 &&
                  rushHourChildrenFields.length > 1) ||
                (values[`rush_${rushIndex}_ageTo_0`] === 12 && rushHourChildrenFields.length === 1)
              }
            >
              <AddIconCircle
                className="svgFillAll"
                style={{
                  marginRight: 4,
                  stroke:
                    (values[`rush_${rushIndex}_ageTo_${rushHourChildrenFields.length - 1}`] ===
                      12 &&
                      rushHourChildrenFields.length > 1) ||
                    (values[`rush_${rushIndex}_ageTo_0`] === 12 &&
                      rushHourChildrenFields.length === 1)
                      ? GREY_500
                      : BLUE_500,
                }}
              />
              <Typography
                variant="body2"
                style={{
                  color:
                    (values[`rush_${rushIndex}_ageTo_${rushHourChildrenFields.length - 1}`] ===
                      12 &&
                      rushHourChildrenFields.length > 1) ||
                    (values[`rush_${rushIndex}_ageTo_0`] === 12 &&
                      rushHourChildrenFields.length === 1)
                      ? GREY_500
                      : BLUE_500,
                }}
              >
                <FormattedMessage id="IDS_HMS_ADD_NEW_PRICE" />
              </Typography>
            </Button>
          </Row>
        ) : null}
      </Col>
    </Col>
  );
};
export default RushHourSurchargePolicy;
