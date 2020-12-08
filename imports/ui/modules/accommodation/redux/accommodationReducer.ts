import { Moment } from 'moment';
import { some } from '../../../constants';
import * as actions from '../constant';

interface RangeTimeProps {
  startDate?: Moment | undefined;
  endDate?: Moment | undefined;
}
interface InfoSelectedProps {
  rateTypes?: some;
  room?: some;
  ratePlans?: some;
  availability?: some;
  roomNumber?: some;
} 
export interface AccommodationState {
  readonly roomTypes?: some;
  readonly roomClass?: some;
  readonly roomView?: some;
  readonly bedTypes?: some;
  readonly photos?: some;
  readonly rateTypes?: some;
  readonly roomList?: some;
  readonly features?: some;
  readonly featuresType?: some;
  readonly dragInfo?: string;
  readonly isCalendar?: boolean;
  readonly generalHotelInfo?: some;
  readonly rangeTime?: RangeTimeProps;
  readonly roomAllotment?: some;
  readonly roomRateList?: some;
  readonly infoSelected?: InfoSelectedProps;
  readonly dayWeek: number[];
}

export const DEFAULT_ACCOUNT_STATE = {
  dayWeek: [0, 1, 2, 3, 4, 5, 6]
};

export const setRoomType = (data: some) => ({ type: actions.FETCH_ROOM_TYPES, payload: data });
export const setRoomClass = (data: some) => ({ type: actions.FETCH_ROOM_CLASS, payload: data });
export const setRoomView = (data: some) => ({ type: actions.FETCH_ROOM_VIEW, payload: data });
export const setBedType = (data: some) => ({ type: actions.FETCH_BED_TYPES, payload: data });
export const setInfoPhoto = (data: some) => ({ type: actions.FETCH_INFO_PHOTO, payload: data });
export const setRateType = (data: some) => ({ type: actions.FETCH_RATE_TYPE, payload: data });
export const setRoomList = (data: some) => ({ type: actions.FETCH_ROOM_LIST, payload: data });
export const setFeature = (data: some) => ({ type: actions.FETCH_FEATURE, payload: data });
export const setFeatureType = (data: some) => ({ type: actions.FETCH_FEATURE_TYPE, payload: data });
export const updateDrag = (drag: string) => ({ type: actions.UPDATE_DRAG, payload: drag });
export const updateCalendarView = (isCalendar: boolean) => ({ type: actions.UPDATE_CALENDAR_VIEW, payload: isCalendar });
export const setGeneralHotelInfo = (data: some) => ({ type: actions.UPDATE_GENERAL_HOTEL, payload: data });
export const updateRangeTime = (data: RangeTimeProps) => ({ type: actions.UPDATE_RANGE_TIME, payload: data });
export const updateRoomAllotment = (data: some) => ({ type: actions.UPDATE_ROOM_ALLOTMENT, payload: data });
export const updateRoomRateList = (data: some) => ({ type: actions.UPDATE_ROOM_RATE_LIST, payload: data });
export const updateInfoSelected = (data: InfoSelectedProps) => ({ type: actions.UPDATE_INFO_SELECTED, payload: data });
export const updateDayWeek = (data: number[]) => ({ type: actions.UPDATE_DAY_WEEK, payload: data });


export default function reducer(
  state: AccommodationState = DEFAULT_ACCOUNT_STATE,
  action: any,
): AccommodationState {
  switch (action.type) {
    case actions.FETCH_ROOM_TYPES:
      return { ...state, roomTypes: action.payload };
    case actions.FETCH_ROOM_CLASS:
      return { ...state, roomClass: action.payload };
    case actions.FETCH_ROOM_VIEW:
      return { ...state, roomView: action.payload };
    case actions.FETCH_BED_TYPES:
      return { ...state, bedTypes: action.payload };
    case actions.FETCH_INFO_PHOTO:
      return { ...state, photos: action.payload };
    case actions.FETCH_RATE_TYPE:
      return { ...state, rateTypes: action.payload };
    case actions.FETCH_ROOM_LIST:
      return { ...state, roomList: action.payload };
    case actions.FETCH_FEATURE:
      return { ...state, features: action.payload };
    case actions.FETCH_FEATURE_TYPE:
      return { ...state, featuresType: action.payload };
    case actions.UPDATE_DRAG:
      return { ...state, dragInfo: action.payload };
    case actions.UPDATE_CALENDAR_VIEW:
      return { ...state, isCalendar: action.payload };
    case actions.UPDATE_GENERAL_HOTEL:
      return { ...state, generalHotelInfo: action.payload };
    case actions.UPDATE_RANGE_TIME:
      return { ...state, rangeTime: action.payload };
    case actions.UPDATE_ROOM_RATE_LIST:
      return { ...state, roomRateList: action.payload };
    case actions.UPDATE_ROOM_ALLOTMENT:
      return { ...state, roomAllotment: action.payload };
    case actions.UPDATE_INFO_SELECTED:
      return { ...state, infoSelected: action.payload };
    case actions.UPDATE_DAY_WEEK:
      return { ...state, dayWeek: action.payload }; 
    default:
      return state;
  }
}
