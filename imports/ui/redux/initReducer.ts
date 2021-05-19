import * as actions from './constant';
import { some } from '../constants';

export interface AccommodationState {
  readonly sidebarShow: any;
  readonly addressP: some;
}

export const DEFAULT_ACCOUNT_STATE = {
  sidebarShow: 'responsive',
  addressP: {},
};

export const setClose = (data: some) => ({ type: actions.FETCH_ROOM_TYPES, payload: data });

export const setWhere = (data: some) => ({ type: actions.FETCH_ADDRESS, payload: data });


export default function reducer(
  state: AccommodationState = DEFAULT_ACCOUNT_STATE,
  action: any,
): AccommodationState {
  switch (action.type) {
    case actions.FETCH_ROOM_TYPES:
      return { ...state, sidebarShow: action.payload };
    case actions.FETCH_ADDRESS:
      return { ...state, addressP: action.payload };
    default:
      return state;
  }
}
