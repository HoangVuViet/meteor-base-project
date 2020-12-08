import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SECONDARY } from '../../../../../configs/colors';
import { Col, Row } from '../../../../common/components/elements';
import { FieldCheckboxContent } from '../../../common/FieldContent';

interface Props {}
const GeneralPolicy: React.FC<Props> = props => {
  return (
    <Col>
      <Row>
        <Typography variant="h6" gutterBottom>
          <FormattedMessage id="IDS_HMS_GENERAL_POLICY" />
        </Typography>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Field
          name="allowSmoking"
          as={(propsField: any) => (
            <Row>
              <Typography variant="body2" style={{ width: 150, marginRight: 40 }}>
                <FormattedMessage id="IDS_HMS_POLICY_SMOKE" />
              </Typography>
              <RadioGroup {...propsField} row>
                <FormControlLabel
                  value="yes"
                  style={{ paddingRight: 28 }}
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_YES" />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_NO" />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Row>
          )}
        />
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Field
          name="allowPet"
          as={(propsField: any) => (
            <Row>
              <Typography variant="body2" style={{ width: 150, marginRight: 40 }}>
                <FormattedMessage id="IDS_HMS_POLICY_PET" />
              </Typography>
              <RadioGroup {...propsField} row>
                <FormControlLabel
                  value="yes"
                  style={{ paddingRight: 28 }}
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_YES" />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_NO" />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Row>
          )}
        />
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Field
          name="allowEvent"
          as={(propsField: any) => (
            <Row style={{ justifyContent: 'space-between' }}>
              <Typography variant="body2" style={{ width: 150, marginRight: 40 }}>
                <FormattedMessage id="IDS_HMS_POLICY_EVENT" />
              </Typography>
              <RadioGroup {...propsField} row>
                <FormControlLabel
                  value="yes"
                  style={{ paddingRight: 28 }}
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_YES" />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio style={{ color: SECONDARY }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_NO" />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Row>
          )}
        />
      </Row>
      <Row>
        <FieldCheckboxContent
          name="hasRestriction"
          label={
            <Typography variant="body2">
              <FormattedMessage id="IDS_HMS_POLICY_RESTRICTION" />
            </Typography>
          }
        />
      </Row>
    </Col>
  );
};
export default GeneralPolicy;
