import { Typography } from '@material-ui/core';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../common/components/elements';
import SingleSelect from '../../common/components/SingleSelect';
import { dataType, radiusValues, timeEvaluation } from '../utils';
import ChatRadioGroup from './ChartRadioGroup';
import { data } from './data';

const ChartDetail: React.FC = (props) => {
  const { values } = useFormikContext();

  console.log(values);

  return (
    <React.Fragment>
      <Row>
        <Typography variant="body2" style={{ marginBottom: 16 }}>
          <FormattedMessage id="dataChoosing"></FormattedMessage>
        </Typography>
      </Row>
      <Row>
        <ChatRadioGroup
          fieldName="dataType"
          dataList={dataType}
          leftLabel="data"
          leftLabelStyles={{ margin: '12px 20px 12px 16px' }}
        ></ChatRadioGroup>
      </Row>
      <Row>
        <ChatRadioGroup
          fieldName="radius"
          dataList={radiusValues}
          leftLabel="radius"
          leftLabelStyles={{ margin: '12px 10px 12px 16px' }}
          endor="km"
        ></ChatRadioGroup>
      </Row>
      <Row>
        <ChatRadioGroup
          fieldName="time"
          dataList={timeEvaluation}
          leftLabel="time"
          leftLabelStyles={{ margin: '12px 6px 12px 16px' }}
        ></ChatRadioGroup>
      </Row>
      <Row>
        <SingleSelect options={timeEvaluation} label="sadsf"></SingleSelect>
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
