import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormControlLabel, FormGroup, Grid, Paper, Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import moment, { Moment } from 'moment';
import ConfirmDialog from '../../../../../common/components/ConfirmDialog';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import { snackbarSetting } from '../../../../../common/components/elements';
import { GREY_600 } from '../../../../../../configs/colors';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { AppState } from '../../../../../../redux/reducers';
import { actionUpdateRateAllotment } from '../../../../accommodationService';
import { WhiteBackgroundCheckbox } from '../../../../common/WhiteBackgroundCheckbox';
import DateRangeFormControl from '../../../../../common/components/DateRangeFormControl';
import { dayInWeek } from '../../../../constant';
import { convertDateToRange } from '../../utils';

interface Props {
  fetchData: () => void;
  handleClose: () => void;
  standardAdult: number;
  rateSelected: some | null;
}

const SetupPriceDialog: React.FC<Props> = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { standardAdult, rateSelected, fetchData, handleClose } = props;
  const match: any = useRouteMatch();

  const [guestData, setGuests] = useState<some>({});
  const [isAdvance, setAdvance] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Moment>(moment());
  const [endDate, setEndDate] = useState<Moment>(moment());
  const [daySelected, setDaySelected] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const handleResponse = (res: any) => {
    if (res?.code === SUCCESS_CODE) {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
      );
      fetchData();
      handleClose();
    } else {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };
  const handleSubmit = async () => {
    try {
      const searchStr = querystring.stringify({
        hotelId: match?.params?.hotelId,
        ratePlanRoomCode: rateSelected?.ratePlanRoomCode,
      });

      const res = await dispatch(
        actionUpdateRateAllotment(searchStr, {
          ranges: convertDateToRange(startDate, endDate, daySelected),
          guests: guestData,
        }),
      );
      handleResponse(res);
    } catch (error) {}
  };
  return (
    <>
      <ConfirmDialog
        open
        maxWidth="xs"
        onClose={handleClose}
        onReject={handleClose}
        onAccept={handleSubmit}
        titleLabel={
          <Typography gutterBottom variant="subtitle1" component="span" className="header-dialog">
            {rateSelected?.name}
          </Typography>
        }
        acceptLabel="accept"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="schedule-dialog-content">
          <Typography variant="body2" className="text-description">
            <FormattedMessage id="IDS_HMS_SETTING_PRICE_DESCRIPTION" />
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="span">
            <FormattedMessage id="IDS_HMS_SELECT_RANGE_DATE" />
          </Typography>
          <DateRangeFormControl
            style={{ marginRight: 10, minWidth: 278 }}
            optional
            startDate={startDate}
            endDate={endDate}
            onChange={(start, end) => {
              if (start) setStartDate(start);
              if (end) setEndDate(end);
            }}
            isOutsideRange={(e: any) =>
              moment()
                .startOf('day')
                .isAfter(e)
            }
          />
          <Paper className="popper-paper">
            <FormControlLabel
              control={
                <WhiteBackgroundCheckbox
                  checked={isAdvance}
                  onChange={e => setAdvance(e.target.checked)}
                />
              }
              label={
                <Typography variant="subtitle2" component="p" style={{ fontWeight: 600 }}>
                  <FormattedMessage id="IDS_HMS_SELECT_ADVANCE" />
                </Typography>
              }
            />
            <Typography style={{ color: GREY_600, marginBottom: 12 }} variant="body2" component="p">
              <FormattedMessage id="IDS_HMS_SELECT_ADVANCE_DESCRIPTION" />
            </Typography>
            {isAdvance && (
              <FormGroup row style={{ width: 330 }}>
                {dayInWeek.map((elm, idx) => (
                  <div key={idx} style={{ width: '33%', marginTop: -12 }}>
                    <FormControlLabel
                      control={
                        <WhiteBackgroundCheckbox
                          checked={daySelected.includes(elm.value)}
                          onChange={e => {
                            if (e.target.checked) {
                              setDaySelected([...daySelected, elm.value]);
                            } else {
                              setDaySelected(daySelected.filter(v => v !== elm.value));
                            }
                          }}
                          name={elm.alias}
                        />
                      }
                      style={{ padding: 0 }}
                      label={
                        <Typography variant="subtitle2" component="p">
                          {elm.title}
                        </Typography>
                      }
                    />
                  </div>
                ))}
              </FormGroup>
            )}
          </Paper>
          <Paper variant="outlined" square className="paper-container">
            <Grid container spacing={3} className="paper-header">
              <Grid item xs={3}>
                <Typography variant="body2">
                  <FormattedMessage id="IDS_HMS_CUSTOMER_NUMBER" />
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body2" style={{ marginLeft: 12 }}>
                  <FormattedMessage id="IDS_HMS_CUSTOMER_PRICE" />
                </Typography>
              </Grid>
            </Grid>
            {standardAdult > 0 &&
              Array(standardAdult)
                .fill(0)
                .map((v, index: number) => (
                  <Grid
                    container
                    spacing={3}
                    key={index}
                    style={{ borderBottom: index === standardAdult - 1 ? 'none' : undefined }}
                  >
                    <Grid item xs={3} className="text-item">
                      <Typography variant="body2">{standardAdult - index}</Typography>
                    </Grid>
                    <Grid item xs={9} style={{ maxWidth: 180, paddingBottom: 0 }}>
                      {index === 0 ? (
                        <Typography variant="body2" style={{ maxWidth: 180, marginBottom: 12 }}>
                          <FormattedMessage id="IDS_HMS_STANDARD_PRICE" />
                        </Typography>
                      ) : (
                        <>
                          <FormControlTextField
                            label={null}
                            placeholder="0"
                            optional
                            endAdornment={<span className="end-adornment">VNĐ</span>}
                            inputComponent={NumberFormatCustom as any}
                            style={{ marginRight: 0 }}
                            formControlStyle={{ marginRight: 0, minWidth: 250 }}
                            disableError
                            value={guestData[standardAdult - index]?.price}
                            onChange={e => {
                              if (Number(e.target.value) > 0) {
                                setGuests({
                                  ...guestData,
                                  [standardAdult - index]: { price: e.target.value },
                                });
                              }
                            }}
                            errorMessage=""
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                ))}
          </Paper>
        </div>
      </ConfirmDialog>
    </>
  );
};

export default React.memo(SetupPriceDialog);
