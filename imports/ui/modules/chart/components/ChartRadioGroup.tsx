import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../common/components/elements';
import { some } from '/imports/ui/constants';

interface Props {
  fieldName: string;
  dataList?: some[];
  leftLabel?: string;
  leftLabelStyles?: some;
  endor?: string;
}
const ChatRadioGroup: React.FC<Props> = (props) => {
  const { fieldName, dataList, leftLabel, leftLabelStyles, endor } = props;
  const { values } = useFormikContext();

  console.log(values);

  return (
    <>
      <Row>
        <Typography style={leftLabelStyles} variant="subtitle2" component="p">
          <FormattedMessage id={leftLabel} />
        </Typography>
        <Field
          name={fieldName}
          as={(propsField: any) => (
            <Row>
              <RadioGroup {...propsField} row>
                {dataList?.map((elm: some, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={elm?.name?.toString()}
                    style={{
                      paddingRight: 28,
                      marginLeft: 14,
                    }}
                    control={<Radio size="small" style={{ color: 'red' }} />}
                    label={
                      !endor && !elm?.endor ? (
                        <Typography variant="body2">
                          <FormattedMessage id={elm?.name} />
                        </Typography>
                      ) : (
                        <span>
                          {elm?.name}
                          &nbsp;
                          {endor || elm?.endor}
                        </span>
                      )
                    }
                  />
                ))}
              </RadioGroup>
            </Row>
          )}
        />
      </Row>
    </>
  );
};
export default ChatRadioGroup;
