import { CircularProgress, Divider, IconButton, Typography } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridToolbarContainer,
  GridToolbarExport,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
import querystring from 'query-string';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import BootstrapTooltip from '../../common/components/BootstrapTooltip';
import { Col, Row } from '../../common/components/elements';
import { defaultGeoUrl, defaultTimeDimensionProperty } from '../../map/constant';
import { getDirection } from '../utils';
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
interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (_props) => {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);

  const [data, setData] = React.useState<some>({});
  const [dataList, setListData] = React.useState<some>({});
  const [result, setResult] = React.useState<some>({});

  const intl = useIntl();

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const fetchListData = (lat: string, lon: string, start: any) => {
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
      .then((dataR) => setListData(dataR));
  };

  const fetchData = (lat: string, lon: string, start: any) => {
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
      .then((dataR) => setData(dataR));
  };

  const listDayColumns: GridColDef[] = React.useMemo(() => {
    return [
      {
        field: 'id',
        headerName: 'Thời điểm',
        width: 130,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        valueGetter: (params: GridValueGetterParams) => {
          return params?.row?.dtg;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          console.log(params?.row);

          return (
            <Col style={{ alignItems: 'center', marginLeft: 30 }}>
              <Typography variant="caption">
                <span>{params?.row?.dtg}</span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'winds',
        headerName: 'Gió',
        width: 160,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${(params.row.wind.speed * 3.6).toFixed(2)} km/h`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${(params.row.wind.speed * 3.6).toFixed(2)} km/h`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'speed' })}: {(params.row.wind.speed * 3.6).toFixed(2)}
                  &nbsp;km/h
                </span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'temp',
        headerName: 'Nhiệt độ',
        width: 150,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${(params.row?.main?.temp - 273).toFixed(2)} C`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${(params.row?.main?.temp - 273).toFixed(2)} C`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'speed' })}:&nbsp;
                  {(params?.row?.main?.temp - 273).toFixed(2)}
                  &nbsp;°C
                </span>
              </Typography>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'min' })}:&nbsp;
                  {(params?.row?.main?.temp_min - 273).toFixed(2)}&nbsp;°C
                </span>
              </Typography>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'max' })}:&nbsp;
                  {(params?.row?.main?.temp_max - 273).toFixed(2)}&nbsp;°C
                </span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'ids',
        headerName: 'Độ ẩm',
        width: 100,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.main.humidity;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${params.row.main.humidity} %`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col style={{ alignItems: 'center', marginRight: 20 }}>
              <Typography variant="caption">
                <span>{params.row.main.humidity}&nbsp;%</span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'pressure',
        headerName: 'Áp suất',
        width: 180,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row?.main?.pressure} hPa`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${params.row?.main?.pressure} hPa`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col style={{ alignItems: 'center', marginRight: 20 }}>
              <Typography variant="caption">
                <span>{params.row?.main?.pressure}&nbsp;hPa</span>
              </Typography>
            </Col>
          );
        },
      },
    ];
  }, []);

  const columns: GridColDef[] = React.useMemo(() => {
    return [
      {
        field: 'id',
        headerName: 'Thời điểm',
        width: 130,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        valueGetter: (params: GridValueGetterParams) => {
          return `${Number(params?.row?.id) * 3 + 1} h`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col style={{ alignItems: 'center', marginLeft: 30 }}>
              <Typography variant="caption">
                <span>{params.row.id * 3 + 1} h</span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'wind',
        headerName: 'Gió',
        width: 160,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${(params.row.wind.speed * 3.6).toFixed(2)} km/h`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${(params.row.wind.speed * 3.6).toFixed(2)} km/h`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'speed' })}: {(params.row.wind.speed * 3.6).toFixed(2)}
                  &nbsp;km/h
                </span>
              </Typography>
              <Typography variant="caption">
                <span>
                  {intl.formatMessage({ id: 'deg' })}: {getDirection(params.row.wind.deg)}&nbsp;(
                  {params.row.wind.deg}°)
                </span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'temp',
        headerName: 'Nhiệt độ',
        width: 120,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${(params.row?.main?.temp - 273).toFixed(2)} C`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${(params.row?.main?.temp - 273).toFixed(2)} C`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Row>
              <Typography variant="caption">
                <span>{(params.row?.main?.temp - 273).toFixed(2)}&nbsp;°C</span>
              </Typography>
              <BootstrapTooltip
                title={
                  <Typography variant="body2" style={{ padding: '12px 12px' }}>
                    <FormattedMessage id="Cảm nhận thực tế:" />
                    &nbsp;
                    <span>{(params.row?.main?.feels_like - 273).toFixed(2)}&nbsp;°C</span>
                  </Typography>
                }
                placement="top"
              >
                <IconButton style={{ padding: 4, marginLeft: 4 }}>
                  <ErrorOutlineIcon style={{ padding: 1, color: '#1976d2' }} />
                </IconButton>
              </BootstrapTooltip>
            </Row>
          );
        },
      },
      {
        field: 'ids',
        headerName: 'Độ ẩm',
        width: 100,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.main.humidity;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${params.row.main.humidity} %`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col style={{ alignItems: 'center', marginRight: 20 }}>
              <Typography variant="caption">
                <span>{params.row.main.humidity}&nbsp;%</span>
              </Typography>
            </Col>
          );
        },
      },
      {
        field: 'pressure',
        headerName: 'Áp suất',
        width: 180,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row?.main?.pressure} hPa`;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${params.row?.main?.pressure} hPa`;
        },
        renderCell: (params: GridValueGetterParams | some) => {
          return (
            <Col style={{ alignItems: 'center', marginRight: 20 }}>
              <Typography variant="caption">
                <span>{params.row?.main?.pressure}&nbsp;hPa</span>
              </Typography>
            </Col>
          );
        },
      },
    ];
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
      fetchListData(
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
  console.log(
    'dataList',
    dataList?.list
      ?.filter((_el: some, idx: number) => idx % 10 === 0)
      .filter((_el: some, idx: number) => idx % 2 === 0 && idx > 0 && idx < 17)
      .map((elm: some, idx: number) => {
        return {
          ...elm,
          dtg: defaultGeoUrl.time[idx],
          id: idx,
        };
      }),
  );
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
          {intl.formatMessage({ id: 'lat' })}:&nbsp;
          {!isEmpty(result?.position) ? result.position.lat : '-'} /{' '}
          {intl.formatMessage({ id: 'lon' })}:&nbsp;
          {!isEmpty(result?.position) ? result.position.long : '-'}
        </span>
      </Typography>
      <Typography variant="body2" style={{ marginLeft: 12, marginBottom: 10 }}>
        <span>
          {intl.formatMessage({ id: 'dataDay' })}:&nbsp;
          {
            defaultGeoUrl.time[
              addressP.progress !== 0
                ? addressP.progress / defaultTimeDimensionProperty.step - 1
                : 0
            ]
          }
        </span>
      </Typography>
      {data?.list ? (
        <>
          <Divider style={{ margin: 8, width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            {intl.formatMessage({ id: 'tableDay' })}&nbsp;
            {
              defaultGeoUrl.time[
                addressP.progress !== 0
                  ? addressP.progress / defaultTimeDimensionProperty.step - 1
                  : 0
              ]
            }
          </Typography>
          <div style={{ height: 595 }}>
            <DataGrid
              rows={
                data?.list
                  ?.filter((_el: some, idx: number) => idx % 3 === 1)
                  .map((elm: some, idx: number) => {
                    return { ...elm, id: idx };
                  }) as GridRowData[]
              }
              columns={columns}
              pageSize={8}
              hideFooter={true}
              rowHeight={63}
              disableSelectionOnClick
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
          <Divider style={{ margin: '12px 0px 8px', width: '100%', height: 2 }} />
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            {intl.formatMessage({ id: 'tableListDay' })}
          </Typography>

          <div style={{ height: 595 }}>
            <DataGrid
              rows={
                (dataList?.list
                  ?.filter((_el: some, idx: number) => idx % 10 === 0)
                  .filter((_el: some, idx: number) => idx % 2 === 0 && idx > 0 && idx < 17)
                  .map((elm: some, idx: number) => {
                    return {
                      ...elm,
                      dtg: defaultGeoUrl.time[idx],
                      id: idx,
                    };
                  }) || []) as GridRowData[]
              }
              columns={listDayColumns}
              pageSize={8}
              hideFooter={true}
              rowHeight={63}
              disableSelectionOnClick
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </>
      ) : (
        <CircularProgress color="secondary" style={{ margin: '150px auto' }} />
      )}
    </Col>
  );
};

export default Dashboard;
