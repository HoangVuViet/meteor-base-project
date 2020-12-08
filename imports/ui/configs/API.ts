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
  // facility
  getAmenities: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/amenities`,
  createAmenities: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/registration/amenities`,
  getAmenitiesDetail: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/amenity-hotel`,

  // policy
  actionsPolicyOfHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/policies`,

  verifyEmailToken: (token: string) =>
    `${getBaseUrl(APIServices.hms)}/ams/account/verify-token?token=${token}`,
  register: `${getBaseUrl(APIServices.hms)}/hms-premium/account/signup`,
  forgotPassword: (email: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/account/forget-password?email=${email}`,
  setPassword: `${getBaseUrl(APIServices.hms)}/ams/account/set-password`,

  groupUserPermission: (code: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/group-operators/init-group?code=${code}`,
  getAllGroupUser: `${getBaseUrl(APIServices.hms)}/hms-premium/group-operators/all-group`,

  getAllChannel: `${getBaseUrl(APIServices.hms)}/hms-premium/channels`,
  getAllRateType: `${getBaseUrl(APIServices.hms)}/hms-premium/rate-types`,
  crudRatePackage: `${getBaseUrl(APIServices.hms)}/hms-premium/rate-packages`,
  listRatePackage: `${getBaseUrl(APIServices.hms)}/hms-premium/rate-packages/list`,
  listHotelRatePackage: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-packages/list`,

  updateSingleHotelRatePackage: (id: string) =>
    `${getBaseUrl(
      APIServices.hms,
    )}/hms-premium/hotels/rate-packages/update-rates-single?hotelId=${id}`,
  updateMultipleHotelRatePackage: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/rate-packages/update-rates-multiple`,

  // member management
  accountMembers: `${getBaseUrl(APIServices.hms)}/hms-premium/account/all`,
  accountByHotelId: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/account/members?hotelId=${hotelId}`,
  createSubAccount: `${getBaseUrl(APIServices.hms)}/hms-premium/account/sub-account`,
  getGroupOperator: (role: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/group-operators/all?type=${role}`,
  getOrAssignAssignmentOfUser: (userId: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/user-management/assignment?userId=${userId}`,
  changeStatusAccount: `${getBaseUrl(APIServices.hms)}/hms-premium/account/status`,
  inviteUserToHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/account/invite`,
  deleteUserFromHotel: (hotelId: number, userId: number) =>
    `${getBaseUrl(
      APIServices.hms,
    )}/hms-premium/group-operators/in-hotel/remove-user?hotelId=${hotelId}&userId=${userId}`,
  getOperatorUserInHotel: (hotelId: number, userId: number) =>
    `${getBaseUrl(
      APIServices.hms,
    )}/hms-premium/group-operators/in-hotel/group-of-user?hotelId=${hotelId}&userId=${userId}`,
  updateGroupUserHotel: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/group-operators/in-hotel/group-of-user`,
  // hotel gallery
  actionsHotelGallery: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/gallery?hotelId=${hotelId}`,
  getRoomHotelGallery: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/gallery/rooms?hotelId=${hotelId}`,
  hotelCategories: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/categories`,
  reorderHotelGallery: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/gallery/reorder?hotelId=${hotelId}`,
  reorderRoomPhotos: (roomId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/room-photos/reorder?roomId=${roomId}`,
  updateProgress: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/gallery/progress?hotelId=${hotelId}`,

  getRoomTypes: `${getBaseUrl(APIServices.hms)}/hms-premium/info/room-types`,
  getRoomClass: `${getBaseUrl(APIServices.hms)}/hms-premium/info/room-classes`,
  getRoomView: `${getBaseUrl(APIServices.hms)}/hms-premium/info/room-views`,
  getBedTypes: `${getBaseUrl(APIServices.hms)}/hms-premium/info/bed-types`,
  getRoomFeatureType: `${getBaseUrl(APIServices.hms)}/hms-premium/info/room-features/types`,
  getRoomFeature: `${getBaseUrl(APIServices.hms)}/hms-premium/info/room-features`,
  getRoomList: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/hotels`,
  createRoomList: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/batch`,

  getProvinceByCountry: (countryId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/info/location/provinces?countryId=${countryId}`,
  getDistrictByProvince: (provinceId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/info/location/districts?provinceId=${provinceId}`,
  getStreetByProvinceAndDistrict: (provinceId: number, districtId: number) =>
    `${getBaseUrl(
      APIServices.hms,
    )}/hms-premium/info/location/streets?provinceId=${provinceId}&districtId=${districtId}`,
  registerGeneralInfo: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/registration/general-info`,
  getGeneralInfo: (hotelId: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/general-info?hotelId=${hotelId}`,

  actionsGeneralAlbum: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/general-album`,
  createHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/registration`,
  getInfoPhotos: `${getBaseUrl(APIServices.hms)}/hms-premium/info/photos/types`,
  createNearByHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/update-hotel-nearby`,
  rejectHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/admin-approve-hotel/reject`,
  getNearByHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/get-hotel-nearby`,
  getApprovalHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/approval/search`,
  actionsPaymentInfo: (hotelId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/payments/info?hotelId=${hotelId}`,
  getHotelGeneralInfo: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/general-info`,

  // bank
  getListHotels: `${getBaseUrl(APIServices.hms)}/hms-premium/info/banks`,
  getListBranchHotels: (bankId: number) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/info/banks/branches?bankId=${bankId}`,
  actionsRoomPhotos: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/room-photos`,

  getProgressBarHotel: (hotelId: string) =>
    `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/percentage-create-hotel?hotelId=${hotelId}`,
  getRateTypes: `${getBaseUrl(APIServices.hms)}/hms-premium/rate-types`,
  getRatePackage: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-packages`,
  getContractTypes: `${getBaseUrl(APIServices.hms)}/hms-premium/info/contracts/types`,
  createContractHotel: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/contracts`,
  uploadContract: `${getBaseUrl(APIServices.tripi)}/hotels/uploadProviderContractFile`,

  requestApprovalHotel: (hotelId: string) =>
    `${getBaseUrl(
      APIServices.hms,
    )}/hms-premium/hotels/approval/request-approve-hotel?hotelId=${hotelId}`,
  // dashboard
  getHotelWaiting: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/approval/dashboard/waiting`,
  getHotelApproved: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/approval/dashboard/approved`,
  getRatePlan: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-plans/list-to-depend`,
  getRatePlanAll: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-plans/list`,
  actionRatePlan: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-plans`,
  updateRatePlan: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rate-plans/enable`,
  getListRoomsInfo: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/rooms/info`,
  getListRatePlanAmenities: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/rate-plans/amenities`,
  // allotment
  getRoomAllotment: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/rates/fetch`,
  getAllotment: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/allotment/all-in-range`,
  updateAllotment: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/allotment/update-and-rebuild`,
  updateRateAllotment: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/rates/setting`,
  updateRatePlanAllotment: `${getBaseUrl(APIServices.hms)}/hms-premium/rooms/rate-plans/setting`,
  updateCommission: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/contracts/commissions`,
  getHotelName: `${getBaseUrl(APIServices.hms)}/hms-premium/hotels/similar-hotel`,
  getHotelDuplicate: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/admin-approve-hotel/check-duplicate`,
  updateRateAndAllotment: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/rooms/calendar/rate-and-allotment`,
  approveAndCreate: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/admin-approve-hotel/created-new-root-hotel`,
  approveAndAssign: `${getBaseUrl(
    APIServices.hms,
  )}/hms-premium/hotels/admin-approve-hotel/assignment-hotel-already`,

  // promotion
  actionPromotions: `${getBaseUrl(APIServices.hms)}/hms-premium/promotions/search`,
  getListPromotions: `${getBaseUrl(APIServices.hms)}/hms-premium/info/promotions/types`,
  previewPromotions: `${getBaseUrl(APIServices.hms)}/hms-premium/promotions/preview`,
};
