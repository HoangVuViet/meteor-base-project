import React, { ReactNode, useState } from 'react';
import {
  Typography,
  Collapse,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import './CreateHotel.scss';
import { Row } from '../../../../common/components/elements';

import { ReactComponent as ArrowBackIcon } from '../../../../../svg/ic_arrow_back.svg';
import { GREY_600 } from '../../../../../configs/colors';

interface Props {
  icon?: ReactNode;
  title?: string;
  options: Array<any>;
  roomFeatureIds: Array<number>;
  handleChange: (id: number, value: boolean) => void;
  handleSelectAllGroup: (ids: number[], isChecked: boolean) => void;
}

const SelectConvenientItem: React.FC<Props> = props => {
  const { title, icon, options, roomFeatureIds } = props;
  const [isCollapse, setCollapse] = useState(true);
  const getIds = () => {
    const result: Array<number> = [];
    options.forEach(el => result.push(el.id));
    return result;
  };
  const handleCollapse = () => setCollapse(!isCollapse);
  const selectAll = (isChecked: boolean) => {
    props.handleSelectAllGroup(getIds(), isChecked);
  };
  const isSelectAllItem = getIds().reduce((i, num) => i && roomFeatureIds.includes(num), true);
  return (
    <Paper variant="outlined" className="card-setting" style={{ marginBottom: 16 }}>
      <Row className="header-card" style={{ color: GREY_600, padding: '12px 16px' }}>
        <Row style={{ width: '100%' }}>
          {icon}
          <Typography
            gutterBottom
            variant="body2"
            component="p"
            style={{ marginBottom: 0, marginLeft: 8 }}
          >
            {title}
          </Typography>
        </Row>
        <Row className="right-icon-card-header">
          <FormControlLabel
            control={
              <Checkbox
                checked={isSelectAllItem}
                onChange={(e: any) => selectAll(e.target.checked)}
                color="primary"
                style={{ padding: '0 6px 0 0' }}
                classes={{ root: 'custom-checkbox-root' }}
              />
            }
            style={{ width: 160 }}
            labelPlacement="start"
            label={
              <Typography gutterBottom variant="body2" component="span">
                <FormattedMessage id="IDS_HMS_SELECT_MORE" />
                &nbsp;
              </Typography>
            }
          />
          <ArrowBackIcon
            onClick={handleCollapse}
            style={{
              transform: isCollapse ? 'rotate(90deg)' : 'rotate(270deg)',
              transition: '300ms linear all',
              marginLeft: 12,
            }}
          />
        </Row>
      </Row>
      <Collapse in={isCollapse}>
        <div style={{ margin: '0 16px' }}>
          <Divider />
        </div>
        <div className="dialog-content">
          <Grid container spacing={3}>
            {options.map((element, idx) => (
              <Grid item xs={4} key={idx} style={{ padding: '0 12px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={roomFeatureIds.includes(element.id)}
                      onChange={(e: any) => props.handleChange(element.id, e.target.checked)}
                      color="primary"
                      classes={{ root: 'custom-checkbox-root' }}
                    />
                  }
                  label={
                    <Typography gutterBottom variant="body2" component="span">
                      {element?.name}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Collapse>
    </Paper>
  );
};
export default React.memo(SelectConvenientItem);
