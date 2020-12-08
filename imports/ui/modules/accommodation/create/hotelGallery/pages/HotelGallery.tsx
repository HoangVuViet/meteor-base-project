import {
  Button,
  Collapse,
  Dialog,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import IconClose from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { BLACK, BLUE_500, GREY_100, GREY_600, RED, WHITE } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as ArrowIconCircle } from '../../../../../svg/ic_arrow_circle.svg';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import { redMark } from '../../../../common/components/Form';
import LoadingButton from '../../../../common/components/LoadingButton';
import { goToAction } from '../../../../common/redux/reducer';
import {
  actionGetHotelGallery,
  actionsRoomPhotos,
  getInfoPhotos,
  getRoomHotelGallery,
  reorderHotelGallery,
  reorderRoomPhotos,
  updateProgress,
} from '../../../accommodationService';
import PhotoListPaper from '../../../common/PhotoListPaper';
import { DataPhotoHotels, defaultListTypePhotoHotel } from '../../../utils';
import ImageSuggestionDialog from '../../settingPrice/components/ImageSuggestionDialog';
import GeneralAlbum from '../components/GeneralAlbum';

export const UlColor = styled.ul`
  color: ${GREY_600};
`;
export const LiColor = styled.li`
  li::before {
    content: '?';
    color: ${BLUE_500};
  }
`;

