import { Typography } from '@material-ui/core';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'voca';
import { Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import { dataType, radiusMODValues, radiusMYDValues, timeEvaluation } from '../utils';
import { data } from './data';
import { some } from '/imports/ui/constants';

const ChartDetail: React.FC = () => {
  const { values, setFieldValue } = useFormikContext();

  console.log(values);

  const getRadiusOption = (value?: string) => {
    if (value === 'MOD') return radiusMODValues;
    if (value === 'MYD') return radiusMYDValues;
  };

  return (
    <React.Fragment>
      <Row>
        <Typography variant="body2" style={{ marginBottom: 16 }}>
          <FormattedMessage id="dataChoosing"></FormattedMessage>
        </Typography>
      </Row>
      <Row>
        <Typography style={{ margin: '12px 10px 12px 16px' }} variant="subtitle2" component="p">
          <FormattedMessage id="data" />
        </Typography>
        <FieldSelectContent
          name="dataType"
          label={null}
          style={{
            width: 300,
            margin: '20px 10px 12px 25px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={dataType}
          getOptionLabel={(value) => value.name}
          onSelectOption={(value: number) => {
            setFieldValue('dataType', value);
          }}
          disableError
        />
      </Row>
      <Row>
        <Typography style={{ margin: '8px 10px 8px 16px' }} variant="subtitle2" component="p">
          <FormattedMessage id="radius" />
        </Typography>
        <FieldSelectContent
          name="radius"
          label={null}
          style={{
            width: 300,
            margin: '16px 10px 8px 16px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={
            !isEmpty((values as some).dataType)
              ? getRadiusOption(
                  dataType?.find((el: some) => el?.id === (values as some)?.dataType)?.name,
                )
              : []
          }
          getOptionLabel={(value) => value.id + ' km'}
          onSelectOption={(value: number) => {
            setFieldValue('radius', value);
          }}
          disableError
          disabled={isEmpty((values as some).dataType)}
        />
      </Row>
      <Row>
        <Typography style={{ margin: '8px 10px 12px 16px' }} variant="subtitle2" component="p">
          <FormattedMessage id="time" />
        </Typography>
        <FieldSelectContent
          name="time"
          label={null}
          style={{
            width: 300,
            margin: '16px 10px 12px 12px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={timeEvaluation}
          getOptionLabel={(value) => value.id + ' ' + value.endor}
          onSelectOption={(value: number) => {
            setFieldValue('time', value);
          }}
          disableError
        />
      </Row>
      <Row style={{ height: 500 }}>
        <ResponsiveScatterPlot
          data={data}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 0, max: 'auto' }}
          xFormat={function (e) {
            return e + ' kg';
          }}
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          yFormat={function (e) {
            return e + ' cm';
          }}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'obs',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'sat',
            legendPosition: 'middle',
            legendOffset: -60,
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              itemDirection: 'left-to-right',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Row>
    </React.Fragment>
  );
};
export default ChartDetail;
