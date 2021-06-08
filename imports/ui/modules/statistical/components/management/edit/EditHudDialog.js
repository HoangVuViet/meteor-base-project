import { Grid, Typography } from '@material-ui/core';
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

import { GREY_500 } from '/imports/ui/configs/colors';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '/imports/ui/models/moment';

// interface IEditHudDialogProps {
//   rowData: some;
//   values: some;
// }

const EditHudDialog = (props) => {
  const { rowData, values } = props;
  const { setFieldValue, setValues } = useFormikContext();
  const intl = useIntl();
  const mapRef = React.useRef(null);

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
    var windSpeed = new L.leafletGeotiff(
      defaultGeoUrl.url[Math.floor(Math.random() * defaultGeoUrl.url.length)],
      options,
    ).addTo(map);
  }, []);

  React.useEffect(
    () => {
      const temp = {
        createdAt: moment(rowData?.created || rowData?.createAt, DATE_TIME_FORMAT).format(
          DATE_FORMAT,
        ),
        dataName: rowData?.bookingCode || rowData?.dataName,
        dataType: rowData?.dataType,
        collectedDate: rowData?.collectedDate,
        imageP: 'geotiff',
      };
      setValues(temp);
    },
    // eslint-disable-next-line
    [],
  );
  return (
    <Col style={{ width: 1000, padding: '16px 12px' }}>
      <Grid container spacing={1} style={{ marginBottom: 20 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Ngày thêm mới dữ liệu" />
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
            name="createdAt"
            placeholder={intl.formatMessage({
              id: 'searchPlaceholder',
            })}
            formControlStyle={{ width: 400 }}
            style={{ background: GREY_500 }}
            inputProps={{ autoComplete: 'off' }}
            disabled
          />
        </Grid>
      </Grid>
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
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 20 }}>
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
          <FieldTextContent
            name="collectedDate"
            placeholder={intl.formatMessage({
              id: 'searchPlaceholder',
            })}
            formControlStyle={{ width: 400 }}
            style={{ background: GREY_500 }}
            inputProps={{ autoComplete: 'off' }}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Định dạng file ảnh" />
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
            name="imageP"
            formControlStyle={{ width: 400 }}
            inputProps={{ autoComplete: 'off' }}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 12 }}>
        <Grid item xs={3}>
          <Typography style={{ marginTop: 10 }} variant="body2" component="p">
            <FormattedMessage id="Ảnh dữ liệu" />
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

export default EditHudDialog;
