import { push } from 'connected-react-router';
import 'firebase/app';
import 'firebase/messaging';
import { get, remove, set } from 'js-cookie';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_PATHS } from '../../../configs/API';
import { some, SUCCESS_CODE } from '../../../constants';
import { AppState, clearStoreAfterLogout } from '../../../redux/reducers';
// import { messaging } from '../../../service/firebase';
import { setUserData } from '../../account/redux/accountReducer';
import { ACCESS_TOKEN } from '../../auth/constants';
import { fetchThunk } from '../../common/redux/thunk';
import { inAction, out, setAuthenticating, setRole, setValidatingToken } from './authReducer';

export interface ILoginData {
  email: string;
  password: string;
  isChecked?: boolean;
}

export interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultChangePass: IChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const defaultLoginData: ILoginData = {
  email: '',
  password: '',
  isChecked: true,
};
export interface IFirstLoginData {
  username: string;
  password: string;
  confirmPassword: string;
}

export const defaultFirstLoginData: IFirstLoginData = {
  username: '',
  password: '',
  confirmPassword: '',
};
export interface IChangePasswordData {
  password: string;
  confirmPassword: string;
}

export const defaultChangePasswordData: IChangePasswordData = {
  password: '',
  confirmPassword: '',
};
export interface IRegisterData {
  email: string;
  name: string;
  phone: string;
}

export const defaultRegisterData: IRegisterData = {
  phone: '',
  name: '',
  email: '',
};

export function authIn(
  userData: some,
  skipSaga: boolean = false,
): ThunkAction<void, AppState, null, Action<string>> {
  return (dispatch: any, getState: any) => {
    const state = getState();
    dispatch(setUserData(userData));
    if (!state.auth.auth) {
      dispatch(inAction(skipSaga));
    }
  };
}

// export function sendTokenToServer(): ThunkAction<void, AppState, null, Action<string>> {
//   return async (dispatch, getState) => {
//     messaging
//       .getToken()
//       .then(async currentToken => {
//         console.log(currentToken);
//         if (currentToken) {
//           await dispatch(
//             fetchThunk(
//               API_PATHS.registerFireBase,
//               'post',
//               JSON.stringify({
//                 app: 'com.tripi.partner',
//                 platform: 'WEB',
//                 token: currentToken,
//               }),
//             ),
//           );
//         } else {
//         }
//       })
//       .catch(err => {
//         console.log('An error occurred while retrieving token. ', err);
//       });
//   };
// }

export function validateAccessToken(
  periodic = false,
): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch: any, getState: any) => {
    let prevAccessToken = get(ACCESS_TOKEN);
    let first = true;
    const fn = async (force = false) => {
      const accessToken = get(ACCESS_TOKEN);
      const state = getState();
      if (accessToken) {
        if (first || prevAccessToken !== accessToken || force) {
          first = false;
          dispatch(setValidatingToken(true));
          try {
            const json = await dispatch(fetchThunk(`${API_PATHS.validateAccessToken}`, 'get'));
            if (json && json.code === SUCCESS_CODE) {
              dispatch(authIn(json.data));
              // dispatch(sendTokenToServer());
              prevAccessToken = accessToken;
            } else if (getState().auth.auth) {
              dispatch(out());
              remove(ACCESS_TOKEN);
              dispatch(setUserData());
              dispatch(
                push({
                  pathname: '/',
                }),
              );
            }
          } finally {
            dispatch(setValidatingToken(false));
          }
        }
      } else if (state.auth.auth) {
        dispatch(out());
      }
    };
    if (periodic) {
      setInterval(fn, 1000);
    } else {
      fn(true);
    }
  };
}

export function login(
  data: ILoginData,
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch: any, getState: any) => {
    dispatch(setAuthenticating(true));
    try {
      const json = await dispatch(fetchThunk(API_PATHS.login, 'post', JSON.stringify(data)));
      if (json?.code === SUCCESS_CODE) {
        set(ACCESS_TOKEN, json.data.accessToken);
        dispatch(validateAccessToken());
        return json;
      }
      return json;
    } finally {
      dispatch(setAuthenticating(false));
    }
  };
}

export function logout(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch: any, getState: any) => {
    dispatch(fetchThunk(API_PATHS.logout, 'delete'));
    remove(ACCESS_TOKEN);
    batch(() => {
      dispatch(out());
      dispatch(clearStoreAfterLogout());
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 0);
  };
}

export function getRoleUser(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch: any) => {
    const json = await dispatch(fetchThunk(`${API_PATHS.getRoleUser}`, 'get'));
    if (json?.code === SUCCESS_CODE) {
      dispatch(setRole(json?.data?.items || []));
    }
  };
}
