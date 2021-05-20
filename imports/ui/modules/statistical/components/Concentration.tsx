import { CircularProgress, Divider, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
import querystring from 'query-string';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Col, Row } from '../../common/components/elements';
import TableCustom, { Column } from '../../common/components/TableCustom';
import { defaultGeoUrl, defaultTimeDimensionProperty } from '../../map/constant';
import ConcentrationNavigation from './ConcentrationNavigation';
import {
  appToken,
  convertTime,
  END_TIME,
  isEmpty,
  some,
  START_TIME,
  URL_CONFIG
} from '/imports/ui/constants';
import { DATE_FORMAT_NEW } from '/imports/ui/models/moment';

export default function Concentration() {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);

  const [result, setResult] = React.useState<some>({});
  const [data, setData] = React.useState<some>({});

  const columns = React.useMemo(() => {
    const temp: Column[] = [
      {
        title: 'Thời điểm (h)',
        variant: 'body2',
        style: { alignItems: 'center' },
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="caption">
              <span>{record?.dtg}</span>
            </Typography>
            {/* <Typography variant="caption">
              <span>{moment.unix(record?.dt).format(DATE_FORMAT)}</span>
            </Typography> */}
          </Col>
        ),
      },
      {
        title: 'Gió',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="caption">
              <span>Tốc độ: {(record?.wind?.speed * 3.6).toFixed(2)}&nbsp;km/h</span>
            </Typography>
            {/* <Typography variant="caption">
              <span>
                Hướng: {getDirection(record?.wind?.deg)}&nbsp;({record?.wind?.deg}°)
              </span>
            </Typography> */}
          </Col>
        ),
      },
      {
        title: 'Nhiệt độ',
        dataIndex: 'temp',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="caption">
              <span>Trung bình:&nbsp;{(record?.main?.temp - 273).toFixed(2)}&nbsp;°C</span>
            </Typography>
            <Typography variant="caption">
              <span>Tối thiểu:&nbsp;{(record?.main?.temp_min - 273).toFixed(2)}&nbsp;°C</span>
            </Typography>
            <Typography variant="caption">
              <span>Tối đa:&nbsp;{(record?.main?.temp_max - 273).toFixed(2)}&nbsp;°C</span>
            </Typography>
          </Col>
        ),
      },
      {
        title: 'Độ ẩm',
        dataIndex: 'humidity ',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col style={{ alignItems: 'center', marginRight: 20 }}>
            <Typography variant="caption">
              <span>{record?.main?.humidity}&nbsp;%</span>
            </Typography>
          </Col>
        ),
      },
      {
        title: 'Áp suất',
        dataIndex: 'email',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col style={{ alignItems: 'center', marginRight: 20 }}>
            <Typography variant="caption">
              <span>{record?.main?.pressure}&nbsp;hPa</span>
            </Typography>
          </Col>
        ),
      },
    ];
    return temp as Column[];
    // eslint-disable-next-line
  }, []);

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
          Vĩ độ:&nbsp;{!isEmpty(result?.position) ? result.position.lat : '-'} / Kinh độ:&nbsp;
          {!isEmpty(result?.position) ? result.position.long : '-'}
        </span>
      </Typography>
      <Typography variant="body2" style={{ marginLeft: 12, marginBottom: 10 }}>
        <span>
          Số liệu:&nbsp;Từ 03/12/2017 đến 11/12/2017
          {/* {
            defaultGeoUrl.time[
              addressP.progress !== 0
                ? addressP.progress / defaultTimeDimensionProperty.step - 1
                : 0
            ]
          } */}
        </span>
      </Typography>
      {data?.list ? (
        <>
          <Divider style={{ margin: 8, width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            Bảng thống kê số liệu khí tượng từ 03/12/2017 đến 11/12/2017
            {/* {
              defaultGeoUrl.time[
                addressP.progress !== 0
                  ? addressP.progress / defaultTimeDimensionProperty.step - 1
                  : 0
              ]
            } */}
          </Typography>
          <TableCustom
            style={{ borderRadius: 8, boxShadow: 'none', marginBottom: 5 }}
            dataSource={
              data?.list
                ?.filter((_el: some, idx: number) => idx % 10 === 0)
                .filter((_el: some, idx: number) => idx % 2 === 0 && idx > 0 && idx < 17)
                .map((elm: some, idx: number) => {
                  return {
                    ...elm,
                    dtg: defaultGeoUrl.time[idx],
                  };
                }) || []
            }
            columns={columns}
            noColumnIndex
            loading={false}
          />
          <Divider style={{ margin: '12px 0px 8px', width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            Biểu đồ đánh giá số liệu khí tượng từ 03/12/2017 đến 11/12/2017
            {/* {
              defaultGeoUrl.time[
                addressP.progress !== 0
                  ? addressP.progress / defaultTimeDimensionProperty.step - 1
                  : 0
              ]
            } */}
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
