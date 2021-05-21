import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconSearch from '@material-ui/icons/Search';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { stationList } from '../../chart/utils';
import { Row } from '../../common/components/elements';
import { FieldSelectContent, FieldTextContent } from '../../common/components/FieldContent';
import LoadingButton from '../../common/components/LoadingButton';
import { filterList } from '../utils';
import { some } from '/imports/ui/constants';

interface IFilterProps {
  onUpdateFilter: (values: some) => void;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const intl = useIntl();
  const { onUpdateFilter } = props;
  const { setFieldValue, resetForm, values } = useFormikContext();
  return (
    <Row style={{ flexWrap: 'wrap' }}>
      <Row>
        <FieldTextContent
          name="textSearch"
          placeholder={intl.formatMessage({
            id: 'searchPlaceholder',
          })}
          formControlStyle={{ width: 500, marginRight: 15, marginTop: 20 }}
          inputProps={{ autoComplete: 'off' }}
          startAdornment={
            <InputAdornment position="end" variant="filled">
              <IconSearch fontSize="small" />
            </InputAdornment>
          }
        />
        <FieldSelectContent
          name="filterBy"
          label={null}
          style={{
            width: 250,
          }}
          formControlStyle={{
            minWidth: 250,
            marginRight: 15,
            marginTop: 20,
          }}
          options={filterList}
          getOptionLabel={(value) => value.name}
          onSelectOption={(value: number) => {
            setFieldValue('filterBy', value);
          }}
          placeholder={intl.formatMessage({ id: 'filterBy' })}
          disableError
        />
        <LoadingButton
          style={{ minHeight: 36, marginRight: 16, minWidth: 100 }}
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => onUpdateFilter(values as some)}
        >
          <Typography variant="body2">
            <FormattedMessage id="search" />
          </Typography>
        </LoadingButton>
        <IconButton
          style={{ padding: 4, marginRight: 12 }}
          onClick={() => {
            resetForm();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Row>
    </Row>
  );
};

export default Filter;
