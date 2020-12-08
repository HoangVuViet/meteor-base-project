import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { some } from '../../../../../../constants';
import { Row } from '../../../../../common/components/elements';
import FormControlAutoComplete from '../../../../../common/components/FormControlAutoComplete';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import { defaultGroupUserFilter, IGroupUserFilter, listPermissions } from '../../../constants';

interface Props {
  loading: boolean;
  filter: IGroupUserFilter;
  onUpdateFilter(values: IGroupUserFilter): void;
}
const Filter: React.FC<Props> = props => {
  const { loading, filter, onUpdateFilter } = props;
  const intl = useIntl();

  const formik = useFormik({
    initialValues: defaultGroupUserFilter,
    onSubmit: values => onUpdateFilter(values),
  });

  React.useEffect(() => {
    formik.setValues(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row>
        <Row>
          <Typography variant="body2" style={{ marginRight: 12, marginBottom: 20 }}>
            <FormattedMessage id="accManagement.groupUsers" />
          </Typography>
          <FormControlTextField
            id="name"
            formControlStyle={{ width: 270 }}
            placeholder={intl.formatMessage({ id: 'accManagement.enterGroupUsersName' })}
            value={formik.values.name}
            onChange={e => formik.setFieldValue('name', e.target.value)}
            inputProps={{
              maxLength: 50,
              autoComplete: 'none',
            }}
          />
        </Row>
        <Row>
          <Typography variant="body2" style={{ marginRight: 12, marginBottom: 20 }}>
            <FormattedMessage id="accManagement.groupPermissions" />
          </Typography>
          <FormControlAutoComplete<some>
            value={listPermissions.find((v: some) => v.type === formik.values.type) || null}
            formControlStyle={{ width: 200 }}
            onChange={(e: any, value: some | null) =>
              formik.setFieldValue('type', value?.type, true)
            }
            getOptionLabel={value => intl.formatMessage({ id: value.name })}
            options={listPermissions as some[]}
          />
        </Row>
        <LoadingButton
          style={{ minHeight: 40, marginBottom: 20, minWidth: 120 }}
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          loading={loading}
        >
          <Typography variant="body2">
            <FormattedMessage id="search" />
          </Typography>
        </LoadingButton>
      </Row>
    </form>
  );
};

export default Filter;
