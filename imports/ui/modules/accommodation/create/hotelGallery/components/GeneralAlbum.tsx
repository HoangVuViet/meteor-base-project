/* eslint-disable func-names */
import { Button, ButtonBase, Divider, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  BLACK_90,
  GREY_300,
  GREY_600,
  SECONDARY,
  WHITE,
  WHITE_10,
} from '../../../../../configs/colors';
import { PAGE_SIZE_20, some, SUCCESS_CODE } from '../../../../../constants';
import {
  IMAGE_ALLOW_TYPE,
  MAX_DIMENSION,
  MAX_NUMBER_PHOTOS,
  MAX_SIZE_IMAGE,
  MIN_DIMENSION_HEIGHT,
  MIN_DIMENSION_WIDTH,
  MIN_SIZE_IMAGE,
} from '../../../../../models/uploadFile';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as UploadIcon } from '../../../../../svg/Upload.svg';
import ConfirmDialogSimple from '../../../../common/components/ConfirmDialogSimple';
import { Col, Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import ProgressiveImageCheckBox from '../../../../common/components/ProgressiveImageCheckBox';
import SingleSelect from '../../../../common/components/SingleSelect';
import { uploadImage } from '../../../../common/redux/reducer';
import { actionsGeneralAlbum } from '../../../accommodationService';
import { WhiteBackgroundCheckbox } from '../../../common/WhiteBackgroundCheckbox';
import { DataPhotoHotels, defaultListTypePhotoHotel, isEmpty } from '../../../utils';

interface Props {
  typePhoto: number;
  listRoomTypes: any[];
  setTypePhoto(data: number): void;
  saveFunctions(data: any[]): void;
}

function GeneralAlbum(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { typePhoto, listRoomTypes, setTypePhoto, saveFunctions } = props;

  const [urlPhoto, setUrlPhoto] = React.useState<any[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(PAGE_SIZE_20);
  const [idPhoto, setIdPhoto] = React.useState<number[]>([]);
  const [isChecked, setIsChecked] = React.useState<number[]>([]);
  const [listGeneralPhotoHotels, setGeneralListDataPhotoHotels] = useState<DataPhotoHotels[]>(
    defaultListTypePhotoHotel,
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [totalPhotoUpload, setTotalPhotoUpload] = React.useState<number>(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const match: any = useRouteMatch();
  const intl = useIntl();

  const handleCheckAll = (stt: boolean) => {
    if (stt) {
      listGeneralPhotoHotels.forEach((v: any, index: number) => {
        idPhoto[index] = v?.id;
        setIdPhoto([...idPhoto]);
        isChecked[index] = index;
        setIsChecked([...isChecked]);
      });
      setUrlPhoto(listGeneralPhotoHotels);
    } else {
      setIdPhoto([]);
      setIsChecked([]);
      setUrlPhoto([]);
    }
  };

  const loadMore = React.useCallback(
    async (page: number) => {
      if (page > 15) {
        // safety valve
      }
      try {
        const searchStr = querystring.stringify({
          pageOffset: page,
          pageSize: PAGE_SIZE_20,
          hotelId: match?.params?.hotelId,
        });
        const { data, code, message } = await dispatch(actionsGeneralAlbum(searchStr));
        if (code === SUCCESS_CODE) {
          setGeneralListDataPhotoHotels([...listGeneralPhotoHotels, ...data?.items]);
        } else {
          enqueueSnackbar(
            message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
        }
      } catch (error) {
      } finally {
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, listGeneralPhotoHotels, match],
  );

  const actionGeneralAlbumGet = useCallback(
    async (lengthData: number) => {
      try {
        const searchStr = querystring.stringify({
          pageOffset: 0,
          pageSize: PAGE_SIZE_20,
          hotelId: match?.params?.hotelId,
        });
        const { data, code, message } = await dispatch(actionsGeneralAlbum(searchStr));
        if (code === SUCCESS_CODE) {
          setTotalResults(data.total);
          setGeneralListDataPhotoHotels(data?.items);
          setIsChecked([...Array(lengthData).keys()]);
          const tempIdPhoto = [];
          for (let i = 0; i < lengthData; i += 1) {
            tempIdPhoto.push(data.items[i]?.id);
            setIdPhoto([...tempIdPhoto]);
          }
        } else {
          enqueueSnackbar(
            message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeSnackbar, dispatch, enqueueSnackbar, match],
  );

  const actionGetHotelGalleryDelete = useCallback(async () => {
    setLoading(true);
    try {
      const searchStr = querystring.stringify({
        hotelId: match?.params?.hotelId,
      });
      const { code, message } = await dispatch(
        actionsGeneralAlbum(searchStr, 'delete', JSON.stringify(idPhoto.filter(item => item))),
      );
      if (code === SUCCESS_CODE) {
        actionGeneralAlbumGet(0);
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
        );
      } else {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setIdPhoto([]);
      setIsChecked([]);
    } catch (error) {
    } finally {
      setOpenDialog(false);
      setLoading(false);
    }
  }, [actionGeneralAlbumGet, closeSnackbar, dispatch, enqueueSnackbar, idPhoto, match]);

  const actionGeneralAlbum = useCallback(
    async (dataGeneralPhoto: any[]) => {
      dataGeneralPhoto.map(ele => {
        return Object.assign(ele, { ...ele, thumbnail: ele.thumbLink });
      });
      const tempDataGeneralPhoto = dataGeneralPhoto.filter(ele => {
        return !!ele.thumbnail;
      });
      if (!tempDataGeneralPhoto.length) return;
      try {
        const searchStr = querystring.stringify({
          hotelId: match?.params?.hotelId,
        });
        const { code, message } = await dispatch(
          actionsGeneralAlbum(searchStr, 'post', JSON.stringify(tempDataGeneralPhoto)),
        );
        if (code === SUCCESS_CODE) {
          actionGeneralAlbumGet(tempDataGeneralPhoto.length);
        } else {
          enqueueSnackbar(
            message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
        }
      } catch (error) {
      } finally {
      }
    },
    [actionGeneralAlbumGet, closeSnackbar, dispatch, enqueueSnackbar, match],
  );

  const uploadPhoto = useCallback(
    async (files: File[]) => {
      // const fileError: File[] = [];
      const fileUploads: any[] = [];
      return files.forEach(async (file: File, idx: number) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        await image.decode();
        if (image.width > MAX_DIMENSION || image.height > MAX_DIMENSION) {
          enqueueSnackbar(
            intl.formatMessage({ id: 'IDS_HMS_IMAGE_SIZE_MAX' }),
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
          // fileError.push(file);
          return;
        }
        if (image.width < MIN_DIMENSION_WIDTH || image.height < MIN_DIMENSION_HEIGHT) {
          enqueueSnackbar(
            intl.formatMessage({ id: 'IDS_HMS_IMAGE_SIZE_MIN' }),
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
          return;
        }
        fileUploads.push(dispatch(uploadImage([file])));

        if (idx === files.length - 1) {
          const res = await Promise.all(fileUploads);
          const result: any = [];
          if (!isEmpty(res)) {
            res.forEach((el: any) => {
              result.push({
                ...el.photo,
                type: typePhoto,
                photoId: el.photo?.id,
                url: el.photo?.link,
              });
            });
          }
          setTotalPhotoUpload(0);
          enqueueSnackbar(
            <FormattedMessage
              id="IDS_HMS_NUMBER_SUCCESS"
              values={{ num: fileUploads.length, total: files.length }}
            />,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'success',
            }),
          );
          actionGeneralAlbum([...result]);
        }
      });
    },
    [actionGeneralAlbum, closeSnackbar, dispatch, enqueueSnackbar, intl, typePhoto],
  );

  const handleToggle = (value: number) => {
    const currentIndex = isChecked.indexOf(value);
    const newChecked = [...isChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setIsChecked(newChecked);
  };

  const handleChange = (id: number) => {
    const currentIndex = idPhoto.indexOf(id);
    const newChecked = [...idPhoto];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setIdPhoto(newChecked);
  };

  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    multiple: true,
    onDrop: (acceptedFiles: File[]) => {
      setTotalPhotoUpload(acceptedFiles.length);
      setLoading(true);
      let isUpload = true;
      if (!acceptedFiles.length) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'imageSizeInvalid' }),
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
        setLoading(false);
        isUpload = false;
      }
      if (acceptedFiles.length > MAX_NUMBER_PHOTOS) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'IDS_HMS_IMAGE_NUMBER_MAX' }),
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
        setLoading(false);
        isUpload = false;
      }
      isUpload && uploadPhoto && uploadPhoto(acceptedFiles);
    },
    accept: IMAGE_ALLOW_TYPE,
    maxSize: MAX_SIZE_IMAGE,
    minSize: MIN_SIZE_IMAGE,
  });

  React.useEffect(() => {
    actionGeneralAlbumGet(0);
  }, [actionGeneralAlbumGet]);

  return (
    <>
      <Row style={{ height: '100%' }}>
        <Col
          style={{
            width: '70%',
            height: '100%',
            overflow: 'auto',
            background: BLACK_90,
            paddingLeft: 16,
          }}
        >
          {!!listGeneralPhotoHotels.length && (
            <Row style={{ justifyContent: 'space-between' }}>
              <Typography variant="h5" style={{ color: WHITE, padding: 8 }}>
                <FormattedMessage id="IDS_HMS_generalAlbum" />
              </Typography>
              <div>
                {!!idPhoto.filter(item => item).length && (
                  <>
                    <LoadingButton
                      style={{ minHeight: 36, marginRight: 16, minWidth: 100 }}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disableElevation
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    >
                      <Typography variant="body2">
                        <FormattedMessage id="IDS_HMS_DELETE" />
                      </Typography>
                    </LoadingButton>
                    <Button
                      style={{ minHeight: 36, color: GREY_600, minWidth: 100 }}
                      variant="outlined"
                      onClick={() => {
                        setIdPhoto([]);
                        setIsChecked([]);
                      }}
                      disableElevation
                    >
                      <Typography variant="body2">
                        <FormattedMessage id="IDS_HMS_REJECT" />
                      </Typography>
                    </Button>
                  </>
                )}
                <WhiteBackgroundCheckbox
                  checked={listGeneralPhotoHotels.length === idPhoto.filter(item => item).length}
                  indeterminate={
                    !!idPhoto.filter(item => item).length &&
                    listGeneralPhotoHotels.length !== idPhoto.filter(item => item).length
                  }
                  style={{
                    color:
                      listGeneralPhotoHotels.length === idPhoto.filter(item => item).length
                        ? SECONDARY
                        : GREY_600,
                  }}
                  onChange={event => {
                    handleCheckAll(event.target.checked);
                  }}
                />
              </div>
            </Row>
          )}
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={loadMore}
            hasMore={listGeneralPhotoHotels.length < totalResults}
            loader={
              <LoadingIcon
                key="loader"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            }
            useWindow={false}
          >
            <Grid container spacing={3}>
              {loading ? (
                <div />
              ) : (
                listGeneralPhotoHotels &&
                listGeneralPhotoHotels.map((v: any, index) => (
                  <Grid key={index} item xs={2} style={{ maxWidth: 225, margin: '4px 8px' }}>
                    <ProgressiveImageCheckBox
                      index={index}
                      value={isChecked.indexOf(index) !== -1}
                      onChange={() => {
                        handleToggle(index);
                        setUrlPhoto([...urlPhoto, v]);
                        handleChange(v?.id);
                      }}
                      thumbnail={v.thumbnail}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </InfiniteScroll>
        </Col>
        <Col style={{ width: '30%', height: '100%', padding: 24, background: WHITE_10 }}>
          {!!idPhoto.filter(item => item).length && (
            <>
              <Typography variant="body2" style={{ paddingBottom: 8, color: WHITE }}>
                <FormattedMessage id="IDS_HMS_pickPhoto" />
              </Typography>
              <Row>
                {listRoomTypes && (
                  <SingleSelect
                    value={listRoomTypes.find((v: some) => v.type === typePhoto)?.id || null}
                    onSelectOption={(value: any) =>
                      setTypePhoto(
                        listRoomTypes.find((ele: any) => {
                          return ele.id === value;
                        })?.type || null,
                      )
                    }
                    getOptionLabel={value => value?.name}
                    options={listRoomTypes}
                    errorMessage=""
                  />
                )}
                <LoadingButton
                  style={{ marginBottom: 20, minWidth: 100, marginLeft: 16 }}
                  variant="contained"
                  color="secondary"
                  disableElevation
                  onClick={() => saveFunctions(urlPhoto)}
                >
                  <Typography variant="body2">
                    <FormattedMessage id="IDS_HMS_SAVE" />
                  </Typography>
                </LoadingButton>
              </Row>
              <Divider style={{ backgroundColor: GREY_300, marginBottom: 20 }} />
            </>
          )}
          {!totalPhotoUpload && (
            <>
              <Typography variant="body2" style={{ color: WHITE }}>
                <FormattedMessage id="IDS_HMS_albumPhotoNotes" />
              </Typography>
              <ButtonBase
                style={{
                  background: SECONDARY,
                  display: 'flex',
                  height: 40,
                  width: 160,
                  marginTop: 16,
                  borderRadius: 4,
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Typography
                  variant="body2"
                  style={{ display: 'flex', color: WHITE, alignItems: 'center' }}
                >
                  <UploadIcon
                    className="svgFilAll"
                    style={{ height: 32, width: 32, paddingRight: 8 }}
                  />
                  <FormattedMessage id="IDS_HMS_uploadOtherPhotos" />
                </Typography>
              </ButtonBase>
            </>
          )}
          {totalPhotoUpload && (
            <Typography variant="body2" style={{ color: WHITE }}>
              <FormattedMessage values={{ total: totalPhotoUpload }} id="IDS_HMS_PROGRESS_PHOTOS" />
            </Typography>
          )}
        </Col>
      </Row>
      <ConfirmDialogSimple
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAccept={() => {
          actionGetHotelGalleryDelete();
        }}
        onReject={() => setOpenDialog(false)}
        titleLabel={<FormattedMessage id="confirm" />}
        maxWidth="sm"
        acceptLabel="accept"
        rejectLabel="IDS_HMS_REJECT"
      >
        <Typography variant="body1" style={{ marginTop: '16px' }}>
          <FormattedMessage id="IDS_HMS_CONFIRM_PHOTO_DIALOG" />
        </Typography>
      </ConfirmDialogSimple>
    </>
  );
}

export default GeneralAlbum;
