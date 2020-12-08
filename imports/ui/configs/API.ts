/* eslint-disable no-unused-vars */

enum APIServices {
  account,
  hms,
  tripi,
  hmsPre,
}

function getBaseUrl(service: APIServices) {
  if (service === APIServices.hms) {
    return 'https://gate.dev.tripi.vn';
  }

  if (service === APIServices.tripi) {
    return 'https://dev-api.tripi.vn';
  }
  if (service === APIServices.hmsPre) {
    return 'http://hms-premium.dev.tripi.vn';
  }
  return '';
}

export const API_PATHS = {
  login: `${getBaseUrl(APIServices.tripi)}/account/login`,
  logout: `${getBaseUrl(APIServices.tripi)}/account/logout`,
  validateAccessToken: `${getBaseUrl(APIServices.tripi)}/account/validateAccessToken`,
  getRoleUser: `${getBaseUrl(APIServices.hms)}/ams/account/roles?zone=HMS_PREMIUM`,
  uploadImage: `${getBaseUrl(APIServices.tripi)}/photos/upload`,
  getAllLocate: 'https://caportal-dev.tripi.vn/tripiConnect/getAllLocale',

  changePassword: `${getBaseUrl(APIServices.hms)}/ams/account/change-password`,
  accountDetail: `${getBaseUrl(APIServices.hms)}/hms-premium/account/detail`,
  registerFireBase: `${getBaseUrl(APIServices.hms)}/msgs/notify/token/register`,
};
