import {
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import { Field, useFormikContext } from 'formik';
import moment, { Moment } from 'moment';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE_500, GREY_600, ORANGE_100, SECONDARY, TEAL } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { ReactComponent as DeleteIcon } from '../../../../../../svg/ic_delete.svg';
import { Col, Row } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldDateRangeFormControl, FieldTextContent } from '../../../../common/FieldContent';
import RushHourRefundPolicy from './RushHourRefundPolicy';
import RushHourSurchargePolicy from './RushHourSurchargePolicy';

interface Props {
  values: some;
  rushHourFields: some[];
  setRushHourFields: (value: some[]) => void;
}

const NewRateRushHour: React.FC<Props> = props => {
  const { rushHourFields, setRushHourFields, values } = props;
  const intl = useIntl();
  const { setFieldValue, setValues } = useFormikContext();

  const outsideRange = (e: Moment, start?: Moment) =>
    start
      ? start.startOf('day').isAfter(e)
      : moment()
          .startOf('day')
          .isAfter(e);

  const handleRushHourFieldsRemove = (index: number) => {
    const nextToDeletedElm = rushHourFields.find((el, idx) => idx === index + 1);

    let temp: some = {
      ...values,
      [`fromDate_${index}`]: values[`fromDate_${index + 1}`],
      [`toDate_${index}`]: values[`toDate_${index + 1}`],
      [`rush_${index}_allowCancel`]: values[`rush_${index + 1}_allowCancel`],
      [`rush_${index}_extraBedPrice`]: values[`rush_${index + 1}_extraBedPrice`],
      [`rush_${index}_maxStaying`]: values[`rush_${index + 1}_maxStaying`],
      [`rush_${index}_minStaying`]: values[`rush_${index + 1}_minStaying`],
      [`rushHourSurchargePolicy_${index}`]: values[`rushHourSurchargePolicy_${index + 1}`],
      [`rushHourNightStaying_${index}`]: values[`rushHourNightStaying_${index + 1}`],
      [`rushHourCancellationPolicy_${index}`]: values[`rushHourCancellationPolicy_${index + 1}`],
    };
    nextToDeletedElm?.rushHourRefundFields.forEach((elm: some, idx: number) => {
      temp = {
        ...temp,
        [`rush_${index}_hourBeforeCheckin_${idx}`]: values[
          `rush_${index + 1}_hourBeforeCheckin_${idx}`
        ],
        [`rush_${index}_percentage_${idx}`]: values[`rush_${index + 1}_percentage_${idx}`],
        [`rush_${index}_basePriceType_${idx}`]: values[`rush_${index + 1}_basePriceType_${idx}`],
        [`rush_${index}_time_${idx}`]: values[`rush_${index + 1}_time_${idx}`],
        [`rush_${index}_feeId_${idx}`]: values[`rush_${index + 1}_feeId_${idx}`],
      };
    });
    nextToDeletedElm?.rushHourChildrenFields.forEach((elm: some, idx: number) => {
      temp = {
        ...temp,
        [`rush_${index}_ageTo_${idx}`]: values[`rush_${index + 1}_ageTo_${idx}`],
        [`rush_${index}_ageFrom_${idx}`]: values[`rush_${index + 1}_ageFrom_${idx}`],
        [`rush_${index}_basePriceType_${idx}`]: values[`rush_${index + 1}_basePriceType_${idx}`],
        [`rush_${index}_price_${idx}`]: values[`rush_${index + 1}_price_${idx}`],
        [`rush_${index}_currencyId_${idx}`]: values[`rush_${index + 1}_currencyId_${idx}`],
      };
    });
    setValues(temp);
    setRushHourFields([...rushHourFields.slice(0, index), ...rushHourFields.slice(index + 1)]);
  };

  const handleRushHourFieldsAdd = () => {
    const temp: some = {
      ...values,
      [`fromDate_${rushHourFields.length}`]: undefined,
      [`toDate_${rushHourFields.length}`]: undefined,
      [`rush_${rushHourFields.length}_extraBedPrice`]: undefined,
      [`rush_${rushHourFields.length}_maxStaying`]: undefined,
      [`rush_${rushHourFields.length}_minStaying`]: undefined,
      [`rushHourSurchargePolicy_${rushHourFields.length}`]: undefined,
      [`rushHourNightStaying_${rushHourFields.length}`]: undefined,
      [`rushHourCancellationPolicy_${rushHourFields.length}`]: undefined,
      [`rush_${rushHourFields.length}_allowCancel`]: true,
      [`rush_${rushHourFields.length}_time_0`]: 0,
      [`rush_${rushHourFields.length}_ageFrom_0`]: 0,
      [`rush_${rushHourFields.length}_currencyId_0`]: 0,
      [`rush_${rushHourFields.length}_basePriceType_0`]: 1,
      [`rush_${rushHourFields.length}_feeId_0`]: 0,
    };
    setValues(temp);
    setRushHourFields([
      ...rushHourFields,
      {
        rushHourRefundFields: [{ isDelete: false }],
        rushHourChildrenFields: [{ isDelete: false }],
      },
    ]);
  };
  return (
    <Col style={{ marginTop: 12 }}>
      <div
        style={{
          border: rushHourFields.length > 0 ? '0.5px solid #BDBDBD' : '',
          maxWidth: 840,
          borderRadius: 8,
        }}
      >
        {rushHourFields.map((el: some, idx: number) => {
          return (
            <Fragment key={idx}>
              <Col style={{ marginBottom: 12, marginLeft: 10, marginTop: 10 }}>
                <Row style={{ marginBottom: 4, maxWidth: 800 }}>
                  <Typography
                    style={{ marginLeft: 4, color: TEAL, flex: 1 }}
                    variant="subtitle2"
                    component="p"
                  >
                    <FormattedMessage id="IDS_HMS_CREATE_NEW_RUSH_HOUR_STAGE" />
                    &nbsp;{idx + 1}
                  </Typography>
                  <IconButton
                    style={{ padding: 4 }}
                    onClick={() => handleRushHourFieldsRemove(idx)}
                  >
                    <DeleteIcon style={{ padding: 0, stroke: GREY_600 }} className="svgFillAll" />
                  </IconButton>
                </Row>
                <Divider style={{ marginBottom: 16, maxWidth: 800 }} />
                <Col style={{ marginLeft: 6 }}>
                  <FieldDateRangeFormControl
                    name={`fromDate_${idx}`}
                    startDate={
                      values[`fromDate_${idx}`] &&
                      moment(values[`fromDate_${idx}`], DATE_FORMAT_BACK_END, true).isValid()
                        ? moment(values[`fromDate_${idx}`], DATE_FORMAT_BACK_END, true)
                        : undefined
                    }
                    endDate={
                      values[`toDate_${idx}`] &&
                      moment(values[`toDate_${idx}`], DATE_FORMAT_BACK_END, true).isValid()
                        ? moment(values[`toDate_${idx}`], DATE_FORMAT_BACK_END, true)
                        : undefined
                    }
                    style={{ marginRight: 10, maxWidth: 400, marginBottom: 16 }}
                    optional
                    onChange={(startDate: any, endDate: any) => {
                      setFieldValue(`fromDate_${idx}`, startDate?.format(DATE_FORMAT_BACK_END));
                      setFieldValue(`toDate_${idx}`, endDate?.format(DATE_FORMAT_BACK_END));
                    }}
                    isOutsideRange={outsideRange}
                    label={intl.formatMessage({ id: 'IDS_HMS_DATE_RANGE_PICKER' })}
                  />
                  <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon style={{ color: BLUE_500 }} />}
                    defaultExpandIcon={<ChevronRightIcon style={{ color: BLUE_500 }} />}
                    multiSelect
                    disableSelection
                  >
                    <TreeItem
                      nodeId="1"
                      label={
                        <Typography
                          style={{ marginLeft: 4, color: BLUE_500 }}
                          variant="body2"
                          component="p"
                        >
                          <FormattedMessage id="IDS_HMS_REFUND_POLICY" />
                        </Typography>
                      }
                      style={{ marginBottom: 12 }}
                    >
                      <Row>
                        <Field
                          name={`rushHourCancellationPolicy_${idx}`}
                          as={(propsField: any) => (
                            <Row>
                              <RadioGroup {...propsField} row>
                                <FormControlLabel
                                  value="no"
                                  style={{ paddingRight: 28 }}
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_RATE_PLAN_POLICY_UNCHANGED" />
                                    </Typography>
                                  }
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_POLICY_NEW_APPLIED" />
                                    </Typography>
                                  }
                                />
                              </RadioGroup>
                            </Row>
                          )}
                        />
                      </Row>
                      <Collapse in={values[`rushHourCancellationPolicy_${idx}`] === 'yes'}>
                        <RushHourRefundPolicy
                          values={values}
                          rushIndex={idx}
                          rushHourFields={rushHourFields}
                          rushHourRefundFields={el.rushHourRefundFields}
                          setRushHourFields={setRushHourFields}
                        />
                      </Collapse>
                    </TreeItem>
                    <TreeItem
                      nodeId="2"
                      label={
                        <Typography
                          style={{ marginLeft: 4, color: BLUE_500 }}
                          variant="body2"
                          component="p"
                        >
                          <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_POLICY_SURCHARGE" />
                        </Typography>
                      }
                      style={{ marginBottom: 12 }}
                    >
                      <Row>
                        <Field
                          name={`rushHourSurchargePolicy_${idx}`}
                          as={(propsField: any) => (
                            <Row>
                              <RadioGroup {...propsField} row>
                                <FormControlLabel
                                  value="no"
                                  style={{ paddingRight: 28, marginBottom: 12 }}
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_RATE_PLAN_POLICY_UNCHANGED" />
                                    </Typography>
                                  }
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_POLICY_NEW_APPLIED" />
                                    </Typography>
                                  }
                                />
                              </RadioGroup>
                            </Row>
                          )}
                        />
                      </Row>
                      <Collapse in={values[`rushHourSurchargePolicy_${idx}`] === 'yes'}>
                        <RushHourSurchargePolicy
                          values={values}
                          rushIndex={idx}
                          rushHourFields={rushHourFields}
                          rushHourChildrenFields={el.rushHourChildrenFields}
                          setRushHourFields={setRushHourFields}
                        />
                      </Collapse>
                    </TreeItem>
                    <TreeItem
                      nodeId="3"
                      label={
                        <Typography
                          style={{ marginLeft: 4, color: BLUE_500 }}
                          variant="body2"
                          component="p"
                        >
                          <FormattedMessage id="IDS_HMS_CREATE_NEW_MIN_MAX_STAYING" />
                        </Typography>
                      }
                      style={{ marginBottom: 20 }}
                    >
                      <Row>
                        <Field
                          name={`rushHourNightStaying_${idx}`}
                          as={(propsField: any) => (
                            <Row>
                              <RadioGroup {...propsField} row>
                                <FormControlLabel
                                  value="no"
                                  style={{ paddingRight: 28 }}
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_RATE_PLAN_POLICY_UNCHANGED" />
                                    </Typography>
                                  }
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                                  label={
                                    <Typography variant="body2">
                                      <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_POLICY_NEW_APPLIED" />
                                    </Typography>
                                  }
                                />
                              </RadioGroup>
                            </Row>
                          )}
                        />
                      </Row>
                      <Collapse in={values[`rushHourNightStaying_${idx}`] === 'yes'}>
                        <Col style={{ marginLeft: 10 }}>
                          <Row>
                            <Typography
                              style={{ marginRight: 16, whiteSpace: 'nowrap' }}
                              variant="subtitle2"
                              component="p"
                            >
                              <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_MIN_DAY_STAYING" />
                            </Typography>
                            <FieldTextContent
                              name={`rush_${idx}_minStaying`}
                              style={{ width: 120, marginTop: 16 }}
                              formControlStyle={{ minWidth: 120 }}
                              inputComponent={NumberFormatCustom as any}
                              inputProps={{ maxLength: 3 }}
                              optional
                              placeholder={intl.formatMessage({ id: 'IDS_HMS_ENTER_NIGHT' })}
                            />
                          </Row>
                          <Row>
                            <Typography
                              style={{ marginRight: 32, whiteSpace: 'nowrap' }}
                              variant="subtitle2"
                              component="p"
                            >
                              <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_MAX_DAY_STAYING" />
                            </Typography>
                            <FieldTextContent
                              name={`rush_${idx}_maxStaying`}
                              style={{ width: 120, marginTop: 16 }}
                              formControlStyle={{ minWidth: 120 }}
                              inputComponent={NumberFormatCustom as any}
                              inputProps={{ maxLength: 3 }}
                              optional
                              placeholder={intl.formatMessage({ id: 'IDS_HMS_ENTER_NIGHT' })}
                            />
                          </Row>
                        </Col>
                      </Collapse>
                    </TreeItem>
                  </TreeView>
                </Col>
              </Col>
            </Fragment>
          );
        })}
      </div>
      <Button
        onClick={handleRushHourFieldsAdd}
        style={{
          backgroundColor: ORANGE_100,
          width: 240,
          marginTop: rushHourFields.length > 0 ? 24 : 0,
        }}
        variant="contained"
        disableElevation
        fullWidth
      >
        <AddCircleIcon style={{ color: SECONDARY, marginRight: 4 }} />
        <Typography style={{ color: SECONDARY, whiteSpace: 'nowrap' }} variant="body2">
          <FormattedMessage id="IDS_HMS_CREATE_NEW_RUSH_HOUR" />
        </Typography>
      </Button>
    </Col>
  );
};
export default NewRateRushHour;
