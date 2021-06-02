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
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import BootstrapTooltip from '../../common/components/BootstrapTooltip';
import { Col, Row } from '../../common/components/elements';
import { defaultGeoUrl, defaultTimeDimensionProperty } from '../../map/constant';
import { getDirection } from '../utils';
import DashBoardTab from './DashBoardTab';
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
  const [result, setResult] = React.useState<some>({});
  console.log(data);
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
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

  const columns: GridColDef[] = React.useMemo(() => {
    return [
      {
        field: 'id',
        headerName: 'Thời điểm (h)',
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
                <span>Tốc độ: {(params.row.wind.speed * 3.6).toFixed(2)}&nbsp;km/h</span>
              </Typography>
              <Typography variant="caption">
                <span>
                  Hướng: {getDirection(params.row.wind.deg)}&nbsp;(
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
  console.log(
    data?.list
      ?.filter((_el: some, idx: number) => idx % 3 === 1)
      .map((elm: some, idx: number) => {
        return { ...elm, id: idx };
      }) as GridRowData[],
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
          Vĩ độ:&nbsp;{!isEmpty(result?.position) ? result.position.lat : '-'} / Kinh độ:&nbsp;
          {!isEmpty(result?.position) ? result.position.long : '-'}
        </span>
      </Typography>
      <Typography variant="body2" style={{ marginLeft: 12, marginBottom: 10 }}>
        <span>
          Số liệu ngày:&nbsp;
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
            Bảng thống kê số liệu khí tượng ngày&nbsp;
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
              // checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
          <Divider style={{ margin: '12px 0px 8px', width: '100%', height: 2 }}></Divider>
          <Typography variant="subtitle1" style={{ margin: '10px auto 5px' }}>
            Biểu đồ đánh giá số liệu khí tượng ngày&nbsp;
            {
              defaultGeoUrl.time[
                addressP.progress !== 0
                  ? addressP.progress / defaultTimeDimensionProperty.step - 1
                  : 0
              ]
            }
          </Typography>
          <DashBoardTab data={data?.list?.filter((_el: some, idx: number) => idx % 3 === 1)} />
        </>
      ) : (
        <CircularProgress color="secondary" style={{ margin: '150px auto' }} />
      )}
    </Col>
  );
};

export default Dashboard;
