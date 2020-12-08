import { Paper, Typography, Grid, IconButton, Button } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { shallowEqual, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { ReactComponent as DeleteIconRed } from '../../../../../svg/ic_delete_red.svg';
import { NumberFormatCustom } from '../../../../common/components/Form';
import { FieldSelectContent, FieldTextContent } from '../../../common/FieldContent';
import './CreateHotel.scss';
import { snackbarSetting } from '../../../../common/components/elements';
import { BLUE_500 } from '../../../../../configs/colors';
import { isEmpty } from '../../../utils';

interface Props {
  headerText?: string;
  optional?: boolean;
  type: number;
  cardIndex: number;
}
interface bedProps {
  isDelete: boolean;
}

const BedType: React.FC<Props> = props => {
  const intl = useIntl();
  const { headerText, optional, type, cardIndex } = props;
  const { setFieldValue, values } = useFormikContext();
  const initBedNumber = Object.keys(values as any).filter(el =>
    el.includes(`roomBedTypes_${cardIndex}_${type}`),
  );
  const initBedDefault = () => {
    const result: Array<bedProps> = isEmpty(initBedNumber) ? [{ isDelete: false }] : [];
    if (!isEmpty(initBedNumber)) {
      initBedNumber.forEach(v => result.push({ isDelete: false }));
    }
    return result;
  };
  const bedTypes = useSelector((state: AppState) => state.accommodation.bedTypes, shallowEqual);
  const [fields, setFields] = useState<Array<bedProps>>(initBedDefault());
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleRemove = (index: number) => {
    setFieldValue(`roomBedTypes_${cardIndex}_${type}_${index}`, undefined);
    setFieldValue(`roomBedTypesNumber_${cardIndex}_${type}_${index}`, undefined);
    const temp = [...fields].map((el: bedProps, idx: number) => {
      if (idx === index) {
        return { ...el, isDelete: true };
      }
      return el;
    });
    setFields(temp);
  };
  const handleAdd = () => {
    const bedNumber = fields.filter(el => !el.isDelete);
    if (bedNumber.length >= 5) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'IDS_HMS_BED_TYPE_ERROR' }),
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    } else {
      setFields([...fields, { isDelete: false }]);
    }
  };

  return (
    <Paper variant="outlined" className="bed-type-wrapper">
      {headerText && (
        <Typography gutterBottom variant="subtitle2" component="p" className="bed-type-header">
          {headerText}
        </Typography>
      )}

      {fields.map((el, idx: number) => (
        <Fragment key={idx}>
          {!el.isDelete && (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FieldSelectContent
                  name={`roomBedTypes_${cardIndex}_${type}_${idx}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_BED_STYLE' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_BED_STYLE_PLACEHOLDER' })}
                  optional={!(!optional && idx === 0)}
                  options={bedTypes?.items}
                  onSelectOption={(value: number) => {
                    setFieldValue(`roomBedTypes_${cardIndex}_${type}_${idx}`, value);
                  }}
                  getOptionLabel={(v: any) => v.name}
                />
              </Grid>
              <Grid item xs={4}>
                <FieldTextContent
                  name={`roomBedTypesNumber_${cardIndex}_${type}_${idx}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_AMOUNT' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_AMOUNT' })}
                  optional={!(!optional && idx === 0)}
                  inputComponent={NumberFormatCustom as any}
                />
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                {idx > 0 && (
                  <IconButton onClick={() => handleRemove(idx)}>
                    <DeleteIconRed />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          )}
        </Fragment>
      ))}
      {fields.filter(el => !el.isDelete).length < 5 && (
        <Button variant="text" onClick={handleAdd} style={{ paddingLeft: 0 }} disableTouchRipple>
          <AddIconCircle style={{ marginRight: 8 }} />
          <Typography variant="body2" component="span" style={{ color: BLUE_500 }}>
            <FormattedMessage id="IDS_HMS_ADD_BED_STYLE" />
          </Typography>
        </Button>
      )}
    </Paper>
  );
};
export default BedType;
