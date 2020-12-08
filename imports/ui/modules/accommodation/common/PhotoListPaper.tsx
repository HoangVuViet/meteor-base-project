import { Button, Checkbox, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GREY_600, SECONDARY } from '../../../configs/colors';
import ConfirmDialogSimple from '../../common/components/ConfirmDialogSimple';
import DndPhotos from '../../common/components/DndPhotos';
import { Row } from '../../common/components/elements';
import { redMark } from '../../common/components/Form';
import LoadingButton from '../../common/components/LoadingButton';

export function PhotoListPaper(props: {
  title: string;
  listUrl: string[];
  isGallery: boolean;
  saveFunctions(): void;
  deletePhotos(data: Array<number>, type?: number): void;
  setTempListPhoto(list: any): void;
  isRoom?: boolean | undefined;
}) {
  const {
    title,
    listUrl,
    saveFunctions,
    deletePhotos,
    setTempListPhoto,
    isGallery,
    isRoom,
  } = props;

  const [idPhoto, setIdPhoto] = React.useState<number[]>([]);
  const [isChecked, setIsChecked] = React.useState<number[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

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

  const handleCheckAll = (stt: boolean) => {
    if (stt) {
      listUrl.forEach((v: any, index: number) => {
        idPhoto[index] = v?.id;
        setIdPhoto([...idPhoto]);
        isChecked[index] = index;
        setIsChecked([...isChecked]);
      });
    } else {
      setIdPhoto([]);
      setIsChecked([]);
    }
  };
  const boxStyle = isRoom ? { boxShadow: 'none', padding: '0 8px' } : { padding: '8px 24px' };

  return (
    <Paper style={{ ...boxStyle, marginBottom: 8 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" style={{ padding: '10px 0' }}>
          {title}
          &nbsp;{redMark}
        </Typography>

        <div style={{ paddingBottom: 12 }}>
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
          {!!listUrl.length && !isRoom && (
            <Checkbox
              checked={listUrl.length === idPhoto.filter(item => item).length}
              indeterminate={
                !!idPhoto.filter(item => item).length &&
                listUrl.length !== idPhoto.filter(item => item).length
              }
              style={{
                color:
                  listUrl.length === idPhoto.filter(item => item).length ? SECONDARY : GREY_600,
              }}
              onChange={event => {
                handleCheckAll(event.target.checked);
              }}
            />
          )}
        </div>
      </Row>
      <Paper
        style={{
          padding: isGallery ? 16 : '0 16px 16px 0',
          marginBottom: isGallery ? 16 : 0,
          maxHeight: 420,
          overflow: 'auto',
          boxShadow: isGallery ? undefined : 'none',
        }}
      >
        <Grid container spacing={2}>
          {listUrl && (
            <DndPhotos
              listUrl={listUrl}
              isChecked={isChecked}
              handleChange={(index: number, id: number) => {
                handleToggle(index);
                handleChange(id);
              }}
              setTempListPhoto={setTempListPhoto}
              saveFunctions={saveFunctions}
            />
          )}
        </Grid>
      </Paper>
      <ConfirmDialogSimple
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAccept={() => {
          deletePhotos(idPhoto.filter(item => item));
          setIdPhoto([]);
          setIsChecked([]);
          setOpenDialog(false);
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
    </Paper>
  );
}

export default PhotoListPaper;
