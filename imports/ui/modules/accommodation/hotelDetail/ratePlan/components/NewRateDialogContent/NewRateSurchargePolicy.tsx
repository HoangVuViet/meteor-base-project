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
import { CHILDREN_AGE_OPTION, FEE_OPTION, MAX_AGE } from '../../../../constant';

interface Props {
  values: some;
  childrenFields: some[];
  setChildrenFields(values: some): void;
}
const NewRateSurchargePolicy: React.FC<Props> = props => {
  const { values, childrenFields, setChildrenFields } = props;

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
      if (
        Object.keys(touched).includes('ageTo') ||
        Object.keys(touched).includes('ageFrom') ||
        submitCount > 0
      ) {
        if (key.includes('ageFrom') || key.includes('ageTo') || key.includes('price'))
          temp.push(Object.values(errors)[index]);
      }
    });
    return temp;
  }, [errors, submitCount, touched]);
  const handleRemove = React.useCallback(
    (index: number) => {
      let temp: some = { ...values };
      setChildrenFields([...childrenFields.slice(0, index), ...childrenFields.slice(index + 1)]);
      childrenFields.forEach((elm: some, idx: number) => {
        if (idx >= index && idx < childrenFields.length - 1) {
          temp = {
            ...temp,
            [`ageTo_${idx}`]: values[`ageTo_${idx + 1}`],
            [`ageFrom_${idx}`]: values[`ageFrom_${idx + 1}`],
            [`price_${idx}`]: values[`price_${idx + 1}`],
            [`currencyId_${idx}`]: values[`currencyId_${idx + 1}`],
          };
        } else if (index < childrenFields.length - 1) {
          temp = {
            ...temp,
            [`ageTo_${index - 1}`]: values[`ageFrom_${index + 1}`] - 1,
          };
        }
      });
      delete temp[`ageTo_${childrenFields.length - 1}`];
      delete temp[`ageFrom_${childrenFields.length - 1}`];
      if (submitCount > 0) {
        setErrors({});
        handleReset();
      }
      setValues(temp);
    },
    // eslint-disable-next-line
    [childrenFields, values, submitCount],
  );

  const handleAdd = () => {
    const temp: some = {
      ...values,
      [`currencyId_${childrenFields.length}`]: 0,
      [`ageTo_${childrenFields.length}`]: values[`ageTo_${childrenFields.length}`],
      [`price_${childrenFields.length}`]: undefined,
      [`ageFrom_${childrenFields.length}`]: values[`ageFrom_${childrenFields.length}`],
    };
    setValues(temp);
    setChildrenFields([...childrenFields, { isDelete: false }]);
  };

  return (
    <Col
      style={{
        marginLeft: 33,
        paddingLeft: 20,
        borderLeft: `1px solid ${BLUE_500}`,
        marginBottom: 12,
      }}
    >
      <Col style={{ marginRight: 32 }}>
        <Row>
          <Typography variant="subtitle2" gutterBottom>
            <FormattedMessage id="IDS_HMS_CHILDREN_PRICE" />
          </Typography>
        </Row>
        <Col>
          {childrenFields.map((el: some, idx: number) => (
            <Fragment key={idx}>
              <Row style={{ marginTop: 8 }}>
                <Col>
                  <FieldSelectContent
                    name={`ageFrom_${idx}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_AGE_FROM' })}
                    style={{ width: 100 }}
                    formControlStyle={{ minWidth: 100 }}
                    options={CHILDREN_AGE_OPTION.filter((elm, index) => {
                      if (idx === 0) return elm.id === 0;
                      return values[`ageTo_${idx - 1}`] && values[`ageTo_${idx - 1}`] < MAX_AGE
                        ? elm.id > values[`ageTo_${idx - 1}`]
                        : elm.id;
                    })}
                    getOptionLabel={(v: any) => v.id}
                    onSelectOption={(value: number) => {
                      if (value <= MAX_AGE) setFieldValue(`ageTo_${idx - 1}`, value - 1);
                      setFieldValue(`ageFrom_${idx}`, value);
                    }}
                    disabled={idx === 0}
                    disableError
                    optional
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`ageTo_${idx}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_AGE_TO' })}
                    style={{ width: 100 }}
                    formControlStyle={{ minWidth: 100 }}
                    options={CHILDREN_AGE_OPTION.filter((elm, index) =>
                      values[`ageFrom_${idx}`] ? elm.id >= values[`ageFrom_${idx}`] : elm.id,
                    )}
                    getOptionLabel={(v: any) => v.id}
                    onSelectOption={(value: number) => {
                      if (value < MAX_AGE) setFieldValue(`ageFrom_${idx + 1}`, value + 1);
                      setFieldValue(`ageTo_${idx}`, value);
                    }}
                    disableError
                    optional
                  />
                </Col>
                <Col>
                  <FieldSelectContent
                    name={`currencyId_${idx}`}
                    style={{ marginTop: 24, width: 120 }}
                    formControlStyle={{ minWidth: 120 }}
                    options={FEE_OPTION}
                    getOptionLabel={value => intl.formatMessage({ id: value.name })}
                    onSelectOption={(value: number) => {
                      setFieldValue(`currencyId_${idx}`, value);
                      if (value === 0) setFieldValue(`price_${idx}`, undefined);
                    }}
                    disableError
                  />
                </Col>
                <Col>
                  {values[`currencyId_${idx}`] === 1 && (
                    <FieldTextContent
                      name={`price_${idx}`}
                      style={{ width: 280 }}
                      label={intl.formatMessage({ id: 'IDS_HMS_PRICE' })}
                      value={values[`price_${idx}`]}
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
                </Col>
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
          <Row style={{ background: RED_50, width: 600 }}>
            <Typography style={{ color: RED, padding: '12px 24px' }} variant="body2">
              {errorMessage[0]}
            </Typography>
          </Row>
        ) : null}
        {childrenFields.length < MAX_AGE / 2 ? (
          <Row style={{ marginBottom: 16 }}>
            <Button
              style={{ padding: 0 }}
              onClick={handleAdd}
              disabled={
                (values[`ageTo_${childrenFields.length - 1}`] === 12 &&
                  childrenFields.length > 1) ||
                (values.ageTo_0 === 12 && childrenFields.length === 1)
              }
            >
              <AddIconCircle
                className="svgFillAll"
                style={{
                  marginRight: 4,
                  stroke:
                    (values[`ageTo_${childrenFields.length - 1}`] === 12 &&
                      childrenFields.length > 1) ||
                    (values.ageTo_0 === 12 && childrenFields.length === 1)
                      ? GREY_500
                      : BLUE_500,
                }}
              />
              <Typography
                variant="body2"
                style={{
                  color:
                    (values[`ageTo_${childrenFields.length - 1}`] === 12 &&
                      childrenFields.length > 1) ||
                    (values.ageTo_0 === 12 && childrenFields.length === 1)
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
export default NewRateSurchargePolicy;
