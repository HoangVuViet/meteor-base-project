import React, { useState, Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { Typography, Grid } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { FieldTextContent } from '../../../common/FieldContent';

import { ReactComponent as DeleteIconRed } from '../../../../../svg/ic_delete_red.svg';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { NumberFormatCustom } from '../../../../common/components/Form';
import { some } from '../../../../../constants';
import { ROUTES } from '../../../../../configs/routes';

interface Props {
  headerText?: string;
  type: string;
  fieldName: string;
  dataItems: Array<some>;
}
interface itemProps {
  isDelete: boolean;
}

const NearByItem: React.FC<Props> = props => {
  const { headerText, fieldName, type, dataItems } = props;
  const { setFieldValue } = useFormikContext();
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.nearBy;
  const initFields = () => {
    const fieldResult: Array<itemProps> = [];
    dataItems.forEach((el: some, i: number) => {
      fieldResult.push({ isDelete: false });
    });
    return fieldResult;
  };
  const [fields, setFields] = useState<Array<itemProps>>(initFields());

  const intl = useIntl();

  const handleRemove = (index: number) => {
    setFieldValue(`${fieldName}_${type}_${index}`, undefined);
    setFieldValue(`${fieldName}_distance_${type}_${index}`, undefined);
    setFieldValue(`${fieldName}_id_${type}_${index}`, undefined);
    const temp = fields.map((el: itemProps, idx: number) => {
      return idx === index ? Object.assign(el, { ...el, isDelete: true }) : el;
    });
    setFields(temp);
  };
  const handleAdd = () => setFields([...fields, { isDelete: false }]);
  const deleteAll = () => {
    fields.forEach((el, i) => {
      if (!el.isDelete) {
        setFieldValue(`${fieldName}_${type}_${i}`, undefined);
        setFieldValue(`${fieldName}_distance_${type}_${i}`, undefined);
        setFieldValue(`${fieldName}_id_${type}_${i}`, undefined);
      }
    });
    setFields([]);
  };
  return (
    <div className="bed-type-wrapper near-by-item">
      {headerText && (
        <Typography gutterBottom variant="body1" component="p" className="near-by-header">
          {headerText}
        </Typography>
      )}

      {fields.map((el: itemProps, idx: number) => {
        return (
          <Fragment key={idx}>
            {!el.isDelete && (
              <Grid container spacing={3}>
                <Grid item xs={isApproval ? 4 : 3}>
                  <FieldTextContent
                    name={`${fieldName}_${type}_${idx}`}
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_ADDRESS_NAME' })}
                    optional
                    inputProps={{ maxLength: 500 }}
                  />
                </Grid>
                <Grid item xs={isApproval ? 2 : 1}>
                  <Typography gutterBottom variant="body2" component="p" style={{ marginTop: 10 }}>
                    <FormattedMessage id="IDS_HMS_ABOUT_DISTANCE" />
                  </Typography>
                </Grid>
                <Grid item xs={isApproval ? 4 : 2}>
                  <FieldTextContent
                    name={`${fieldName}_distance_${type}_${idx}`}
                    optional
                    endAdornment={<span className="end-adornment">m</span>}
                    inputComponent={NumberFormatCustom as any}
                  />
                </Grid>
                <Grid item xs={isApproval ? 2 : 1}>
                  <DeleteIconRed onClick={() => handleRemove(idx)} />
                </Grid>
              </Grid>
            )}
          </Fragment>
        );
      })}
      <Grid container spacing={3}>
        <Grid
          item
          xs={isApproval ? 4 : 2}
          className="add-btn"
          onClick={handleAdd}
          style={{ padding: '0 12px' }}
        >
          <AddIconCircle />
          &nbsp;
          <Typography gutterBottom variant="body2" component="p" className="add-text">
            <FormattedMessage id="IDS_HMS_NEW_ADDRESS" />
          </Typography>
        </Grid>
        {fields.length > 0 && (
          <Grid
            item
            xs={isApproval ? 4 : 2}
            className="add-btn"
            onClick={deleteAll}
            style={{ padding: '0 12px' }}
          >
            <DeleteIconRed className="delete-icon" />
            <Typography gutterBottom variant="body2" component="p" className="delete-text">
              <FormattedMessage id="IDS_HMS_DELETE_ALL" />
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default React.memo(NearByItem);
