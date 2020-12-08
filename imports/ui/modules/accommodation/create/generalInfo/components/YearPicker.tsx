import MomentUtils from '@date-io/moment';
import { TextFieldProps, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import { Col } from '../../../../common/components/elements';

interface Props {
  label?: string;
  value: string;
  setValue: (values: string) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
}
const YearPicker: React.FC<Props> = props => {
  const { label, value, setValue, disableFuture, disablePast } = props;
  const renderInput = (proper: TextFieldProps): any => (
    <Col>
      {label && (
        <Typography variant="body2">
          <FormattedMessage id={label} />
        </Typography>
      )}
      <FormControlTextField
        placeholder="----"
        onClick={proper.onClick}
        value={value}
        onChange={proper.onChange}
        formControlStyle={{ width: 264 }}
      />
    </Col>
  );
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        variant="dialog"
        value={value}
        onChange={date => {
          if (date?.isValid()) {
            setValue(date.format('YYYY'));
          }
        }}
        disableFuture={disableFuture}
        disablePast={disablePast}
        views={['year']}
        TextFieldComponent={renderInput}
      />
    </MuiPickersUtilsProvider>
  );
};

export default YearPicker;
