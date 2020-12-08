import React from 'react';
import { CardContent, Grid } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useFormikContext } from 'formik';
import { some } from '../../../../../constants';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import { AppState } from '../../../../../redux/reducers';

interface CardProps {
  index: number;
  rateTypes?: some;
}
const NewRateItem: React.FC<CardProps> = props => {
  const { index, rateTypes } = props;
  const { setFieldValue } = useFormikContext();
  const intl = useIntl();

  return (
    <>
      <CardContent style={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FieldSelectContent
              name={`rateTypeId_${index}`}
              label={intl.formatMessage({ id: 'IDS_HMS_RATE_TYPE' })}
              options={rateTypes?.items || []}
              getOptionLabel={(v: any) => v.name}
              onSelectOption={(value: number) => {
                setFieldValue(`rateTypeId_${index}`, value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FieldSelectContent
              name={`rateTypeId_${index}`}
              label={intl.formatMessage({ id: 'IDS_HMS_RATE_TYPE' })}
              options={rateTypes?.items || []}
              getOptionLabel={(v: any) => v.name}
              onSelectOption={(value: number) => {
                setFieldValue(`rateTypeId_${index}`, value);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default React.memo(NewRateItem);
