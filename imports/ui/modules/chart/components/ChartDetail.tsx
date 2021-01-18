import { Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isEmpty } from 'voca';
import { Row } from '../../common/components/elements';
import { FieldSelectContent } from '../../common/components/FieldContent';
import {
  dataType,
  radiusLANDValues,
  radiusMODValues,
  radiusMYDValues,
  radiusVIRValues,
  stationList,
  timeEvaluation,
} from '../utils';
import DataChart from './DataChart';
import { some } from '/imports/ui/constants';

interface Props {}

const ChartDetail: React.FC<Props> = () => {
  const intl = useIntl();
  const { values, setFieldValue } = useFormikContext();
  const [body, setBody] = React.useState<some>([]);

  const getRadiusOption = (value?: string) => {
    if (value === 'MOD') return radiusMODValues;
    if (value === 'MYD') return radiusMYDValues;
    if (value === 'VIIRS') return radiusVIRValues;
    if (value === 'Landsat') return radiusLANDValues;
  };
  React.useEffect(() => {
    setBody({
      dataType: dataType.find((el: some) => el.id === (values as some).dataType)?.name,
      station: stationList.find((el: some) => el.id === (values as some).station)?.endor,
      radius: (values as some).radius,
      time: (values as some).time,
      timeEndor: timeEvaluation.find((el: some) => el?.id === (values as some)?.time)?.endor,
    });
  }, [values]);
  return (
    <>
      <Row>
        <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
          <FormattedMessage id="dataChoosing" />
        </Typography>
      </Row>
      <Row>
        <Typography
          style={{ margin: '12px 10px 12px 16px', whiteSpace: 'nowrap' }}
          variant="subtitle2"
          component="p"
        >
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
            if ((values as some).radius) {
              setFieldValue('radius', undefined);
            }
            if ((values as some).station) {
              setFieldValue('station', undefined);
            }
          }}
          placeholder={intl.formatMessage({ id: 'choose' })}
          disableError
        />
        <Typography
          style={{ margin: '8px 10px 8px 16px', whiteSpace: 'nowrap' }}
          variant="subtitle2"
          component="p"
        >
          <FormattedMessage id="radius" />
        </Typography>
        <FieldSelectContent
          name="radius"
          label={null}
          style={{
            width: 300,
            margin: '16px 10px 8px 40px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={
            !isEmpty((values as some).dataType)
              ? (getRadiusOption(
                  dataType?.find((el: some) => el?.id === (values as some)?.dataType)?.name,
                ) as any)
              : []
          }
          placeholder={intl.formatMessage({ id: 'choose' })}
          getOptionLabel={(value) => `${value.id} km`}
          onSelectOption={(value: number) => {
            setFieldValue('radius', value);
          }}
          disableError
          disabled={isEmpty((values as some).dataType)}
        />
      </Row>
      <Row>
        <Typography
          style={{ margin: '8px 10px 0px 16px', whiteSpace: 'nowrap' }}
          variant="subtitle2"
          component="p"
        >
          <FormattedMessage id="time" />
        </Typography>
        <FieldSelectContent
          name="time"
          label={null}
          style={{
            width: 300,
            margin: '16px 10px 0px 12px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={timeEvaluation as any[]}
          getOptionLabel={(value) => `${value.id} ${value.endor}`}
          onSelectOption={(value: number) => {
            setFieldValue('time', value);
          }}
          placeholder={intl.formatMessage({ id: 'choose' })}
          disableError
        />
        <Typography
          style={{ margin: '8px 10px 0px 12px', whiteSpace: 'nowrap' }}
          variant="subtitle2"
          component="p"
        >
          <FormattedMessage id="spaceStation" />
        </Typography>
        <FieldSelectContent
          name="station"
          label={null}
          style={{
            width: 300,
            margin: '16px 10px 0px 8px',
          }}
          formControlStyle={{
            minWidth: 300,
            width: 'auto',
          }}
          options={stationList}
          getOptionLabel={(value) => value.name}
          onSelectOption={(value: number) => {
            setFieldValue('station', value);
          }}
          placeholder={intl.formatMessage({ id: 'choose' })}
          disableError
          // disabled={(values as some).dataType === 4}
        />
      </Row>
      <DataChart body={body}></DataChart>
    </>
  );
};
export default ChartDetail;
