import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import { SECONDARY, TEAL, GREY_500 } from '../../../../../../configs/colors';
import { Row } from '../../../../../common/components/elements';
import { redMark, NumberFormatCustom } from '../../../../../common/components/Form';
import { FieldTextContent } from '../../../../common/FieldContent';
import { some } from '../../../../../../constants';

interface Props {
  iconLabel: React.ReactNode;
  label: string;
  fieldName: string;
  radioLabelApplied?: string;
  radioLabelDeclined?: string;
  checkDayOrRoomRequested?: boolean;
  fieldDayOrRoomRequestedName?: string;
  optional?: boolean;
  rateTypesList?: some;
  ratePlanID?: number;
}
const NewRateDialogRadioGroup: React.FC<Props> = props => {
  const {
    iconLabel,
    label,
    optional,
    fieldName,
    radioLabelApplied,
    radioLabelDeclined,
    checkDayOrRoomRequested,
    fieldDayOrRoomRequestedName,
    rateTypesList,
    ratePlanID,
  } = props;

  const intl = useIntl();
  const { values } = useFormikContext();
  const isBaseRateRadioDisabled = () => {
    if (fieldName === 'basedAnotherRate') {
      if (ratePlanID) {
        if (!(values as some).rateType) {
          return true;
        }
        if (
          (values as some).rateType &&
          isEmpty(
            rateTypesList?.items?.filter(
              (elm: some) => elm?.rateType?.id === (values as some)?.rateType,
            ),
          )
        ) {
          return true;
        }
        return !(rateTypesList?.items.length > 1) || !!isEmpty(rateTypesList?.items);
      }
    }
    return false;
  };

  return (
    <>
      <Row
        style={{
          marginBottom: 4,
        }}
      >
        {iconLabel}
        <Typography
          style={{
            marginLeft: 6,
            color: TEAL,
          }}
          variant="subtitle2"
          component="p"
        >
          <FormattedMessage id={label} />
        </Typography>
        {!optional && <>&nbsp;{redMark}</>}
      </Row>
      <Row
        style={{
          marginBottom: 12,
        }}
      >
        <Field
          name={fieldName}
          as={(propsField: any) => (
            <Row>
              <RadioGroup {...propsField} row>
                <FormControlLabel
                  value="yes"
                  style={{
                    paddingRight: 28,
                    marginLeft: 14,
                  }}
                  control={
                    <Radio
                      style={{
                        color: isBaseRateRadioDisabled() ? GREY_500 : SECONDARY,
                      }}
                      size="small"
                      disabled={isBaseRateRadioDisabled()}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      <FormattedMessage
                        id={radioLabelApplied || 'IDS_HMS_NEW_RATE_TYPE_POLICY_DEFAULT_APPLIED'}
                      />
                    </Typography>
                  }
                  disabled={isBaseRateRadioDisabled()}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage
                        id={radioLabelDeclined || 'IDS_HMS_NEW_RATE_TYPE_POLICY_NEW_APPLIED'}
                      />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Row>
          )}
        />
        {checkDayOrRoomRequested && (
          <Row>
            <FieldTextContent
              name={fieldDayOrRoomRequestedName}
              style={{
                width: 120,
                marginTop: 16,
              }}
              formControlStyle={{ minWidth: 120 }}
              inputComponent={NumberFormatCustom as any}
              inputProps={{ maxLength: 3 }}
              optional
              placeholder={intl.formatMessage({ id: 'IDS_HMS_ENTER_DAY' })}
            />
          </Row>
        )}
      </Row>
    </>
  );
};

export default NewRateDialogRadioGroup;
