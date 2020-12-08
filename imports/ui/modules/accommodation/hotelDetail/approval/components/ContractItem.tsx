import React, { useState } from 'react';
import {
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment, { Moment } from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { some } from '../../../../../constants';
import { Row, Col } from '../../../../common/components/elements';
import { NumberFormatCustom2, redMark } from '../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import SelectDayInMonth from './SelectDayInMonth';
import {
  BLUE_500,
  GREEN,
  GREEN_100,
  ORANGE,
  ORANGE_100,
  WHITE,
  GREY_400,
  RED,
} from '../../../../../configs/colors';
import DateField from '../../../../common/components/DateField';
import { DATE_FORMAT, DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { PERIOD_LIST } from '../../../constant';
import { ReactComponent as CloseFillIcon } from '../../../../../svg/ic_close_fill.svg';

import { actionUploadContract } from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import { checkRole, isEmpty } from '../../../utils';
import DeleteContractDialog from './DeleteContractDialog';
import { ROLES } from '../../../../../layout/constants';

interface CardProps {
  index: number;
  rateTypes?: some;
  contractTypes?: some;
  contractItem: some;
  isApproval?: boolean;
  remove?: () => void;
  fetchContract?: () => void | undefined;
}
const ContractItem: React.FC<CardProps> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);
  const { index, rateTypes, contractTypes, isApproval, contractItem } = props;
  const { setFieldValue, values, errors, submitCount } = useFormikContext();
  const intl = useIntl();
  const [isExpanded, setExpanded] = useState<boolean>(!(isApproval && contractItem));
  const [fileErrorNumber, setFileError] = useState<number>(0);

  const genDaysOfWeek = () => {
    const result: Array<any> = [];
    for (let i = 2; i <= 8; i += 1) result.push({ id: i, name: i === 8 ? 'CN' : i });
    return result;
  };
  const optionsWeek = genDaysOfWeek();

  const genDaysOfMonth = () => {
    const result: Array<any> = [];
    for (let i = 1; i <= 31; i += 1) result.push({ id: i, name: i });
    return result;
  };
  const optionsMonth = genDaysOfMonth();

  const genSelectDate = (date?: Moment) => {
    return `${date ? date.format(DATE_FORMAT) : intl.formatMessage({ id: 'IDS_HMS_UNLIMITED' })}`;
  };
  const outsideRange = (e: Moment, start?: Moment) =>
    start
      ? start.startOf('day').isAfter(e)
      : moment()
          .startOf('day')
          .isAfter(e);

  const handleUploadFile = async (e: any) => {
    const { files } = e.target;
    setFileError(0);
    if (files && files.length > 0) {
      const fileUploads: any[] = [];
      const fileList = Object.values(e.target.files);
      const fileError = fileList.filter((v: any) => v?.size > 10 * 1024 * 1024);
      const fileUp = fileList.filter((v: any) => v?.size <= 10 * 1024 * 1024);
      setFileError(isEmpty(fileError) ? 0 : fileError.length);
      if (!isEmpty(fileUp)) {
        fileUp.forEach((file: any) => {
          const formData = new FormData();
          formData.append('file', file);
          fileUploads.push(dispatch(actionUploadContract(formData)));
        });
        const res = await Promise.all(fileUploads);
        const result: any[] = (values as any)[`files_${index}`]
          ? [...(values as any)[`files_${index}`]]
          : [];
        fileUp.forEach((el: any, idx: number) =>
          result.push({
            name: el?.name,
            url: res[idx]?.data?.link,
            type: res[idx]?.data?.fileType.toUpperCase(),
            thumbnail: res[idx]?.data?.thumbLink,
          }),
        );
        setFieldValue(`files_${index}`, result);
      }
    }
  };
  const isActive =
    !isEmpty(contractItem) &&
    (contractItem.endDate === null ||
      (contractItem.endDate &&
        moment().isSameOrBefore(moment(contractItem.endDate, DATE_FORMAT_BACK_END), 'days')));

  return (
    <>
      <Accordion
        className={`contract-content-item ${isExpanded ? 'add-border' : ''}`}
        expanded={isExpanded}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!isExpanded)} />}>
          <Row>
            <Typography gutterBottom variant="body1" component="p" className="contract-text">
              <FormattedMessage id="IDS_HMS_CONTRACT" />
              <span>&nbsp;{index + 1}</span>
              {isApproval && !isEmpty(contractItem) && (
                <Chip
                  label={intl.formatMessage({ id: isActive ? 'IDS_HMS_ACTIVE' : 'IDS_HMS_EXPIRE' })}
                  style={{
                    backgroundColor: isActive ? GREEN_100 : GREY_400,
                    color: isActive ? GREEN : WHITE,
                    marginLeft: 12,
                  }}
                />
              )}
            </Typography>
            {isApproval && (
              <DeleteContractDialog
                contractItem={contractItem}
                fetchContract={() => {
                  if (props.fetchContract) props?.fetchContract();
                }}
              />
            )}
          </Row>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent style={{ width: '100%' }}>
            <Grid container spacing={3}>
              {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) && (
                <Grid item xs={3}>
                  <FieldSelectContent
                    name={`rateTypeId_${index}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_RATE_TYPE' })}
                    options={rateTypes?.items || []}
                    getOptionLabel={(v: any) => v.name}
                    onSelectOption={(value: number) => {
                      setFieldValue(`rateTypeId_${index}`, value);
                      setFieldValue(`commission_${index}`, value === 1 ? 15 : 16);
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={3}>
                <FieldSelectContent
                  name={`contractTypeId_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_CONTRACT_TYPE' })}
                  options={contractTypes?.items || []}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                  getOptionLabel={(v: any) => v.name}
                  onSelectOption={(value: number) => {
                    setFieldValue(`contractTypeId_${index}`, value);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FieldTextContent
                  name={`contractCode_${index}`}
                  inputProps={{ maxLength: 1000 }}
                  label={intl.formatMessage({ id: 'IDS_HMS_CONTRACT_CODE' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_CONTRACT_CODE_PLACEHOLDER' })}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              <Grid item xs={3}>
                <FieldTextContent
                  name={`commission_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_MONEY_DISCOUNT' })}
                  optional
                  endAdornment={<span className="end-adornment">%</span>}
                  inputComponent={NumberFormatCustom2 as any}
                />
              </Grid>
            </Grid>
            <Row style={{ marginBottom: 24, paddingTop: 12, alignItems: 'start' }}>
              <Col style={{ marginRight: 16 }}>
                <Typography gutterBottom variant="body2" component="span">
                  <FormattedMessage id="IDS_HMS_CONTRACT_FILE" />
                  <>&nbsp;{redMark}</>
                </Typography>
              </Col>
              <Col>
                {((submitCount > 0 && (errors as any)[`files_${index}`]) ||
                  fileErrorNumber > 0) && (
                  <Typography gutterBottom variant="body2" component="span" style={{ color: RED }}>
                    {fileErrorNumber > 0 ? (
                      <FormattedMessage
                        id="IDS_HMS_UPLOAD_FILE_ERROR_MESSAGE"
                        values={{ num: fileErrorNumber }}
                      />
                    ) : (
                      (errors as any)[`files_${index}`]
                    )}
                  </Typography>
                )}
                {(values as any)[`files_${index}`] &&
                  (values as any)[`files_${index}`].map((item: any, i: number) => (
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="span"
                      key={i}
                      style={{ display: 'flex', color: BLUE_500 }}
                    >
                      {item?.name}&nbsp;
                      {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) && (
                        <CloseFillIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const temp = (values as any)[`files_${index}`].filter(
                              (v: any, idx: number) => idx !== i,
                            );
                            setFieldValue(`files_${index}`, temp);
                          }}
                        />
                      )}
                    </Typography>
                  ))}
                {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) && (
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    style={{ width: 100, background: ORANGE_100, color: ORANGE }}
                    onClick={() => {
                      document.getElementById(`upload_file_${index}`)?.click();
                    }}
                  >
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      id={`upload_file_${index}`}
                      accept="image/jpeg,image/png,application/pdf"
                      multiple
                      onChange={handleUploadFile}
                    />

                    <FormattedMessage id="IDS_HMS_SELECT_FILE" />
                  </Button>
                )}
              </Col>
            </Row>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <DateField
                  label={intl.formatMessage({ id: 'IDS_HMS_START_DATE' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_START_DATE' })}
                  inputStyle={{ height: 32, width: '100%' }}
                  style={{ marginRight: 0 }}
                  optional
                  renderString={() => genSelectDate((values as any)[`startDate_${index}`])}
                  onChange={(date?: Moment) => {
                    if (date) setFieldValue(`startDate_${index}`, date);
                  }}
                  isOutsideRange={outsideRange}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              <Grid item xs={3}>
                <DateField
                  label={intl.formatMessage({ id: 'IDS_HMS_END_DATE' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_END_DATE' })}
                  inputStyle={{ height: 32, width: '100%' }}
                  style={{ marginRight: 0 }}
                  optional
                  renderString={() => genSelectDate((values as any)[`endDate_${index}`])}
                  isOutsideRange={(e: Moment) =>
                    outsideRange(e, (values as any)[`startDate_${index}`])
                  }
                  onChange={(date?: Moment) => {
                    setFieldValue(`endDate_${index}`, date);
                  }}
                  errorMessage={submitCount > 0 && (errors as any)[`endDate_${index}`]}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              <Grid item xs={3}>
                <FieldSelectContent
                  name={`paymentTime_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_PAYMENT_PERIOD' })}
                  options={PERIOD_LIST}
                  getOptionLabel={(v: any) => intl.formatMessage({ id: v.name })}
                  onSelectOption={(value: any) => {
                    setFieldValue(`paymentTimeValue_${index}`, undefined);
                    setFieldValue(`paymentTime_${index}`, value);
                  }}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              {(values as any)[`paymentTime_${index}`] &&
                (values as any)[`paymentTime_${index}`] !== 'BOOKING' && (
                  <Grid item xs={3}>
                    <SelectDayInMonth
                      name={`paymentTimeValue_${index}`}
                      label={intl.formatMessage({
                        id:
                          (values as any)[`paymentTime_${index}`] === 'WEEKLY'
                            ? 'IDS_HMS_SELECT_DAY'
                            : 'chosenDate',
                      })}
                      value={(values as any)[`paymentTimeValue_${index}`]}
                      options={
                        (values as any)[`paymentTime_${index}`] === 'WEEKLY'
                          ? optionsWeek
                          : optionsMonth
                      }
                      multiple={(values as any)[`paymentTime_${index}`] === 'TWICE_MONTHLY'}
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: any) => {
                        if (
                          (values as any)[`paymentTime_${index}`] === 'TWICE_MONTHLY' &&
                          value.length > 2
                        )
                          return;
                        setFieldValue(`paymentTimeValue_${index}`, value);
                      }}
                      disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                    />
                  </Grid>
                )}
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FieldSelectContent
                  name={`hotelInvoiceTypeId_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_EXPORT_INFORM' })}
                  options={
                    !isEmpty(contractTypes?.items)
                      ? contractTypes?.items.filter(
                          (v: some) => v.id === (values as any)[`contractTypeId_${index}`],
                        )[0]?.items
                      : []
                  }
                  getOptionLabel={(v: any) => v.name}
                  onSelectOption={(value: any) => {
                    setFieldValue(`hotelInvoiceTypeId_${index}`, value);
                  }}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              <Grid item xs={3}>
                <FieldSelectContent
                  name={`crossCheckingTime_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_CHECK_PERIOD' })}
                  options={PERIOD_LIST}
                  getOptionLabel={(v: any) => intl.formatMessage({ id: v.name })}
                  onSelectOption={(value: any) => {
                    setFieldValue(`crossCheckingTimeValue_${index}`, undefined);
                    setFieldValue(`crossCheckingTime_${index}`, value);
                  }}
                  disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                />
              </Grid>
              {(values as any)[`crossCheckingTime_${index}`] &&
                (values as any)[`crossCheckingTime_${index}`] !== 'BOOKING' && (
                  <Grid item xs={3}>
                    <SelectDayInMonth
                      name={`crossCheckingTimeValue_${index}`}
                      label={intl.formatMessage({
                        id:
                          (values as any)[`crossCheckingTime_${index}`] === 'WEEKLY'
                            ? 'IDS_HMS_SELECT_DAY'
                            : 'chosenDate',
                      })}
                      value={(values as any)[`crossCheckingTimeValue_${index}`]}
                      options={
                        (values as any)[`crossCheckingTime_${index}`] === 'WEEKLY'
                          ? optionsWeek
                          : optionsMonth
                      }
                      multiple={(values as any)[`crossCheckingTime_${index}`] === 'TWICE_MONTHLY'}
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: any) => {
                        if (
                          (values as any)[`crossCheckingTime_${index}`] === 'TWICE_MONTHLY' &&
                          value.length > 2
                        )
                          return;
                        setFieldValue(`crossCheckingTimeValue_${index}`, value);
                      }}
                      disabled={!checkRole(ROLES.HMS_PRE_ADMIN, roleUser)}
                    />
                  </Grid>
                )}
            </Grid>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default React.memo(ContractItem);
