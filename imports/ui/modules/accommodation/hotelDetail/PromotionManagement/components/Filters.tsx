import { IconButton, InputAdornment, Popper, Typography } from '@material-ui/core';
import IconSearch from '@material-ui/icons/Search';
import { Moment } from 'moment';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { GREY_600, TEAL, WHITE } from '../../../../../configs/colors';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { ReactComponent as FilterIcon } from '../../../../../svg/filter.svg';
import { ReactComponent as CloseIcon } from '../../../../../svg/ic_closeIcon.svg';
import { PromotionFilterProps } from '../../../../accommodation/constant';
import DateRangeFormControl from '../../../../common/components/DateRangeFormControl';
import { Col, Row } from '../../../../common/components/elements';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../common/components/LoadingButton';
import SingleSelect from '../../../../common/components/SingleSelect';

interface Props {
  filter: PromotionFilterProps;
  onUpdateFilter: (values: any) => void;
  listPromotions: any;
}
const Filters: React.FC<Props> = props => {
  const { onUpdateFilter, filter, listPromotions } = props;
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = React.useState<Moment>();
  const [endDate, setEndDate] = React.useState<Moment>();
  const [promotionTypeIds, setPromotionTypeIds] = React.useState<any[]>([]);

  const intl = useIntl();
  const inputRef = useRef<any>();

  return (
    <>
      <Row style={{ alignItems: 'flex-start' }}>
        <div>
          <Row>
            <FormControlTextField
              placeholder={intl.formatMessage({ id: 'IDS_HMS_SEARCH_BY_PROGRAM_NAME' })}
              formControlStyle={{ width: 544, marginRight: 0 }}
              startAdornment={
                <InputAdornment position="end" variant="filled">
                  <IconSearch fontSize="small" style={{ color: GREY_600 }} />
                </InputAdornment>
              }
              inputProps={{ autoComplete: 'off' }}
              focused={openFilter}
              innerRef={inputRef}
              onClick={() => setOpenFilter(true)}
            />
            <IconButton
              style={{
                position: 'relative',
                padding: 0,
                bottom: 10,
                right: 30,
              }}
              onClick={() => setOpenFilter(!openFilter)}
            >
              {openFilter ? <CloseIcon /> : <FilterIcon />}
            </IconButton>
          </Row>

          <Popper
            open={openFilter}
            anchorEl={inputRef?.current}
            placement="bottom"
            transition
            style={{ width: 544 }}
          >
            <Col
              style={{
                padding: '16px 16px 24px 16px',
                backgroundColor: WHITE,
                boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="subtitle2" style={{ color: TEAL, marginBottom: 16 }}>
                <FormattedMessage id="filterBy" />
              </Typography>
              <Row>
                <DateRangeFormControl
                  style={{ marginRight: 10, flex: 1 }}
                  optional
                  onChange={(start, end) => {
                    if (start) setStartDate(start);
                    if (end) setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  label={intl.formatMessage({ id: 'IDS_HMS_DATE_RANGE_PICKER' })}
                  isOutsideRange={(e: any) => false}
                />
                {listPromotions && (
                  <SingleSelect
                    label={intl.formatMessage({ id: 'IDS_HMS_TYPES_PROMOTION' })}
                    value={promotionTypeIds || null}
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_TYPES_PROMOTION' })}
                    multiple
                    getOptionLabel={(v: any) => v?.name || ''}
                    options={listPromotions}
                    onSelectOption={(value: any) => {
                      setPromotionTypeIds(value);
                    }}
                    formControlStyle={{ width: 200 }}
                  />
                )}
              </Row>
              <LoadingButton
                variant="contained"
                color="secondary"
                disableElevation
                style={{ minWidth: 150, height: 40, alignSelf: 'flex-end' }}
                onClick={() => {
                  onUpdateFilter({
                    ...filter,
                    from: startDate?.format(DATE_FORMAT_BACK_END),
                    to: endDate?.format(DATE_FORMAT_BACK_END),
                    promotionTypeIds,
                  });
                  setOpenFilter(false);
                }}
              >
                <Typography variant="body2">
                  <FormattedMessage id="apply" />
                </Typography>
              </LoadingButton>
            </Col>
          </Popper>
        </div>
      </Row>
    </>
  );
};
export default Filters;
