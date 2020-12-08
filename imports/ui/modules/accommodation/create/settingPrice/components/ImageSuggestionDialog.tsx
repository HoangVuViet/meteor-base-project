import { ButtonBase, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { BLUE_500 } from '../../../../../configs/colors';
import { ReactComponent as CameraIconSolid } from '../../../../../svg/ic_camera_solid.svg';
import { ReactComponent as QuestionIconCircle } from '../../../../../svg/ic_question_circle.svg';
import { LIST_LINK_PHOTO_SUGGEST } from '../../../../accommodation/constant';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import { Row } from '../../../../common/components/elements';
import ProgressiveImage from '../../../../common/components/ProgressiveImage';
import './CreateHotel.scss';

const ImageSuggestionDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <Row className="question-icon" onClick={openDialog}>
        <ButtonBase>
          <QuestionIconCircle />
          <Typography variant="body2" component="span" style={{ color: BLUE_500 }}>
            <FormattedMessage id="IDS_HMS_IMAGE_SUGGESTION" />
          </Typography>
        </ButtonBase>
      </Row>
      <ConfirmDialog
        open={open}
        onClose={closeDialog}
        onAccept={closeDialog}
        titleLabel={
          <Typography gutterBottom variant="subtitle1" component="span" className="header-dialog">
            <FormattedMessage id="IDS_HMS_IMAGE_SUGGESTION" />
          </Typography>
        }
        acceptLabel="IDS_HMS_CLOSE"
      >
        <div className="dialog-content">
          <Row>
            <IconButton>
              <CameraIconSolid />
            </IconButton>
            <Typography gutterBottom variant="body2" component="p" className="avatar-manual-text">
              <FormattedMessage id="IDS_HMS_IMAGE_SUGGEST_AVATAR" />
            </Typography>
          </Row>
          <Row style={{ marginRight: 16, marginLeft: 48 }}>
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[0]}
              alt=""
            />
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[1]}
              alt=""
            />
            <ProgressiveImage
              style={{ maxWidth: 240, borderRadius: 4, objectFit: 'cover' }}
              src={LIST_LINK_PHOTO_SUGGEST[2]}
              alt=""
            />
          </Row>
          <Row>
            <IconButton>
              <CameraIconSolid />
            </IconButton>
            <Typography gutterBottom variant="body2" component="p" className="avatar-manual-text">
              <FormattedMessage id="IDS_HMS_IMAGE_SUGGEST_CONVENIENT" />
            </Typography>
          </Row>
          <Row style={{ marginRight: 16, marginLeft: 48 }}>
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[3]}
              alt=""
            />
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[4]}
              alt=""
            />
            <ProgressiveImage
              style={{ maxWidth: 240, borderRadius: 4, objectFit: 'cover' }}
              src={LIST_LINK_PHOTO_SUGGEST[5]}
              alt=""
            />
          </Row>
          <Row>
            <IconButton>
              <CameraIconSolid />
            </IconButton>

            <Typography gutterBottom variant="body2" component="p" className="avatar-manual-text">
              <FormattedMessage id="IDS_HMS_IMAGE_SUGGEST_BATHROOM" />
            </Typography>
          </Row>
          <Row style={{ marginRight: 16, marginLeft: 48 }}>
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[6]}
              alt=""
            />
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[7]}
              alt=""
            />
            <ProgressiveImage
              style={{ maxWidth: 240, borderRadius: 4, objectFit: 'cover' }}
              src={LIST_LINK_PHOTO_SUGGEST[8]}
              alt=""
            />
          </Row>
          <Row>
            <IconButton>
              <CameraIconSolid />
            </IconButton>

            <Typography gutterBottom variant="body2" component="p" className="avatar-manual-text">
              <FormattedMessage id="IDS_HMS_IMAGE_SUGGEST_BALCON" />
            </Typography>
          </Row>
          <Row style={{ margin: '0 16px 20px 48px' }}>
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[9]}
              alt=""
            />
            <ProgressiveImage
              className="image-suggestion"
              src={LIST_LINK_PHOTO_SUGGEST[10]}
              alt=""
            />
            <ProgressiveImage
              style={{ maxWidth: 240, borderRadius: 4, objectFit: 'cover' }}
              src={LIST_LINK_PHOTO_SUGGEST[11]}
              alt=""
            />
          </Row>
        </div>
      </ConfirmDialog>
    </>
  );
};
export default React.memo(ImageSuggestionDialog);
