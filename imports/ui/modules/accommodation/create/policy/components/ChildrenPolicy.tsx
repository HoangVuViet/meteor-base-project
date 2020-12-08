/* eslint-disable no-nested-ternary */
import { Button, IconButton, Paper, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { BLUE_500, GREY_500, RED, RED_50 } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { ReactComponent as DeleteIcon } from '../../../../../svg/ic_delete.svg';
import { Col, Row } from '../../../../common/components/elements';
import { NumberFormatCustom, redMark } from '../../../../common/components/Form';
import SingleSelect from '../../../../common/components/SingleSelect';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import { MAX_AGE, CHILDREN_AGE_OPTION, FEE_OPTION } from '../../../constant';

interface Props {
  values: some;
  fields: some[];
  setFields(data: some): void;
}
const ChildrenPolicy: React.FC<Props> = props => {
  const { fields, setFields, values } = props;

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
      setFields([...fields.slice(0, index), ...fields.slice(index + 1)]);
      fields.forEach((elm: some, idx: number) => {
        if (idx >= index && idx < fields.length - 1) {
          temp = {
            ...temp,
            [`ageTo_${idx}`]: values[`ageTo_${idx + 1}`],
            [`ageFrom_${idx}`]: values[`ageFrom_${idx + 1}`],
            [`price_${idx}`]: values[`price_${idx + 1}`],
            [`currencyId_${idx}`]: values[`currencyId_${idx + 1}`],
          };
        } else if (index < fields.length - 1) {
          temp = {
            ...temp,
            [`ageTo_${index - 1}`]: values[`ageFrom_${index + 1}`] - 1,
          };
        }
      });
      delete temp[`ageTo_${fields.length - 1}`];
      delete temp[`ageFrom_${fields.length - 1}`];
      if (submitCount > 0) {
        setErrors({});
        handleReset();
      }
      setValues(temp);
    },
    // eslint-disable-next-line
    [fields, values, submitCount],
  );

  const handleAdd = () => {
    const temp: some = {
      ...values,
      [`currencyId_${fields.length}`]: 0,
      [`ageTo_${fields.length}`]: values[`ageTo_${fields.length}`],
      [`price_${fields.length}`]: undefined,
      [`ageFrom_${fields.length}`]: values[`ageFrom_${fields.length}`],
    };
    if (submitCount > 0) {
      setErrors({});
      handleReset();
    }
    setValues(temp);
    setFields([...fields, { isDelete: false }]);
  };

  return (
    <Col>
      <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Col style={{ marginRight: 32 }}>
          <Typography variant="h6">
            <FormattedMessage id="IDS_HMS_CHILDREN_POLICY" />
          </Typography>
          <Col>
            <Row style={{ marginTop: 16 }}>
              <Typography variant="subtitle1" gutterBottom>
                <FormattedMessage id="IDS_HMS_POLICY_CHILDREN_AGE" />
                &nbsp;{redMark}
              </Typography>
            </Row>
            <Row style={{ marginBottom: 16 }}>
              <Typography variant="body2" style={{ marginRight: 12, whiteSpace: 'nowrap' }}>
                <FormattedMessage id="IDS_HMS_POLICY_CHILDREN_EXTRA_OPTION_3" />
              </Typography>
              <SingleSelect
                options={CHILDREN_AGE_OPTION.slice(CHILDREN_AGE_OPTION.length - 1)}
                value={MAX_AGE}
                style={{ width: 100, marginTop: 16 }}
                formControlStyle={{ minWidth: 100 }}
                getOptionLabel={(v: any) => v.id}
                disabled
              />
              <Typography variant="body2" style={{ color: RED, whiteSpace: 'nowrap' }}>
                <FormattedMessage id="IDS_HMS_POLICY_CHILDREN_EXTRA_OPTION_1" />
                &nbsp;{MAX_AGE}&nbsp;
                <FormattedMessage id="IDS_HMS_POLICY_CHILDREN_EXTRA_OPTION_2" />
              </Typography>
            </Row>
            <Row>
              <Col style={{ marginRight: 32 }}>
                <Row>
                  <Typography variant="subtitle1" gutterBottom>
                    <FormattedMessage id="IDS_HMS_CHILDREN_PRICE" />
                    &nbsp;{redMark}
                  </Typography>
                </Row>
                <Col>
                  {fields.map((el: some, idx: number) => (
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
                              return values[`ageTo_${idx - 1}`] &&
                                values[`ageTo_${idx - 1}`] < MAX_AGE
                                ? elm.id > values[`ageTo_${idx - 1}`]
                                : elm.id;
                            })}
                            getOptionLabel={(v: any) => v.id}
                            onSelectOption={(value: number) => {
                              setFieldValue(`ageFrom_${idx}`, value);
                              if (value <= MAX_AGE) setFieldValue(`ageTo_${idx - 1}`, value - 1);
                            }}
                            disabled={idx === 0}
                            disableError
                          />
                        </Col>
                        <Col>
                          <FieldSelectContent
                            name={`ageTo_${idx}`}
                            label={intl.formatMessage({ id: 'IDS_HMS_AGE_TO' })}
                            style={{ width: 100 }}
                            formControlStyle={{ minWidth: 100 }}
                            options={CHILDREN_AGE_OPTION.filter((elm, index) =>
                              values[`ageFrom_${idx}`]
                                ? elm.id >= values[`ageFrom_${idx}`]
                                : elm.id,
                            )}
                            getOptionLabel={(v: any) => v.id}
                            onSelectOption={(value: number) => {
                              setFieldValue(`ageTo_${idx}`, value);
                              if (value < MAX_AGE) setFieldValue(`ageFrom_${idx + 1}`, value + 1);
                            }}
                            disableError
                          />
                        </Col>
                        <Col>
                          <FieldSelectContent
                            name={`currencyId_${idx}`}
                            style={{ marginTop: 25, width: 120 }}
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
                        {values[`currencyId_${idx}`] === 1 && (
                          <FieldTextContent
                            name={`price_${idx}`}
                            label={intl.formatMessage({ id: 'IDS_HMS_PRICE' })}
                            style={{ width: 300 }}
                            formControlStyle={{ minWidth: 300 }}
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
                          />
                        )}
                        {idx > 0 && (
                          <IconButton style={{ padding: 4 }} onClick={() => handleRemove(idx)}>
                            <DeleteIcon
                              style={{ padding: 0, stroke: RED }}
                              className="svgFillAll"
                            />
                          </IconButton>
                        )}
                      </Row>
                    </Fragment>
                  ))}
                </Col>
                {errorMessage.length > 0 ? (
                  <Row style={{ background: RED_50, marginBottom: 16, width: 500 }}>
                    <Typography style={{ color: RED, padding: '12px 24px' }} variant="body2">
                      {errorMessage[0]}
                    </Typography>
                  </Row>
                ) : null}
                {fields.length < MAX_AGE / 2 ? (
                  <Row style={{ marginBottom: 16 }}>
                    <Button
                      onClick={handleAdd}
                      disabled={
                        (values[`ageTo_${fields.length - 1}`] === 12 && fields.length > 1) ||
                        (values.ageTo_0 === 12 && fields.length === 1)
                      }
                    >
                      <AddIconCircle
                        className="svgFillAll"
                        style={{
                          marginRight: 4,
                          stroke:
                            (values[`ageTo_${fields.length - 1}`] === 12 && fields.length > 1) ||
                            (values.ageTo_0 === 12 && fields.length === 1)
                              ? GREY_500
                              : BLUE_500,
                        }}
                      />
                      <Typography
                        variant="body2"
                        style={{
                          color:
                            (values[`ageTo_${fields.length - 1}`] === 12 && fields.length > 1) ||
                            (values.ageTo_0 === 12 && fields.length === 1)
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
            </Row>
          </Col>
        </Col>
        <Col>
          <Row style={{ marginTop: 8, paddingRight: 40 }}>
            <Col>
              <Paper variant="outlined" style={{ padding: '16px 12px', width: 400 }}>
                <Col>
                  <Row>
                    <Typography variant="body2" gutterBottom>
                      <FormattedMessage id="IDS_HMS_POLICY_PRICE_EXTRA" />
                    </Typography>
                  </Row>
                  <Row style={{ paddingLeft: 16 }}>
                    <Typography variant="body2" gutterBottom component="li" color="textSecondary">
                      <FormattedMessage id="IDS_HMS_POLICY_PRICE_EXTRA_RULE_1" />
                    </Typography>
                  </Row>
                  <Row>
                    <Typography variant="body2" gutterBottom>
                      <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA" />
                    </Typography>
                  </Row>
                  {fields.map((el: some, idx: number) => (
                    <Fragment key={idx}>
                      <Row>
                        {values[`ageFrom_${idx}`] >= 0 && values[`ageTo_${idx}`] && (
                          <Row style={{ width: 440, paddingLeft: 16 }}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              component="li"
                              color="textSecondary"
                            >
                              <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA_OPTION_1" />
                              &nbsp;{`${values[`ageFrom_${idx}`]}`}&nbsp;
                              <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA_OPTION_2" />
                              &nbsp;{`${values[`ageTo_${idx}`]}`}&nbsp;
                              {values[`price_${idx}`] > 0 ? (
                                <>
                                  <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA_OPTION_3" />
                                  &nbsp;
                                  <FormattedNumber value={values[`price_${idx}`]} />
                                  &nbsp;
                                  <FormattedMessage id="IDS_HMS_POLICY_CHILDREN_UNIT" />
                                </>
                              ) : (
                                <>
                                  <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA_OPTION_3" />
                                  &nbsp;
                                  <FormattedMessage id="IDS_HMS_CHILDREN_PRICE_EXTRA_OPTION_4" />
                                </>
                              )}
                            </Typography>
                          </Row>
                        )}
                      </Row>
                    </Fragment>
                  ))}
                </Col>
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
export default ChildrenPolicy;