function HotelGallery() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [isOpen, setOpen] = useState<boolean[]>([]);
  const [openAlbum, setOpenAlbum] = React.useState<boolean>(false);
  const [typePhoto, setTypePhoto] = React.useState<number>(0);
  const [isTypeRoom, setIsTypeRoom] = React.useState<boolean>(false);
  const [typeRooms, setTypeRooms] = React.useState<any[]>([]);
  const [listTypePhotoRoomsHotel, setListTypePhotoRoomsHotel] = useState<any[]>();
  const [listTypePhotoHotel, setListTypePhotoHotel] = useState<DataPhotoHotels[]>(
    defaultListTypePhotoHotel,
  );

  const [tempListTypePhotoHotel, setTempListTypePhotoHotel] = useState<DataPhotoHotels[]>(
    defaultListTypePhotoHotel,
  );
  const [validateHotel, setValidateHotel] = useState<boolean[]>([]);
  const [validateRoom, setValidateRoom] = useState<any>();
  const [type, setType] = React.useState<number>(0);

  const match: any = useRouteMatch();
  const intl = useIntl();

  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };

  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.hotelGallery;
  let tempDataListPhoto: any[] = [];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCollapse = (index: number, open: boolean) => {
    isOpen[index] = !open;
    setOpen([...isOpen]);
  };

  const getUrlPhotoHotel = async (
    listDataPhotoHotels: DataPhotoHotels[],
    isRoom: boolean,
    listTypes: any[],
  ) => {
    if (isRoom) {
      listDataPhotoHotels.forEach((element: any) => {
        element.items.forEach((ele: any) => {
          listTypes?.forEach((v: any) => {
            if (ele.type === v.type) {
              Object.assign(ele, v);
            }
          });
        });
      });
      setListTypePhotoRoomsHotel(listDataPhotoHotels);
    } else {
      const tempListDataPhotoHotel = listTypes?.map((element: any) => {
        listDataPhotoHotels.forEach(ele => {
          if (element.type === ele.type) {
            Object.assign(element, ele);
          }
        });
        return element;
      });
      setListTypePhotoHotel(tempListDataPhotoHotel);
    }
  };

  // eslint-disable-next-line consistent-return
  const listHotelTypes = async () => {
    try {
      const { data, code, message } = await dispatch(getInfoPhotos());
      if (code === SUCCESS_CODE) {
        return data;
      }
      enqueueSnackbar(
        message,
        snackbarSetting(key => closeSnackbar(key), {
          color: 'error',
        }),
      );
    } catch (error) {
    } finally {
    }
  };

  const getHotelCategories = async (hotelsProps: any[]) => {
    try {
      const { data, code, message } = await dispatch(
        actionGetHotelGallery(match?.params?.hotelId, 'get'),
      );
      if (code !== SUCCESS_CODE) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      } else {
        getUrlPhotoHotel(data.items, false, hotelsProps);
      }
    } catch (error) {
    } finally {
    }
  };

  const getRoomHotelCategories = async (roomsProps: any[]) => {
    try {
      const { data, code, message } = await dispatch(getRoomHotelGallery(match?.params?.hotelId));
      if (code !== SUCCESS_CODE) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      } else {
        getUrlPhotoHotel(data?.items, true, roomsProps);
      }
    } catch (error) {
    } finally {
    }
  };

  const deleteHotelCategories = async (arrayId: Array<number>) => {
    try {
      const { code, message } = await dispatch(
        actionGetHotelGallery(match?.params?.hotelId, 'delete', JSON.stringify(arrayId)),
      );
      if (code === SUCCESS_CODE) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
        );
        listHotelTypes().then(data => {
          getHotelCategories(data?.hotels);
        });
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
  };

  const deleteRoomPhotos = async (arrayId: Array<number>, typeRoom: number) => {
    try {
      const searchStr = querystring.stringify({
        roomId: typeRoom,
      });
      const { code, message } = await dispatch(
        actionsRoomPhotos(searchStr, 'delete', JSON.stringify(arrayId)),
      );
      if (code === SUCCESS_CODE) {
        listHotelTypes().then(data => {
          getRoomHotelCategories(data?.rooms);
          setTypeRooms(data?.rooms);
        });
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
    } catch (error) {
    } finally {
    }
  };

  const actionGetHotelGalleryPost = useCallback(
    async (urlPhoto: any[]) => {
      const params = urlPhoto.map((ele: any) => {
        return { ...ele, type: typePhoto };
      });
      try {
        const searchStr = querystring.stringify({
          roomId: type,
        });
        const { code, message } = await dispatch(
          isTypeRoom
            ? actionsRoomPhotos(searchStr, 'post', JSON.stringify(params))
            : actionGetHotelGallery(type, 'post', JSON.stringify(params)),
        );
        if (code !== SUCCESS_CODE) {
          enqueueSnackbar(
            message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
        }
      } catch (error) {
      } finally {
        setOpenAlbum(false);
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, isTypeRoom, setOpenAlbum, type, typePhoto],
  );

  const goNextAction = () => {
    dispatch(
      goToAction({
        pathname: getPathName(
          isApproval
            ? ROUTES.managerHotels.hotelInfo.approvalHotel.policy
            : ROUTES.managerHotels.createHotel.policy,
        ),
      }),
    );
  };

  const actionUpdateProgress = async () => {
    try {
      const { code, message } = await dispatch(updateProgress(match?.params?.hotelId));
      if (code === SUCCESS_CODE) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'success',
          }),
        );
        goNextAction();
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
      setOpenAlbum(false);
    }
  };

  const actionReorderRoomPhotos = async (listPhoto: string[], roomId: number) => {
    try {
      const { code, message } = await dispatch(reorderRoomPhotos(roomId, listPhoto));
      if (code !== SUCCESS_CODE) {
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
  };

  const actionReorderHotelGallery = async () => {
    const params = tempListTypePhotoHotel.map((ele: any) => {
      return ele.id;
    });

    try {
      const { code, message } = await dispatch(reorderHotelGallery(match?.params?.hotelId, params));
      if (code === SUCCESS_CODE) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'success',
          }),
        );
        actionUpdateProgress();
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
      setOpenAlbum(false);
    }
  };

  const actionReorderGallery = () => {
    tempDataListPhoto.forEach((element: any) => {
      element.items.forEach((ele: any) => {
        const arrayId = ele.items.map((v: any) => {
          return v.id;
        });
        if (arrayId.length) {
          actionReorderRoomPhotos(arrayId, element.id);
        }
      });
    });
  };

  const handleSummit = () => {
    listTypePhotoHotel.forEach((ele: any, index: number) => {
      validateHotel[index] = !ele.items?.length;
    });
    setValidateHotel([...validateHotel]);
    const tempValidateRoom: any = [];
    listTypePhotoRoomsHotel?.map((element: any, index: number) => {
      tempValidateRoom[index] = [];
      element?.items?.map((el: any, idx: number) => {
        tempValidateRoom[index][idx] = !el.items?.length;
      });
    });
    setValidateRoom([...tempValidateRoom]);
    if (tempValidateRoom.flat().find((ele: any) => ele)) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'required' }),
        snackbarSetting(key => closeSnackbar(key), {
          color: 'error',
        }),
      );
      return;
    }

    if (validateHotel.find((ele: any) => ele)) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'required' }),
        snackbarSetting(key => closeSnackbar(key), {
          color: 'error',
        }),
      );
      return;
    }

    actionReorderGallery();
    actionReorderHotelGallery();
  };

  useEffect(() => {
    if (!openAlbum) {
      listHotelTypes().then(data => {
        getHotelCategories(data?.hotels);
        getRoomHotelCategories(data?.rooms);
        setTypeRooms(data?.rooms);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAlbum]);
  return (
    <div style={{ margin: '32px 8px' }}>
      <UlColor
        style={{
          columnCount: 3,
          listStyleType: 'disc',
          marginBottom: 25,
          padding: '15px',
          paddingBottom: '0px',
        }}
      >
        <li color={GREY_600}>
          <Typography variant="caption">
            <FormattedMessage id="IDS_HMS_IMAGE_SIZE_MIN" />
          </Typography>
        </li>
        <li>
          <Typography variant="caption">
            <FormattedMessage id="IDS_HMS_IMAGE_SIZE_MAX" />
          </Typography>
        </li>
        <li>
          <Typography variant="caption">
            <FormattedMessage id="IDS_HMS_IMAGE_STORAGE_MIN" />
          </Typography>
        </li>
        <li>
          <Typography variant="caption">
            <FormattedMessage id="IDS_HMS_IMAGE_STORAGE_MAX" />
          </Typography>
        </li>
        <ImageSuggestionDialog />
      </UlColor>
      <Paper style={{ padding: '12px 0px', backgroundColor: GREY_100, boxShadow: 'unset' }}>
        <Typography variant="h6" style={{ marginBottom: 16 }}>
          <FormattedMessage id="IDS_HMS_hotelPhoto" />
        </Typography>
        {listTypePhotoHotel &&
          listTypePhotoHotel.map((v: any, index) => (
            <>
              {validateHotel[index] && (
                <Typography variant="subtitle2" style={{ color: RED }}>
                  <FormattedMessage id="required" />
                  &nbsp;{redMark}
                </Typography>
              )}
              <PhotoListPaper
                title={v?.name}
                listUrl={v?.items}
                isGallery
                key={`hotel-${index}`}
                deletePhotos={(idPhoto: any[]) => {
                  deleteHotelCategories(idPhoto);
                }}
                saveFunctions={() => {
                  setTypePhoto(v?.id);
                  setOpenAlbum(true);
                  setIsTypeRoom(false);
                  setType(match?.params?.hotelId);
                }}
                setTempListPhoto={setTempListTypePhotoHotel}
              />
            </>
          ))}
      </Paper>

      {!!listTypePhotoRoomsHotel?.length && (
        <>
          <Typography variant="h6" style={{ marginTop: 16 }}>
            <FormattedMessage id="IDS_HMS_hotelRoomsPhoto" />
          </Typography>
          {listTypePhotoRoomsHotel.map((v: any, index) => (
            <Paper style={{ paddingTop: 8 }} key={index}>
              <Button
                onClick={() => handleCollapse(index, isOpen[index])}
                style={{ justifyContent: 'space-between', width: '100%' }}
              >
                <Typography variant="subtitle1">{v?.name}</Typography>
                <ArrowIconCircle
                  style={{
                    transform: isOpen[index] ? 'rotate(180deg)' : undefined,
                    transition: '300ms linear all',
                  }}
                />
              </Button>
              <Collapse in={isOpen[index]}>
                <Paper>
                  {v.items.map((ele: any, idx: number) => (
                    <>
                      {validateRoom && validateRoom[index] && validateRoom[index][idx] && (
                        <Typography variant="subtitle2" style={{ color: RED }}>
                          <FormattedMessage id="required" />
                          &nbsp;{redMark}
                        </Typography>
                      )}
                      <PhotoListPaper
                        title={ele?.name}
                        listUrl={ele?.items}
                        key={`room-${idx}`}
                        isGallery
                        saveFunctions={() => {
                          setTypePhoto(ele.type);
                          setOpenAlbum(true);
                          setIsTypeRoom(true);
                          setType(v?.id);
                        }}
                        deletePhotos={(idPhoto: number[]) => {
                          deleteRoomPhotos(idPhoto, v?.id);
                        }}
                        setTempListPhoto={(listPhoto: string[]) => {
                          tempDataListPhoto = listTypePhotoRoomsHotel.map((element: any) => {
                            if (element.id === v?.id) {
                              element.items.map((el: any) => {
                                if (ele?.type === el.type) {
                                  el.items = listPhoto;
                                }
                                return el;
                              });
                            }
                            return element;
                          });
                        }}
                      />
                    </>
                  ))}
                </Paper>
              </Collapse>
            </Paper>
          ))}
        </>
      )}
      <Row style={{ marginTop: 32 }}>
        <LoadingButton
          style={{ minHeight: 40, marginRight: 24, minWidth: 150 }}
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            handleSummit();
          }}
        >
          <Typography variant="body2">
            <FormattedMessage id="IDS_HMS_SAVE" />
          </Typography>
        </LoadingButton>
        <Button
          style={{
            height: 40,
            minWidth: 150,
            background: GREY_100,
          }}
          variant="outlined"
          onClick={() => {}}
          disableElevation
        >
          <Typography
            gutterBottom
            variant="subtitle2"
            style={{
              marginTop: 5,
              textAlign: 'center',
              color: GREY_600,
            }}
          >
            <FormattedMessage id="IDS_HMS_REJECT" />
          </Typography>
        </Button>
      </Row>
      <Dialog
        fullScreen
        open={openAlbum}
        onClose={setOpenAlbum}
        PaperProps={{ style: { overflow: 'hidden', height: '100vh', background: 'unset' } }}
      >
        <Toolbar style={{ background: BLACK, opacity: 0.8, justifyContent: 'flex-end' }}>
          <IconButton edge="end" size="medium" onClick={() => setOpenAlbum(false)}>
            <IconClose className="svgFilAll" style={{ height: 40, width: 40, fill: WHITE }} />
          </IconButton>
        </Toolbar>
        <GeneralAlbum
          typePhoto={typePhoto}
          listRoomTypes={isTypeRoom ? typeRooms : listTypePhotoHotel}
          setTypePhoto={setTypePhoto}
          saveFunctions={(urlPhoto: any[]) => {
            actionGetHotelGalleryPost(urlPhoto);
          }}
        />
      </Dialog>
    </div>
  );
}

export default HotelGallery;
