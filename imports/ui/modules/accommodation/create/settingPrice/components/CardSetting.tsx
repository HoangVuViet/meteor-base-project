import {
  Card,
  CardContent,
  Collapse,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconClose from '@material-ui/icons/Close';
import { Field, FieldAttributes, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { BLACK, GREY_900, SECONDARY, WHITE } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some } from '../../../../../constants';
import { ROLES } from '../../../../../layout/constants';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as ArrowIconCircle } from '../../../../../svg/ic_arrow_circle.svg';
import { ReactComponent as DeleteIconCircle } from '../../../../../svg/ic_delete_circle.svg';
import { ReactComponent as DocIconCircle } from '../../../../../svg/ic_doc_circle.svg';
import { ReactComponent as InfoIconCircle } from '../../../../../svg/ic_info_circle.svg';
import { Row } from '../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../common/components/Form';
import BootstrapTooltip from '../../../common/BootstrapTooltip';
import {
  FieldCheckboxContent,
  FieldSelectContent,
  FieldTextContent,
} from '../../../common/FieldContent';
import PhotoListPaper from '../../../common/PhotoListPaper';
import { checkRole } from '../../../utils';
import GeneralAlbum from '../../hotelGallery/components/GeneralAlbum';
import BedType from '../components/BedType';
import './CreateHotel.scss';
import ImageSuggestionDialog from './ImageSuggestionDialog';
import SelectConvenientDialog from './SelectConvenientDialog';

