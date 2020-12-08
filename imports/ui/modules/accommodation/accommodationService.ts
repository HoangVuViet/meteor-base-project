import { createHotelProps } from './constant';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../configs/API';

export const updateProgress = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.updateProgress(hotelId)}`, 'post');
};
export const reorderHotelGallery = (hotelId: number, data: any) => {
  return fetchThunk(`${API_PATHS.reorderHotelGallery(hotelId)}`, 'post', JSON.stringify(data));
};
export const reorderRoomPhotos = (roomId: number, data: any) => {
  return fetchThunk(`${API_PATHS.reorderRoomPhotos(roomId)}`, 'post', JSON.stringify(data));
};
export const actionGetHotelCategories = (locale: string) => {
  const langId = locale === 'vi' ? 1 : 2;
  return fetchThunk(`${API_PATHS.hotelCategories}?langId=${langId}`, 'get');
};
export const actionGetRoomTypes = () => {
  return fetchThunk(`${API_PATHS.getRoomTypes}`, 'get');
};
export const actionGetRoomClass = () => {
  return fetchThunk(`${API_PATHS.getRoomClass}`, 'get');
};
export const actionGetRoomView = () => {
  return fetchThunk(`${API_PATHS.getRoomView}`, 'get');
};
export const actionGetBedType = () => {
  return fetchThunk(`${API_PATHS.getBedTypes}`, 'get');
};
export const getFeatureType = () => {
  return fetchThunk(`${API_PATHS.getRoomFeatureType}`, 'get');
};
export const getFeature = () => {
  return fetchThunk(`${API_PATHS.getRoomFeature}`, 'get');
};
export const actionGetHotelGallery = (
  hotelId: number,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: any,
) => {
  return fetchThunk(`${API_PATHS.actionsHotelGallery(hotelId)}`, method, body);
};
export const getRoomHotelGallery = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getRoomHotelGallery(hotelId)}`, 'get');
};
export const actionsGeneralAlbum = (
  searchStr: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: any,
) => {
  return fetchThunk(`${API_PATHS.actionsGeneralAlbum}?${searchStr}`, method, body);
};
export const getInfoPhotos = () => {
  return fetchThunk(`${API_PATHS.getInfoPhotos}`, 'get');
};

export const getInfoAmenities = () => {
  return fetchThunk(`${API_PATHS.getAmenities}`, 'get');
};

export const actionCreateHotel = (data: createHotelProps) => {
  return fetchThunk(`${API_PATHS.createHotel}`, 'post', JSON.stringify(data));
};
export const actionGetRoomList = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getRoomList}?hotelId=${hotelId}`, 'get');
};
export const actionCreateRoomList = (
  hotelId: string | null,
  method: 'post' | 'put' | 'delete',
  data: any,
) => {
  return fetchThunk(`${API_PATHS.createRoomList}?hotelId=${hotelId}`, method, JSON.stringify(data));
};
export const actionCreateNearBy = (data: any) => {
  return fetchThunk(`${API_PATHS.createNearByHotel}`, 'post', JSON.stringify(data));
};
export const actionGetNearBy = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getNearByHotel}?hotelId=${hotelId}`, 'get');
};

export const actionsRoomPhotos = (
  searchStr: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  data?: any,
) => {
  return fetchThunk(`${API_PATHS.actionsRoomPhotos}?${searchStr}`, method, data);
};

