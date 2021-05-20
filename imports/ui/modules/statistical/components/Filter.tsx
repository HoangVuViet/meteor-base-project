import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconSearch from '@material-ui/icons/Search';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row } from '../../common/components/elements';
import { FieldTextContent } from '../../common/components/FieldContent';
import LoadingButton from '../../common/components/LoadingButton';
import { some } from '/imports/ui/constants';

interface IFilterProps {
  onUpdateFilter: (values: some) => void;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const intl = useIntl();
  const { onUpdateFilter } = props;
  const { setFieldValue, resetForm, values } = useFormikContext();
  console.log(values as some);
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
        />
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
        <IconButton
          style={{ padding: 4, marginRight: 12 }}
          onClick={() => {
            resetForm();
            onUpdateFilter({ pageOffset: 0, pageSize: 20 });
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Row>
    </Row>
  );
};

export default Filter;
