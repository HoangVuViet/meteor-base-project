/* eslint-disable react/no-danger */
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as React from 'react';
import { some } from '../../../../constants';
import { CardCustom, Col } from '../../../common/components/elements';
import './HotelCommon.scss';

interface Props {
  item: some;
  openCreate: () => void;
  disable?: boolean;
}
const CreateHotelCard: React.FC<Props> = props => {
  const { item, openCreate, disable } = props;
  return (
    <CardCustom
      className="card-container"
      onClick={() => {
        if (!disable) openCreate();
      }}
      style={{ opacity: disable ? 0.5 : 1 }}
    >
      <Col style={{ justifyContent: 'center', width: '100%' }}>
        <CardMedia
          component="img"
          alt="hotel image"
          height={140}
          width={180}
          image={item?.imageUrl}
          className="image-content"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="p" className="title-text">
            {item?.name}
          </Typography>
          {item?.description && (
            <Typography variant="body2" component="div" className="text-description">
              <div dangerouslySetInnerHTML={{ __html: item?.description }} />
            </Typography>
          )}
        </CardContent>
      </Col>
    </CardCustom>
  );
};

export default React.memo(CreateHotelCard);
