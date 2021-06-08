import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useFormikContext } from 'formik';
import L from 'leaflet';
import 'leaflet-geotiff';
import 'leaflet-geotiff/leaflet-geotiff-plotty';
import 'leaflet-geotiff/leaflet-geotiff-vector-arrows';
import moment from 'moment';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Map, ZoomControl } from 'react-leaflet';
import { Col } from '../../../../common/components/elements';
import { FieldSelectContent, FieldTextContent } from '../../../../common/components/FieldContent';
import {
  defaultGeoUrl,
  defaultMapProperty,
  defaultWindSpeedProperty,
} from '../../../../map/constant';
import { filterList } from '../../../utils';

import { isEmpty } from '/imports/ui/constants';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '/imports/ui/models/moment';

const AddDataDialog = (props) => {
  const { rowData, values } = props;
  const { setFieldValue, setValues } = useFormikContext();
  const intl = useIntl();
  const mapRef = React.useRef(null);

  const [fileAmount, setFileAmount] = React.useState();

  const handleUploadFile = async (e) => {
    setFileAmount(Object.values(e.target.files)?.map((el) => el?.name));
  };

  React.useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if (!map) return;
    const renderer = L.LeafletGeotiff.plotty(defaultWindSpeedProperty.options);
    const options = {
      rBand: 0,
      gBand: 1,
      bBand: 2,
      alphaBand: 0,
      transpValue: 0,
      renderer: renderer,
    };
    if (fileAmount) {
      var windSpeed = new L.leafletGeotiff(
        defaultGeoUrl.url[Math.floor(Math.random() * defaultGeoUrl.url.length)],
        options,
      ).addTo(map);
    }
  }, [fileAmount]);
  return (
    <Col style={{ width: 800, padding: '16px 12px' }}>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Tên dữ liệu" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <FieldTextContent
            name="dataName"
            formControlStyle={{ width: 400 }}
            inputProps={{ autoComplete: 'off' }}
            placeholder={intl.formatMessage({ id: 'Nhập' })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Loại dữ liệu" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <FieldSelectContent
            name="dataType"
            label={null}
            style={{
              width: 400,
            }}
            formControlStyle={{
              minWidth: 400,
            }}
            options={filterList}
            getOptionLabel={(value) => value.name}
            onSelectOption={(value) => {
              setFieldValue('dataType', value);
            }}
            placeholder={intl.formatMessage({ id: 'choose' })}
            disableError
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Ngày thu nhận dữ liệu" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              onChange={(date) => {
                setFieldValue('collectedDate', moment(date, DATE_TIME_FORMAT).format(DATE_FORMAT));
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="chooseFile" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            style={{ width: 150, whiteSpace: 'nowrap' }}
            onClick={() => {
              document.getElementById(`add_upload_file`)?.click();
            }}
          >
            <input
              type="file"
              style={{ display: 'none' }}
              id={`add_upload_file`}
              accept="tiff/tif/hdc"
              onChange={handleUploadFile}
            />
            <FormattedMessage id="chooseFile" />
          </Button>
          {!isEmpty(fileAmount) && (
            <Paper
              variant="outlined"
              style={{
                padding: '8px 16px 16px',
                borderRadius: 12,
                background: '#f5f5f5',
                boxShadow: 'none',
                width: 400,
                marginTop: 10,
              }}
            >
              <Typography style={{ marginTop: 10 }} variant="body2" component="p">
                {fileAmount}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography variant="body2" component="p">
            <FormattedMessage id="Xem trước" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <div style={{ width: 500, height: 450 }}>
            <Map
              ref={mapRef}
              center={[16.594081412718474, 106.06201171875001]}
              zoom={6}
              scrollWheelZoom={true}
              zoomControl={defaultMapProperty.zoomControl}
              maxZoom={7}
              minZoom={5}
              style={defaultMapProperty.style}
              attributionControl={false}
            >
              {/* <TileLayer url={hereTileUrl('reduced.day')} /> */}
              <ZoomControl position="topleft" />
            </Map>
          </div>
        </Grid>
      </Grid>
    </Col>
  );
};

export default AddDataDialog;