export const getProgressBar = (hotelId: string) => {
  return fetchThunk(`${API_PATHS.getProgressBarHotel(hotelId)}`, 'get');
};
export const actionGetApprovalHotel = (data: any, searchStr: string) => {
  return fetchThunk(`${API_PATHS.getApprovalHotel}?${searchStr}`, 'post', JSON.stringify(data));
};
export const actionRejectAccommodation = (data: any) => {
  return fetchThunk(`${API_PATHS.rejectHotel}`, 'post', JSON.stringify(data));
};
export const getListHotels = () => {
  return fetchThunk(`${API_PATHS.getListHotels}`, 'get');
};
export const getListBranchHotels = (bankId: number) => {
  return fetchThunk(`${API_PATHS.getListBranchHotels(bankId)}`, 'get');
};
export const actionsPaymentInfo = (
  hotelId: number,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  data?: any,
) => {
  return fetchThunk(`${API_PATHS.actionsPaymentInfo(hotelId)}`, method, JSON.stringify(data));
};
export const actionsCreateAmenities = (hotelId: number, data: any) => {
  return fetchThunk(
    `${API_PATHS.createAmenities}?hotelId=${hotelId}`,
    'post',
    JSON.stringify(data),
  );
};
export const actionsGetHotelGeneralInfo = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getHotelGeneralInfo}?hotelId=${hotelId}`, 'get');
};
export const actionsGetRateTypes = () => {
  return fetchThunk(`${API_PATHS.getRateTypes}`, 'get');
};
export const actionsGetRatePackage = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getRatePackage}?hotelId=${hotelId}`, 'get');
};
export const actionsGetContractTypes = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getContractTypes}?hotelId=${hotelId}`, 'get');
};
export const actionsGetListHotel = () => {
  return fetchThunk(`${API_PATHS.listHotelRatePackage}?pageSize=1000&pageOffset=0`, 'post');
};
export const actionsGetListProvinces = () => {
  return fetchThunk(`${API_PATHS.getProvinceByCountry(1)}`, 'get');
};
export const actionGetListDistrict = (provinceId: number) => {
  return fetchThunk(`${API_PATHS.getDistrictByProvince(provinceId)}`);
};
export const actionCreateUpsertPolicy = (
  hotelId: number,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  data?: any,
) => {
  return fetchThunk(`${API_PATHS.actionsPolicyOfHotel}?hotelId=${hotelId}`, method, data);
};
export const actionContractHotel = (
  hotelId: number,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  data?: any,
) => {
  return fetchThunk(
    `${API_PATHS.createContractHotel}?hotelId=${hotelId}`,
    method,
    JSON.stringify(data),
  );
};
export const actionUploadContract = (data?: any) => {
  return fetchThunk(`${API_PATHS.uploadContract}`, 'post', data);
};

export const getAmenitieDetail = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getAmenitiesDetail}?hotelId=${hotelId}`, 'get');
};
export const getRatePlanList = (searchStr: string) => {
  return fetchThunk(`${API_PATHS.getRatePlan}?${searchStr}`, 'get');
};
export const getAllRatePlanList = (searchStr: string) => {
  return fetchThunk(`${API_PATHS.getRatePlanAll}?${searchStr}`, 'get');
};
export const actionDeleteRatePlan = (hotelId: number, id: number) => {
  return fetchThunk(`${API_PATHS.actionRatePlan}?hotelId=${hotelId}&id=${id}`, 'delete');
};
export const actionUpdateRatePlan = (hotelId: number, data: any) => {
  return fetchThunk(`${API_PATHS.updateRatePlan}?hotelId=${hotelId}`, 'post', JSON.stringify(data));
};

export const getRatePlanListRooms = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getListRoomsInfo}?hotelId=${hotelId}`, 'get');
};

export const actionCreateRatePlan = (
  searchStr: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  data?: any,
) => {
  return fetchThunk(`${API_PATHS.actionRatePlan}?${searchStr}`, method, data);
};

// allotment
export const actionGetRoomAllotment = (hotelId: number, data: any) => {
  return fetchThunk(
    `${API_PATHS.getRoomAllotment}?hotelId=${hotelId}`,
    'post',
    JSON.stringify(data),
  );
};
export const actionGetAllotment = (hotelId: number, data: any) => {
  return fetchThunk(`${API_PATHS.getAllotment}?hotelId=${hotelId}`, 'post', JSON.stringify(data));
};
export const actionUpdateAllotment = (searchStr: string, data: any) => {
  return fetchThunk(`${API_PATHS.updateAllotment}?${searchStr}`, 'post', JSON.stringify(data));
};
export const actionUpdateRateAllotment = (searchStr: string, data: any) => {
  return fetchThunk(`${API_PATHS.updateRateAllotment}?${searchStr}`, 'post', JSON.stringify(data));
};
export const actionUpdateRatePlanAllotment = (searchStr: string, data: any) => {
  return fetchThunk(
    `${API_PATHS.updateRatePlanAllotment}?${searchStr}`,
    'post',
    JSON.stringify(data),
  );
};

export const getRatePlanAmenitiesList = () => {
  return fetchThunk(API_PATHS.getListRatePlanAmenities, 'get');
};
export const updateCommissionProvider = (searchStr: string) => {
  return fetchThunk(`${API_PATHS.updateCommission}?${searchStr}`, 'put');
};
export const actionApproveAndCreateHotel = (data: any) => {
  return fetchThunk(`${API_PATHS.approveAndCreate}`, 'post', JSON.stringify(data));
};
export const actionApproveAndAssignHotel = (data: any) => {
  return fetchThunk(`${API_PATHS.approveAndAssign}`, 'post', JSON.stringify(data));
};
export const actionGetHotelName = (hotelName: string, provinceId: number, districtId: number) => {
  return fetchThunk(
    `${API_PATHS.getHotelName}?name=${hotelName}&provinceId=${provinceId}&districtId=${districtId}`,
    'get',
  );
};
export const actionGetHotelDuplicate = (hotelId: number) => {
  return fetchThunk(`${API_PATHS.getHotelDuplicate}?hotelId=${hotelId}`, 'get');
};
export const actionUpdateRateAndAllotment = (
  roomId: number,
  ratePlanRoomCode: number,
  data: any,
) => {
  return fetchThunk(
    `${API_PATHS.updateRateAndAllotment}?roomId=${roomId}&ratePlanRoomCode=${ratePlanRoomCode}`,
    'post',
    JSON.stringify(data),
  );
};
export const actionPromotions = (searchStr: string, data: any) => {
  return fetchThunk(`${API_PATHS.actionPromotions}?${searchStr}`, 'post', JSON.stringify(data));
};
export const getListPromotions = () => {
  return fetchThunk(`${API_PATHS.getListPromotions}`, 'get');
};
export const previewPromotions = (searchStr: string, data: any) => {
  return fetchThunk(`${API_PATHS.previewPromotions}?${searchStr}`, 'post', data);
};
