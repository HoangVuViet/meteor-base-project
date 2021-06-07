import * as actions from './constant';
import { some } from '../constants';

export interface AccommodationState {
  readonly sidebarShow: any;
  readonly addressP: some;
  readonly logined: boolean;
}

export const DEFAULT_ACCOUNT_STATE = {
  sidebarShow: 'responsive',
  addressP: {},
  logined: false,
};

export const setClose = (data: some) => ({ type: actions.FETCH_ROOM_TYPES, payload: data });

export const setWhere = (data: some) => ({ type: actions.FETCH_ADDRESS, payload: data });

export const setLogin = (data: some) => ({ type: actions.CHECK_LOGIN, payload: data });


export default function reducer(
  state: AccommodationState = DEFAULT_ACCOUNT_STATE,
  action: any,
): AccommodationState {
  switch (action.type) {
    case actions.FETCH_ROOM_TYPES:
      return { ...state, sidebarShow: action.payload };
    case actions.FETCH_ADDRESS:
      return { ...state, addressP: action.payload };
    case actions.CHECK_LOGIN:
      return { ...state, logined: action.payload };
    default:
      return state;
  }
}
