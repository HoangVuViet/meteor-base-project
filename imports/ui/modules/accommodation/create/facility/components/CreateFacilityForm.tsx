import { Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SECONDARY } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { ReactComponent as BookMarkIcon } from '../../../../../svg/ic_bookMark.svg';
import { Col, Row } from '../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../common/components/Form';
import { FieldTextContent } from '../../../common/FieldContent';
import { BOOK_MARK_ARR, checkExist, FEE_ARR } from '../utils';
import CardFacility from './CardFacility';

interface Props {
  data?: some;
  amenityData: some[];
  values: some;
  setAmenityData: (value: some[]) => void;
}

const CreateFacilityForm: React.FC<Props> = props => {
  const { data, amenityData, setAmenityData, values } = props;

  const [columnLeft, setColumnLeft] = React.useState<some[]>([]);
  const [columnRight, setColumnRight] = React.useState<some[]>([]);
  const intl = useIntl();
  const { setFieldValue } = useFormikContext();

  const handleChange = (checkBoxData: some, value: boolean) => {
    let temp = [...amenityData];
    if (value) temp.push(checkBoxData);
    else temp = temp.filter(item => item.id !== checkBoxData.id);
    setAmenityData(temp);
  };

  const checkOpen = React.useCallback(
    (arr: Array<some>) => {
      if (amenityData.length === 0) return false;
      return !!arr.find((amenity: some, idx: number) => {
        return amenityData.find(el => el.id === amenity?.id);
      });
    },
    [amenityData],
  );
  React.useEffect(() => {
    if (data?.items) {
      const halfLength = Math.ceil(data.items.length / 2);
      setColumnLeft(data.items.slice(0, halfLength));
      setColumnRight(data.items.slice(halfLength));
    }
  }, [data]);
  React.useEffect(() => {
    amenityData?.forEach((el: some, index: number) => {
      if (checkExist(FEE_ARR, el?.id)) {
        setFieldValue(`isFree_${el?.id}`, el?.pricePerHour ? 'true' : 'false');
        setFieldValue(`pricePerHour_${el?.id}`, el?.pricePerHour);
      }
    });
    // eslint-disable-next-line
  }, [amenityData]);

  return (
    <Col>
      <Row style={{ marginBottom: 20 }}>
        <BookMarkIcon />
        <Typography variant="body2" style={{ padding: 8 }}>
          <FormattedMessage id="IDS_HMS_HOTEL_FACILITY_CUSTOMERS" />
        </Typography>
      </Row>
      <Row style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '80%' }}>
        <Col style={{ paddingRight: 40, flex: 1 }}>
          {columnLeft?.map((item: some, index: number) => (
            <Row style={{ marginBottom: 20 }} key={index}>
              <CardFacility
                titleLabel={item?.name}
                iconUrl={item?.imageUrl}
                checkOpen={checkOpen(item?.amenities)}
              >
                <Grid container spacing={2} wrap="wrap" style={{ paddingLeft: 16 }}>
                  {item?.amenities?.map((amenity: some, idx: number) => (
                    <Grid item xs={6} key={idx} style={{ padding: 0 }}>
                      <Col>
                        <Row>
                          <FormControlLabel
                            style={{ margin: 0, padding: 0 }}
                            control={
                              <Checkbox
                                color="primary"
                                checked={!!amenityData.find((el: some) => el.id === amenity?.id)}
                                onChange={(e: some) => {
                                  handleChange(
                                    { name: amenity?.name, id: amenity?.id },
                                    e.target.checked,
                                  );
                                }}
                              />
                            }
                            label={<Typography variant="body2">{amenity?.name}</Typography>}
                          />
                          {checkExist(BOOK_MARK_ARR, amenity?.id) && (
                            <BookMarkIcon style={{ padding: 4 }} />
                          )}
                        </Row>
                        <Col style={{ padding: '4px 12px' }}>
                          {checkExist(FEE_ARR, amenity?.id) &&
                            !!amenityData.find((el: some) => el.id === amenity?.id) && (
                              <Field
                                name={`isFree_${amenity?.id}`}
                                as={(propsField: any) => (
                                  <RadioGroup
                                    {...propsField}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      flexWrap: 'nowrap',
                                    }}
                                  >
                                    <FormControlLabel
                                      value="false"
                                      style={{ marginRight: 16 }}
                                      control={<Radio style={{ color: SECONDARY }} size="small" />}
                                      label={intl.formatMessage({ id: 'IDS_HMS_FREE' })}
                                      onClick={e => {
                                        setAmenityData(
                                          amenityData.map((el: some) => {
                                            return el.id === amenity?.id
                                              ? { ...el, pricePerHour: null }
                                              : el;
                                          }),
                                        );
                                      }}
                                    />
                                    <FormControlLabel
                                      value="true"
                                      control={<Radio style={{ color: SECONDARY }} size="small" />}
                                      label={intl.formatMessage({ id: 'IDS_HMS_PAID' })}
                                    />
                                  </RadioGroup>
                                )}
                              />
                            )}
                          <Row>
                            {values[`isFree_${amenity?.id}`] === 'true' &&
                              !!amenityData.find((el: some) => el.id === amenity?.id) && (
                                <FieldTextContent
                                  name={`pricePerHour_${amenity?.id}`}
                                  style={{ width: 180 }}
                                  formControlStyle={{ minWidth: 180 }}
                                  inputComponent={NumberFormatCustom as any}
                                  inputProps={{ maxLength: 12 }}
                                  placeholder={intl.formatMessage({
                                    id: 'IDS_HMS_AMOUNT_OF_MONEY',
                                  })}
                                  onChange={e => {
                                    setFieldValue(`pricePerHour_${amenity?.id}`, e.target.value);
                                    setAmenityData(
                                      amenityData.map((el: some) => {
                                        return el.id === amenity?.id
                                          ? { ...el, pricePerHour: e.target.value }
                                          : el;
                                      }),
                                    );
                                  }}
                                  endAdornment={
                                    <span className="end-adornment">
                                      {intl.formatMessage({ id: 'IDS_HMS_MONEY_UNIT' })}
                                    </span>
                                  }
                                />
                              )}
                          </Row>
                        </Col>
                      </Col>
                    </Grid>
                  ))}
                </Grid>
              </CardFacility>
            </Row>
          ))}
        </Col>
        <Col style={{ flex: 1 }}>
          {columnRight?.map((item: some, index: number) => (
            <Row style={{ marginBottom: 20 }} key={index}>
              <CardFacility
                titleLabel={item?.name}
                iconUrl={item?.imageUrl}
                checkOpen={checkOpen(item?.amenities)}
              >
                <Grid container spacing={2} wrap="wrap" style={{ paddingLeft: 16 }}>
                  {item?.amenities?.map((amenity: some, idx: number) => (
                    <Grid item xs={6} key={idx} style={{ padding: 0 }}>
                      <Col>
                        <Row>
                          <FormControlLabel
                            style={{ margin: 0 }}
                            control={
                              <Checkbox
                                color="primary"
                                checked={!!amenityData.find((el: some) => el.id === amenity?.id)}
                                onChange={(e: some) => {
                                  handleChange(
                                    { name: amenity?.name, id: amenity?.id },
                                    e.target.checked,
                                  );
                                }}
                              />
                            }
                            label={<Typography variant="body2">{amenity?.name}</Typography>}
                          />
                          {checkExist(BOOK_MARK_ARR, amenity?.id) && (
                            <BookMarkIcon style={{ padding: 4 }} />
                          )}
                        </Row>
                        <Col style={{ padding: '4px 12px' }}>
                          {checkExist(FEE_ARR, amenity?.id) &&
                            !!amenityData.find((el: some) => el.id === amenity?.id) && (
                              <Field
                                name={`isFree_${amenity?.id}`}
                                as={(propsField: any) => (
                                  <RadioGroup
                                    {...propsField}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      flexWrap: 'nowrap',
                                    }}
                                  >
                                    <FormControlLabel
                                      value="false"
                                      style={{ marginRight: 16 }}
                                      control={<Radio style={{ color: SECONDARY }} size="small" />}
                                      label={intl.formatMessage({ id: 'IDS_HMS_FREE' })}
                                    />
                                    <FormControlLabel
                                      value="true"
                                      control={<Radio style={{ color: SECONDARY }} size="small" />}
                                      label={intl.formatMessage({ id: 'IDS_HMS_PAID' })}
                                    />
                                  </RadioGroup>
                                )}
                              />
                            )}
                          <Row>
                            {values[`isFree_${amenity?.id}`] === 'true' &&
                              !!amenityData.find((el: some) => el.id === amenity?.id) && (
                                <FieldTextContent
                                  name={`pricePerHour_${amenity?.id}`}
                                  style={{ width: 180 }}
                                  formControlStyle={{ minWidth: 180 }}
                                  inputComponent={NumberFormatCustom as any}
                                  inputProps={{ maxLength: 12 }}
                                  placeholder={intl.formatMessage({
                                    id: 'IDS_HMS_AMOUNT_OF_MONEY',
                                  })}
                                  onChange={e => {
                                    setFieldValue(`pricePerHour_${amenity?.id}`, e.target.value);
                                    setAmenityData(
                                      amenityData.map((el: some) => {
                                        return el.id === amenity?.id
                                          ? { ...el, pricePerHour: e.target.value }
                                          : el;
                                      }),
                                    );
                                  }}
                                  endAdornment={
                                    <span className="end-adornment">
                                      {intl.formatMessage({ id: 'IDS_HMS_MONEY_UNIT' })}
                                    </span>
                                  }
                                />
                              )}
                          </Row>
                        </Col>
                      </Col>
                    </Grid>
                  ))}
                </Grid>
              </CardFacility>
            </Row>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

export default CreateFacilityForm;
