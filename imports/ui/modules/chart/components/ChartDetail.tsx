import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../common/components/elements';
import { SECONDARY, TEAL } from '/imports/ui/configs/colors';

const ChartDetail: React.FC = (props) => {
  const { values } = useFormikContext();

  console.log(values);

  return (
    <React.Fragment>
      <Row>
        <Typography variant="body2">
          <FormattedMessage id="choose"></FormattedMessage>
        </Typography>
      </Row>
      <Row>
        <Typography
          style={{
            marginLeft: 6,
            color: TEAL,
          }}
          variant="subtitle2"
          component="p"
        >
          <FormattedMessage id="spaceStation" />
        </Typography>
        <Field
          name="test"
          as={(propsField: any) => (
            <Row>
              <RadioGroup {...propsField} row>
                <FormControlLabel
                  value="1"
                  style={{
                    paddingRight: 28,
                    marginLeft: 14,
                  }}
                  control={<Radio size="small" style={{ color: 'red' }} />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id={'Radio 1'} />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="2"
                  style={{
                    paddingRight: 28,
                    marginLeft: 14,
                  }}
                  control={<Radio style={{ color: 'red' }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id={'Radio 2'} />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="3"
                  style={{
                    paddingRight: 28,
                    marginLeft: 14,
                  }}
                  control={<Radio style={{ color: 'red' }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id={'Radio 3'} />
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="4"
                  style={{
                    paddingRight: 28,
                    marginLeft: 14,
                  }}
                  control={<Radio style={{ color: 'red' }} size="small" />}
                  label={
                    <Typography variant="body2">
                      <FormattedMessage id={'Radio 4'} />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Row>
          )}
        />
      </Row>
    </React.Fragment>
  );
};
export default ChartDetail;
