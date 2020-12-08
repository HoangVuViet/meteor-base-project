import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Divider,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { GREY_400 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { Col, Row } from '../../../../common/components/elements';
import ProgressiveImage from '../../../../common/components/ProgressiveImage';

interface Props {
  titleLabel?: React.ReactNode;
  iconUrl?: string;
  checkOpen?: boolean;
}

const CardFacility: React.FC<Props> = props => {
  const { titleLabel, iconUrl, children, checkOpen } = props;

  const [open, setOpen] = React.useState<boolean | undefined>(checkOpen);

  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.facility;

  return (
    <Col
      style={{
        width: '100%',
        minWidth: 440,
      }}
    >
      <Accordion
        variant="outlined"
        expanded={open}
        square
        style={{ border: isApproval ? `1px solid ${GREY_400}` : 'none' }}
        onChange={() => {
          setOpen(!open);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
          <Row>
            {iconUrl && <ProgressiveImage src={iconUrl} alt="" />}
            {titleLabel && (
              <Typography style={{ marginLeft: 4 }} variant="body2">
                {titleLabel}
              </Typography>
            )}
          </Row>
        </AccordionSummary>
        <Divider style={{ margin: '0px 12px' }} />
        <AccordionActions>{children}</AccordionActions>
      </Accordion>
    </Col>
  );
};

export default CardFacility;
