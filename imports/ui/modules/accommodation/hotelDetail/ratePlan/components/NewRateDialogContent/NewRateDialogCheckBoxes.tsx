import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { TEAL } from '../../../../../../configs/colors';
import { some } from '../../../../../../constants';
import { Row } from '../../../../../common/components/elements';
import { redMark } from '../../../../../common/components/Form';
import { ICheckBox, isEmpty } from '../../../../utils';

interface Props {
  iconLabel?: React.ReactNode;
  label?: string;
  checkBoxContent: some[];
  checkBoxList: ICheckBox;
  handleChange: (checkBoxData: some, type: string, value: boolean) => void;
  typeChange: string;
  leftLabel?: string;
  listRoomsDependent?: some[];
  optional?: boolean;
}
const NewRateDialogCheckBoxes: React.FC<Props> = props => {
  const {
    iconLabel,
    label,
    checkBoxContent,
    checkBoxList,
    handleChange,
    typeChange,
    leftLabel,
    listRoomsDependent,
    optional,
  } = props;
  return (
    <>
      <Row style={{ marginBottom: 4 }}>
        {iconLabel}
        {label && (
          <>
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
          </>
        )}
      </Row>
      <Row
        style={{
          marginBottom: 12,
        }}
      >
        {leftLabel && (
          <Typography variant="body2" component="p" style={{ marginLeft: 20 }}>
            <FormattedMessage id={leftLabel} />
          </Typography>
        )}
        {checkBoxContent?.map((elm: some, idx: number) => (
          <Fragment key={idx}>
            <FormControlLabel
              style={{
                marginLeft: 14,
                marginRight: 67,
              }}
              control={
                <Checkbox
                  color="primary"
                  checked={
                    !!(checkBoxList as some)[`${typeChange}`]?.find((el: some) => el.id === elm?.id)
                  }
                  onChange={(e: some) => {
                    handleChange({ id: elm?.id }, typeChange, e.target.checked);
                  }}
                  disabled={
                    typeChange === 'roomsTypes' &&
                    !isEmpty(listRoomsDependent) &&
                    listRoomsDependent?.every((v: some) => v.id !== elm?.id)
                  }
                />
              }
              label={
                <Typography variant="body2" style={{ whiteSpace: 'nowrap' }}>
                  {typeChange !== 'roomsTypes' && typeChange !== 'amenitiesTypes' ? (
                    <FormattedMessage id={elm?.name} />
                  ) : (
                    <span style={{ whiteSpace: 'nowrap' }}>{elm?.name}</span>
                  )}
                </Typography>
              }
            />
          </Fragment>
        ))}
      </Row>
    </>
  );
};

export default NewRateDialogCheckBoxes;