interface CardProps {
  index: number;
  handleRemove?: () => void;
  copyRoom?: () => void;
}
const CardSetting: React.FC<CardProps> = props => {
  const { handleRemove, copyRoom, index } = props;
  const { setFieldValue, values } = useFormikContext();

  const { roomTypes, roomClass, roomView, photos } = useSelector(
    (state: AppState) => state.accommodation,
    shallowEqual,
  );
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);
  const { generalHotelInfo } = useSelector((state: AppState) => state.accommodation, shallowEqual);
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.contactInfo;
  const isHotelApproved = generalHotelInfo?.approveStatus === 'approved';
  const intl = useIntl();
  const [isOpen, setOpen] = useState(!(isApproval && (values as any)[`id_${index}`]));
  const [openAlbum, setOpenAlbum] = React.useState<boolean>(false);
  const [typePhoto, setTypePhoto] = React.useState<number>(0);

  const handleCollapse = () => setOpen(!isOpen);
  const handleSubmitFeature = (ids: Array<number>) => {
    setFieldValue(`roomFeatureIds_${index}`, ids);
  };
  const getRoomName = (type: number) => {
    return photos?.rooms.map((element: any) => {
      if (element.type === type) {
        return element.name;
      }
      return '';
    });
  };

  return (
    <Card className={`card-container card-setting ${isApproval ? 'card-approval' : ''}`}>
      <Row className="header-card">
        <Typography gutterBottom variant="h6" component="span" className="header-text">
          {isApproval ? (
            <>{(values as some)[`name_${index}`]}</>
          ) : (
            <>
              <FormattedMessage id="IDS_HMS_ROOM_TYPE" />
              <span>&nbsp;{index + 1}</span>
            </>
          )}
        </Typography>
        <Divider className="header-divider" orientation="vertical" />
        {!isApproval ? (
          <Field
            name={`name_${index}`}
            as={(propsField: FieldAttributes<any>) => (
              <InputBase
                {...propsField}
                readOnly
                className="header-input"
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_NAME' })}
              />
            )}
          />
        ) : (
          <Grid container spacing={3} className="image-description">
            <Grid item xs={2}>
              <Typography gutterBottom variant="body2" component="p">
                <FormattedMessage id="IDS_HMS_ROOM_AMOUNT" />
              </Typography>
              <Typography gutterBottom variant="body2" component="p" style={{ color: GREY_900 }}>
                {(values as some)[`totalRoom_${index}`]}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom variant="body2" component="p">
                <FormattedMessage id="IDS_HMS_ROOM_AREA_FIELD" />
              </Typography>
              <Typography gutterBottom variant="body2" component="p" style={{ color: GREY_900 }}>
                {(values as some)[`minArea_${index}`]}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom variant="body2" component="p">
                <FormattedMessage id="IDS_HMS_MAX_CUSTOMER" />
              </Typography>
              <Typography gutterBottom variant="body2" component="p" style={{ color: GREY_900 }}>
                {(values as some)[`standardAdult_${index}`]}&nbsp;
                {intl.formatMessage({ id: 'IDS_HMS_AUDULT' })},&nbsp;
                {(values as some)[`standardAdult_${index}`]}&nbsp;
                {intl.formatMessage({ id: 'IDS_HMS_CHILDREN' })}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Row className="right-icon-card-header">
          <DocIconCircle onClick={copyRoom} />
          {index > 0 &&
            !(isApproval && !checkRole(ROLES.HMS_PRE_ADMIN, roleUser)) &&
            !isHotelApproved && <DeleteIconCircle onClick={handleRemove} />}
          <ArrowIconCircle
            onClick={handleCollapse}
            style={{
              transform: !isOpen ? 'rotate(180deg)' : undefined,
              transition: '300ms linear all',
            }}
          />
        </Row>
      </Row>
      <Divider />
      <Collapse in={isOpen}>
        <CardContent style={{ marginTop: 12 }}>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldSelectContent
                name={`roomTypeId_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_TYPE_FIELD' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_TYPE_FIELD_PLACEHOLDER' })}
                options={roomTypes?.items || []}
                getOptionLabel={(v: any) => v.name}
                onSelectOption={(value: number) => {
                  setFieldValue(`roomTypeId_${index}`, value);
                }}
              />
            </Grid>
            {(values as some)[`roomTypeId_${index}`] && (
              <Grid item xs={4} style={{ paddingBottom: 6 }}>
                <FieldSelectContent
                  name={`roomClassId_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_ROOM_CLASS_FIELD' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_CLASS_FIELD_PLACEHOLDER' })}
                  options={
                    roomClass?.items
                      ? roomClass.items.filter(
                          (el: any) => el?.roomTypeId === (values as some)[`roomTypeId_${index}`],
                        )
                      : []
                  }
                  getOptionLabel={(v: any) => v.name}
                  onSelectOption={(value: number) => {
                    const itemSelected: Array<any> = roomClass?.items.filter(
                      (el: any) => el?.id === value,
                    );
                    if (itemSelected[0]) setFieldValue(`name_${index}`, itemSelected[0]?.name);
                    setFieldValue(`roomClassId_${index}`, value);
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldSelectContent
                name={`roomViewIds_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_DIRECTION_FIELD' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_DIRECTION_FIELD_PLACEHOLDER' })}
                multiple
                options={roomView?.items || []}
                getOptionLabel={(v: any) => v.name}
                onSelectOption={(value: any) => {
                  setFieldValue(`roomViewIds_${index}`, value);
                }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              className="checkbox-field"
              style={{ minWidth: 240, paddingBottom: 6 }}
            >
              <FieldCheckboxContent
                name={`hasBathroom_${index}`}
                checked={!!(values as any)[`hasBathroom_${index}`]}
                label={
                  <span style={{ fontSize: 14 }}>
                    {intl.formatMessage({ id: 'IDS_HMS_ROOM_BATHROOM_FIELD' })}
                  </span>
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8} style={{ paddingBottom: 6 }}>
              <FieldTextContent
                name={`name_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_NAME' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_NAME' })}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldTextContent
                name={`minArea_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_AREA_FIELD' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_AREA_FIELD' })}
                endAdornment={<span className="end-adornment">m2</span>}
                inputComponent={NumberFormatCustom as any}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <BedType
                headerText={intl.formatMessage({ id: 'IDS_HMS_BED_TYPE' })}
                type={1}
                cardIndex={index}
              />
            </Grid>
            <Grid item xs={6}>
              <BedType
                headerText={intl.formatMessage({ id: 'IDS_HMS_BED_TYPE_REPLACE' })}
                optional
                type={0}
                cardIndex={index}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldTextContent
                name={`standardAdult_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_PEOPLE_NUMBER' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_PEOPLE_NUMBER' })}
                inputComponent={NumberFormatCustom as any}
              />
            </Grid>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldTextContent
                name={`maxExtraBed_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_EXTRA_BED' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_EXTRA_BED' })}
                inputComponent={NumberFormatCustom as any}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid
              item
              xs={4}
              className="checkbox-field"
              style={{ paddingBottom: 6, paddingTop: 0 }}
            >
              <FieldCheckboxContent
                name={`hasChildren_${index}`}
                checked={!!(values as any)[`hasChildren_${index}`]}
                label={
                  <span style={{ fontSize: 14, marginLeft: -6 }}>
                    {intl.formatMessage({ id: 'IDS_HMS_ROOM_HAS_CHILDREN' })}
                  </span>
                }
              />
            </Grid>
          </Grid>
          {Boolean((values as any)[`hasChildren_${index}`]) && (
            <Grid container spacing={3}>
              <Grid item xs={4} style={{ paddingBottom: 6 }}>
                <FieldTextContent
                  name={`maxChildren_${index}`}
                  label={intl.formatMessage({ id: 'IDS_HMS_ROOM_MAX_CHILDREN_FREE' })}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_MAX_CHILDREN_FREE' })}
                  helpText={intl.formatMessage({ id: 'IDS_HMS_ROOM_CHILDREN_DEFINE' })}
                  inputComponent={NumberFormatCustom as any}
                />
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ paddingBottom: 6 }}>
              <Field
                name={`allowSmoking_${index}`}
                as={(propsField: any) => (
                  <Row>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="span"
                      className="header-text"
                    >
                      <FormattedMessage id="IDS_HMS_ROOM_SMOKE" />
                    </Typography>
                    <RadioGroup {...propsField} className="radio-group">
                      <FormControlLabel
                        value="true"
                        control={<Radio style={{ color: SECONDARY }} size="small" />}
                        label={intl.formatMessage({ id: 'IDS_HMS_YES' })}
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio style={{ color: SECONDARY }} size="small" />}
                        label={intl.formatMessage({ id: 'IDS_HMS_NO' })}
                      />
                    </RadioGroup>
                  </Row>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <FieldTextContent
                name={`totalRoom_${index}`}
                label={intl.formatMessage({ id: 'IDS_HMS_ROOM_AMOUNT' })}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_AMOUNT' })}
                inputComponent={NumberFormatCustom as any}
              />
            </Grid>
            {checkRole(ROLES.HMS_PRE_PROVIDER, roleUser) &&
              !checkRole(ROLES.HMS_PRE_ADMIN, roleUser) &&
              !isHotelApproved && (
                <Grid
                  item
                  xs={4}
                  style={{ display: 'flex', alignItems: 'center', paddingBottom: 6 }}
                >
                  <FieldTextContent
                    name={`price_${index}`}
                    label={intl.formatMessage({ id: 'IDS_HMS_ROOM_PRICE' })}
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_ROOM_PRICE' })}
                    endAdornment={<span className="end-adornment">VND</span>}
                    inputComponent={NumberFormatCustom as any}
                    formControlStyle={{ marginRight: 0 }}
                  />
                  <BootstrapTooltip
                    title={<FormattedMessage id="IDS_HMS_PRICE_BASE" />}
                    placement="bottom"
                  >
                    <IconButton>
                      <InfoIconCircle />
                    </IconButton>
                  </BootstrapTooltip>
                </Grid>
              )}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ paddingBottom: 6 }}>
              <SelectConvenientDialog
                handleSubmitFeature={handleSubmitFeature}
                initRoomFeatureIds={(values as some)[`roomFeatureIds_${index}`] || []}
                keyValues={`roomFeatureIds_${index}`}
              />
            </Grid>
          </Grid>
          <Row className="image-title">
            <Typography gutterBottom variant="subtitle1" component="span">
              <FormattedMessage id="IDS_HMS_IMAGE" />
            </Typography>
          </Row>
          <Divider />
          <Grid container spacing={3} className="image-description">
            <Grid item xs={4}>
              <ul>
                <li>
                  <Typography gutterBottom variant="body2" component="span">
                    <FormattedMessage id="IDS_HMS_IMAGE_SIZE_MIN" />
                  </Typography>
                </li>
                <li>
                  <Typography gutterBottom variant="body2" component="span">
                    <FormattedMessage id="IDS_HMS_IMAGE_SIZE_MAX" />
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ul>
                <li>
                  <Typography gutterBottom variant="body2" component="span">
                    <FormattedMessage id="IDS_HMS_IMAGE_STORAGE_MIN" />
                  </Typography>
                </li>
                <li>
                  <Typography gutterBottom variant="body2" component="span">
                    <FormattedMessage id="IDS_HMS_IMAGE_STORAGE_MAX" />
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <ImageSuggestionDialog />
            </Grid>
          </Grid>
          {(values as some)[`photoRooms_${index}`] &&
            (values as some)[`photoRooms_${index}`].map((v: some, idx: number) => (
              <Paper
                key={`photoRooms_${idx}`}
                variant="outlined"
                className="bed-type-wrapper photos-wrapper"
              >
                <PhotoListPaper
                  title={getRoomName(v?.type)}
                  listUrl={v.items}
                  isGallery={false}
                  key={`photo_rooms_${index}`}
                  deletePhotos={(idPhoto: number[]) => {
                    const temp: any = [];
                    v.items.forEach((ele: any) => {
                      idPhoto.forEach(element => {
                        if (element !== ele.id) {
                          temp.push(ele);
                        }
                      });
                    });
                    const tempListPhotos = { ...v, items: temp };
                    const tempData = (values as some)[`photoRooms_${index}`];
                    tempData[idx] = tempListPhotos;

                    setFieldValue(`photoRooms_${index}`, tempData);
                  }}
                  saveFunctions={() => {
                    setOpenAlbum(true);
                    setTypePhoto(v?.type);
                  }}
                  setTempListPhoto={(listPhoto: string[]) => {
                    const tempListPhotos = { ...v, items: listPhoto };
                    const temp = (values as some)[`photoRooms_${index}`];
                    temp[idx] = tempListPhotos;
                    setFieldValue(`photoRooms_${index}`, temp);
                  }}
                  isRoom
                />
              </Paper>
            ))}
        </CardContent>
      </Collapse>
      <Dialog
        fullScreen
        open={openAlbum}
        onClose={setOpenAlbum}
        PaperProps={{ style: { overflow: 'hidden', height: '100vh' } }}
      >
        <Toolbar style={{ background: BLACK, opacity: 0.8, justifyContent: 'flex-end' }}>
          <IconButton edge="end" size="medium" onClick={() => setOpenAlbum(false)}>
            <IconClose className="svgFilAll" style={{ height: 40, width: 40, fill: WHITE }} />
          </IconButton>
        </Toolbar>
        <GeneralAlbum
          typePhoto={typePhoto}
          listRoomTypes={photos?.rooms}
          setTypePhoto={setTypePhoto}
          saveFunctions={(urlPhoto: any[]) => {
            const tempListPhotos = (values as some)[`photoRooms_${index}`].map((element: any) => {
              if (element.type === typePhoto) {
                // eslint-disable-next-line no-param-reassign
                element.items = element.items.concat(urlPhoto);
              }
              return element;
            });

            setFieldValue(`photoRooms_${index}`, tempListPhotos);
            setOpenAlbum(false);
          }}
        />
      </Dialog>
    </Card>
  );
};

export default React.memo(CardSetting);
