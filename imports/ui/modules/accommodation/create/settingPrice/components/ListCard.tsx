import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isEmpty } from '../../../utils';
import CardSetting from './CardSetting';
import './CreateHotel.scss';

interface Props {
  rooms: any[];
  removeRoom: (index: number) => void;
  copyRoom: () => void;
}

const ListCard: React.FC<Props> = props => {
  const { rooms, removeRoom, copyRoom } = props;

  const { setValues, values } = useFormikContext();
  const { photos } = useSelector((state: AppState) => state.accommodation, shallowEqual);
  const defaultItemsPhoto = photos?.rooms.map((element: any) => {
    Object.assign(element, { ...element, items: [] });
    return element;
  });

  const copy = (index: number) => {
    let temp = {
      ...(values as any),
      [`name_${rooms.length}`]: (values as any)[`name_${index}`],
      [`roomTypeId_${rooms.length}`]: (values as any)[`roomTypeId_${index}`],
      [`roomClassId_${rooms.length}`]: (values as any)[`roomClassId_${index}`],
      [`totalRoom_${rooms.length}`]: (values as any)[`totalRoom_${index}`],
      [`minArea_${rooms.length}`]: (values as any)[`minArea_${index}`],
      [`standardAdult_${rooms.length}`]: (values as any)[`standardAdult_${index}`],
      [`maxChildren_${rooms.length}`]: (values as any)[`maxChildren_${index}`],
      [`price_${rooms.length}`]: (values as any)[`price_${index}`],
      [`maxExtraBed_${rooms.length}`]: (values as any)[`maxExtraBed_${index}`],
      [`allowSmoking_${rooms.length}`]: (values as any)[`allowSmoking_${index}`] ? 'true' : 'false',
      [`hasBathroom_${rooms.length}`]: !!(values as any)[`hasBathroom_${index}`],
      [`hasChildren_${rooms.length}`]: !!(values as any)[`hasChildren_${index}`],
      [`roomViewIds_${rooms.length}`]: (values as any)[`roomViewIds_${index}`],
      [`roomFeatureIds_${rooms.length}`]: (values as any)[`roomFeatureIds_${index}`],
      [`photoRooms_${rooms.length}`]: JSON.parse(JSON.stringify(defaultItemsPhoto)),
    };
    const initBedNumber = Object.keys(values as any).filter(el =>
      el.includes(`roomBedTypes_${index}_${1}`),
    );
    if (!isEmpty(initBedNumber)) {
      initBedNumber.forEach((it: any, i: number) => {
        temp = {
          ...temp,
          [`roomBedTypes_${rooms.length}_${1}_${i}`]: (values as any)[it],
          [`roomBedTypesNumber_${rooms.length}_${1}_${i}`]: (values as any)[
            `roomBedTypesNumber_${index}_1_${it.split('_').pop()}`
          ],
        };
      });
    }
    const initBedInsteadNumber = Object.keys(values as any).filter(el =>
      el.includes(`roomBedTypes_${index}_${0}`),
    );
    if (!isEmpty(initBedInsteadNumber)) {
      initBedInsteadNumber.forEach((it: any, i: number) => {
        temp = {
          ...temp,
          [`roomBedTypes_${rooms.length}_${0}_${i}`]: (values as any)[it],
          [`roomBedTypesNumber_${rooms.length}_${0}_${i}`]: (values as any)[
            `roomBedTypesNumber_${index}_0_${it.split('_').pop()}`
          ],
        };
      });
    }
    setValues(temp);
    copyRoom();
  };
  const remove = (index: number) => {
    const temp = {
      ...(values as any),
      [`id_${index}`]: undefined,
      [`name_${index}`]: undefined,
      [`roomTypeId_${index}`]: undefined,
      [`roomClassId_${index}`]: undefined,
      [`totalRoom_${index}`]: undefined,
      [`minArea_${index}`]: undefined,
      [`standardAdult_${index}`]: undefined,
      [`maxChildren_${index}`]: undefined,
      [`price_${index}`]: undefined,
      [`maxExtraBed_${index}`]: undefined,
      [`allowSmoking_${index}`]: undefined,
      [`hasBathroom_${index}`]: undefined,
      [`hasChildren_${index}`]: undefined,
      [`roomViewIds_${index}`]: undefined,
      [`roomFeatureIds_${index}`]: undefined,
      [`photoRooms_${index}`]: undefined,
    };
    setValues(temp);
    removeRoom(index);
  };
  return (
    <>
      {rooms.map((element, idx: number) => (
        <Fragment key={idx}>
          {!element.isDelete && (
            <CardSetting
              key={`card_setting_${idx}`}
              index={idx}
              handleRemove={() => remove(idx)}
              copyRoom={() => copy(idx)}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
export default React.memo(ListCard);
