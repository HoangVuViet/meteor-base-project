import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row } from '../../common/components/elements';
import { FieldTextContent } from '../../common/components/FieldContent';
import LoadingButton from '../../common/components/LoadingButton';
import IconSearch from '@material-ui/icons/Search';

interface IFilterProps {}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const intl = useIntl();
  return (
    <Row style={{ flexWrap: 'wrap' }}>
      <Row>
        <FieldTextContent
          name="textSearch"
          placeholder={intl.formatMessage({
            id: 'ratePackage.searchByIdOrName',
          })}
          formControlStyle={{ width: 500, marginRight: 15, marginTop: 20 }}
          inputProps={{ autoComplete: 'off' }}
          startAdornment={
            <InputAdornment position="end" variant="filled">
              <IconSearch fontSize="small" />
            </InputAdornment>
          }
          // onClick={() => setOpenFilter(true)}
          // onKeyPress={(e) => {
          //   if (e.key === 'Enter') {
          //     onUpdateFilter(values);
          //     setOpenFilter(false);
          //   }
          // }}
        />
        <IconButton
          style={{ padding: 4, marginRight: 12 }}
          //   onClick={() => onUpdateFilter(defaultPricePackageFilter)}
        >
          <RefreshIcon />
        </IconButton>
        <LoadingButton
          style={{ minHeight: 36, marginRight: 16, minWidth: 100 }}
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
        >
          <Typography variant="body2">
            <FormattedMessage id="search" />
          </Typography>
        </LoadingButton>
      </Row>
    </Row>
  );
};

export default Filter;
