import { CircularProgress, Divider, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
import querystring from 'query-string';
import React from 'react';
import { useIntl } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { Col, Row } from '../../common/components/elements';
import { defaultGeoUrl, defaultTimeDimensionProperty } from '../../map/constant';
import ConcentrationNavigation from './listDayChart/ConcentrationNavigation';
import DashBoardTab from './oneDayChart/DashBoardTab';
import {
  appToken,
  convertTime,
  END_TIME,
  isEmpty,
  some,
  START_TIME,
  URL_CONFIG,
} from '/imports/ui/constants';
import { DATE_FORMAT_NEW } from '/imports/ui/models/moment';

export default function Concentration() {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);

  const intl = useIntl();

  const [result, setResult] = React.useState<some>({});
  const [data, setData] = React.useState<some>({});
  const [dataOneDay, setOneDayData] = React.useState<some>({});

  const fetchOneDayData = (lat: string, lon: string, start: any) => {
    const searchStr = querystring.stringify({
      lat: lat,
      lon: lon,
      appid: appToken,
      start: start,
      cnt: 24,
      type: 'hour',
    });

    fetch(`${URL_CONFIG}/data/2.5/history/city?${searchStr}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((dataR) => setOneDayData(dataR));
  };

  const fetchData = (lat: string, lon: string, start: any) => {
    const searchStr = querystring.stringify({
      lat: lat,
      lon: lon,
      appid: appToken,
      start: start,
      end: start + 604800,
      cnt: 1,
      type: 'hour',
    });

    fetch(`${URL_CONFIG}/data/2.5/history/city?${searchStr}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((dataR) => setData(dataR));
  };

  React.useEffect(() => {
    if (!isEmpty(addressP?.position)) {
      setResult({
        ...addressP,
        position: {
          lat: addressP.position[0],
          long: addressP.position[1],
        },
      });
      fetchData(
        addressP.position[0],
        addressP.position[1],
        new Date(
          moment(
            defaultGeoUrl.time[
              addressP.progress !== 0
                ? addressP.progress / defaultTimeDimensionProperty.step - 1
                : 0
            ],
          )
            .format(DATE_FORMAT_NEW)
            .replace(START_TIME, END_TIME),
        ).getTime() /
          1000 +
          convertTime,
      );
    }
  }, []);

  React.useEffect(() => {
    if (!isEmpty(addressP?.position)) {
      setResult({
        ...addressP,
        position: {
          lat: addressP.position[0],
          long: addressP.position[1],
        },
      });
      fetchOneDayData(
        addressP.position[0],
        addressP.position[1],
        new Date(
          moment(
            defaultGeoUrl.time[
              addressP.progress !== 0
                ? addressP.progress / defaultTimeDimensionProperty.step - 1
                : 0
            ],
          )
            .format(DATE_FORMAT_NEW)
            .replace(START_TIME, END_TIME),
        ).getTime() /
          1000 +
          convertTime,
      );
    }
  }, []);

  return (
    <Col>
      <Row style={{ display: 'flex', marginBottom: 5, marginTop: 20 }}>
        <LocationOnIcon />
        <Typography variant="h5" component="span" style={{ marginLeft: 4 }}>
          {addressP?.address}
        </Typography>
      </Row>
      <Typography variant="body2" style={{ marginLeft: 12, marginBottom: 5 }}>
        <span>
          {intl.formatMessage({ id: 'Tọa độ' })}:&nbsp;
          {!isEmpty(result?.position) ? result.position.lat.toFixed(5) : '-'} / &nbsp;
          {!isEmpty(result?.position) ? result.position.long.toFixed(5) : '-'}
        </span>
      </Typography>

      {data?.list ? (
        <>
          <Divider style={{ margin: 8, width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            {intl.formatMessage({ id: 'chartDay' })}&nbsp;
            {
              defaultGeoUrl.time[
                addressP.progress !== 0
                  ? addressP.progress / defaultTimeDimensionProperty.step - 1
                  : 0
              ]
            }
          </Typography>
          <DashBoardTab
            data={dataOneDay?.list?.filter((_el: some, idx: number) => idx % 3 === 1)}
          />

          <Divider style={{ margin: '12px 0px 8px', width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            {intl.formatMessage({ id: 'chartListDay' })}
          </Typography>
          <ConcentrationNavigation
            data={data?.list
              ?.filter((_el: some, idx: number) => idx % 10 === 0)
              .filter((_el: some, idx: number) => idx % 2 === 0 && idx > 0 && idx < 17)
              .map((elm: some, idx: number) => {
                return {
                  ...elm,
                  dtg: defaultGeoUrl.time[idx],
                };
              })}
          />
        </>
      ) : (
        <CircularProgress color="secondary" style={{ margin: '150px auto' }} />
      )}
    </Col>
  );
}
