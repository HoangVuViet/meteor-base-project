import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Divider, Collapse } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { useFormikContext } from 'formik';
import { Row } from '../../../../common/components/elements';
import { ReactComponent as ArrowIconCircle } from '../../../../../svg/ic_arrow_circle.svg';
import NearByItem from './NearByItem';
import { nearByData, NearByItemsProps } from '../constants';
import { some } from '../../../../../constants';
import { ROUTES } from '../../../../../configs/routes';

interface CardProps {
  title: string;
  type: string;
  data: Array<some>;
}
const CardNearBy: React.FC<CardProps> = props => {
  const { title, type, data } = props;
  const { setFieldValue } = useFormikContext();
  const intl = useIntl();
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.nearBy;
  const [isOpen, setOpen] = useState(true);
  const handleCollapse = () => setOpen(!isOpen);
  useEffect(() => {
    if (data.length > 0) {
      data.forEach((el: some) => {
        if (el?.category === type) {
          nearByData[type].forEach(nearByItem => {
            const temp: Array<some> = data.filter((v: some) => v?.types === nearByItem.code);
            temp.forEach((v: some, vIndex: number) => {
              setFieldValue(`${v?.types}_id_${type}_${vIndex}`, v?.id);
              setFieldValue(`${v?.types}_${type}_${vIndex}`, v?.name);
              setFieldValue(`${v?.types}_distance_${type}_${vIndex}`, v?.distance);
            });
          });
        }
      });
    } // eslint-disable-next-line
  }, []);
  return (
    <Card
      className={`card-container card-setting card-near-by ${isApproval ? 'near-by-approval' : ''}`}
    >
      <Row className="header-card">
        <Typography variant="h6" component="p" style={{ width: '100%' }} className="header-text">
          {title}
        </Typography>
        {!isApproval && (
          <Row className="right-icon-card-header">
            <ArrowIconCircle
              onClick={handleCollapse}
              className="arrow-circle-icon"
              style={{ transform: !isOpen ? 'rotate(180deg)' : undefined }}
            />
          </Row>
        )}
      </Row>
      <Divider />
      <Collapse in={isOpen}>
        <CardContent>
          {nearByData[type].map((el: NearByItemsProps, idx: number) => (
            <NearByItem
              key={idx}
              headerText={intl.formatMessage({ id: el.name })}
              type={type}
              dataItems={data.filter((v: some) => v?.types === el.code && v?.category === type)}
              fieldName={el.code}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default React.memo(CardNearBy);
