import * as actions from './constant';
import { some } from '../constants';

export interface AccommodationState {
  readonly sidebarShow: any;
}

export const DEFAULT_ACCOUNT_STATE = {
  sidebarShow: 'responsive',
};

export const setClose = (data: some) => ({ type: actions.FETCH_ROOM_TYPES, payload: data });

export default function reducer(
  state: AccommodationState = DEFAULT_ACCOUNT_STATE,
  action: any,
): AccommodationState {
  switch (action.type) {
    case actions.FETCH_ROOM_TYPES:
      return { ...state, sidebarShow: action.payload };
    default:
      return state;
  }
}
