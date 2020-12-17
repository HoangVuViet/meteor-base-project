import { Button, Collapse, Divider, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from '../../common/components/elements';
import { BLUE_50 } from '/imports/ui/configs/colors';
import { HEADER_HEIGHT } from '/imports/ui/layout/constants';

interface Props {}
const MapDisplay: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Col
      style={{
        alignItems: 'left',
        outline: 'none',
        width: 400,
      }}
      color="inherit"
      tabIndex={-1}
      onClick={() => setOpen(!open)}
    >
      <Button
        style={{
          backgroundColor: BLUE_50,
          minWidth: 130,
          padding: '0 0 0 8px',
        }}
        color="inherit"
      >
        <Typography aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true">
          <FormattedMessage id="display"></FormattedMessage>
        </Typography>
      </Button>
      <Collapse in={open} style={{ position: 'absolute', zIndex: 1100, top: HEADER_HEIGHT }}>
        <Paper
          style={{ overflow: 'hidden', padding: '8px 12px', marginLeft: 10 }}
          variant="outlined"
        >
          <Col>
            <Row style={{ padding: '12px 12px' }}>
              <Button style={{ width: 400 }}>
                <Typography variant="body2" color="primary">
                  <FormattedMessage id="mapPM2.5Display"></FormattedMessage>
                </Typography>
              </Button>
            </Row>
            <Divider></Divider>
            <Row style={{ padding: '16px 12px' }}>
              <Button style={{ width: 400 }}>
                <Typography variant="body2" color="primary">
                  <FormattedMessage id="mapNO2Display"></FormattedMessage>
                </Typography>
              </Button>
            </Row>
            <Divider></Divider>
            <Row style={{ padding: '16px 12px' }}>
              <Button style={{ width: 400 }}>
                <Typography variant="body2" color="primary">
                  <FormattedMessage id="mapTempDisplay"></FormattedMessage>
                </Typography>
              </Button>
            </Row>
            <Divider></Divider>
            <Row style={{ padding: '16px 12px' }}>
              <Button style={{ width: 400 }}>
                <Typography variant="body2" color="primary">
                  <FormattedMessage id="provincePMValue"></FormattedMessage>
                </Typography>
              </Button>
            </Row>
          </Col>
        </Paper>
      </Collapse>
    </Col>
  );
};

export default MapDisplay;
