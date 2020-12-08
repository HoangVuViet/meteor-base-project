import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFormikContext } from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import { Formik, Form } from 'formik';
import './CreateHotel.scss';
import { ReactComponent as InfoCircleIcon } from '../../../../../svg/ic_info_circle.svg';
import { ReactComponent as DashboardIcon } from '../../../../../svg/ic_dashboard_active.svg';
import { ReactComponent as BathroomIcon } from '../../../../../svg/ic_bathroom.svg';

import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import SelectConvenientItem from './SelectConvenientItem';
import { AppState } from '../../../../../redux/reducers';
import { some } from '../../../../../constants';
import { RED } from '../../../../../configs/colors';
import { Row } from '../../../../common/components/elements';
import BootstrapTooltip from '../../../common/BootstrapTooltip';
import { isEmpty } from '../../../utils';

interface Props {
  initRoomFeatureIds: Array<number>;
  handleSubmitFeature: (ids: Array<number>) => void;
  keyValues: string;
}
const SelectConvenientDialog: React.FC<Props> = props => {
  const { errors, submitCount } = useFormikContext();
  const { initRoomFeatureIds, keyValues } = props;
  const [open, setOpen] = useState(false);
  const { features, featuresType } = useSelector(
    (state: AppState) => state.accommodation,
    shallowEqual,
  );
  const [roomFeatureIds, setRoomFeatureIds]: Array<any> = useState([...initRoomFeatureIds]);

  const openDialog = () => setOpen(true);
  const closeDialog = () => {
    setOpen(false);
    setRoomFeatureIds(initRoomFeatureIds);
  };

  const handleChange = (id: number, value: boolean) => {
    let temp = [...roomFeatureIds];
    if (value) temp.push(id);
    else temp = temp.filter(item => item !== id);
    setRoomFeatureIds(temp);
  };
  const handleSelectAllGroup = (ids: number[], isChecked: boolean) => {
    if (isChecked) setRoomFeatureIds([...new Set([...roomFeatureIds, ...ids])]);
    else {
      setRoomFeatureIds(roomFeatureIds.filter((id: any) => id && !ids.includes(id)));
    }
  };
  const handleSelectAll = (checked: boolean) => {
    let result: Array<number> = [];
    if (checked) {
      result = features?.items.map((v: any) => v?.id);
    }
    setRoomFeatureIds(result);
  };
  const handleSubmit = () => {
    props.handleSubmitFeature(roomFeatureIds);
    setOpen(false);
  };
  return (
    <>
      <Row>
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          fullWidth
          className="utility-btn"
          onClick={openDialog}
          style={{
            border: 'solid 1px',
            borderColor:
              submitCount > 0 && (errors as some)[`${keyValues}`] && initRoomFeatureIds.length === 0
                ? RED
                : undefined,
          }}
        >
          <DashboardIcon />
          <Typography variant="body2" align="center">
            <FormattedMessage id="IDS_HMS_CREATE_UTILITY" />
          </Typography>
          {initRoomFeatureIds.length > 0 && ` (${initRoomFeatureIds.length})`}
        </Button>
        {submitCount > 0 && (errors as some)[`${keyValues}`] && initRoomFeatureIds.length === 0 && (
          <BootstrapTooltip
            title={
              <Typography variant="body2" align="center">
                <FormattedMessage id="IDS_HMS_CREATE_UTILITY_VALIDATE" />
              </Typography>
            }
            placement="bottom"
          >
            <InfoCircleIcon
              className="svgFillAll"
              style={{ stroke: RED, marginLeft: 10, marginBottom: 14 }}
            />
          </BootstrapTooltip>
        )}
      </Row>
      <ConfirmDialog
        open={open}
        onClose={closeDialog}
        onAccept={handleSubmit}
        onReject={closeDialog}
        titleLabel={
          <Typography gutterBottom variant="subtitle1" component="span" className="header-dialog">
            <FormattedMessage id="IDS_HMS_SELECT_CONVENIENT" />
          </Typography>
        }
        acceptLabel="IDS_HMS_SAVE"
        rejectLabel="IDS_HMS_REJECT"
        fullWidth
        maxWidth="md"
      >
        <div className="dialog-content">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                style={{ marginRight: 6 }}
                checked={roomFeatureIds.length === features?.total}
                onChange={(e: any) => handleSelectAll(e.target.checked)}
                classes={{ root: 'custom-checkbox-root' }}
              />
            }
            label={
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_SELECT_ALL" />
              </Typography>
            }
          />
          {!isEmpty(featuresType?.items) &&
            featuresType?.items.map((el: any, index: number) => (
              <SelectConvenientItem
                key={index}
                icon={<BathroomIcon />}
                title={el?.name}
                options={features?.items.filter((v: any) => v?.type === el?.type)}
                roomFeatureIds={roomFeatureIds}
                handleChange={handleChange}
                handleSelectAllGroup={handleSelectAllGroup}
              />
            ))}
        </div>
      </ConfirmDialog>
    </>
  );
};
export default React.memo(SelectConvenientDialog);
