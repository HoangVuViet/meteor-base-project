import { some } from "../../constants";

export interface DataPhotoHotels {
  items: any[];
  type?: number;
  name: string;
}

export interface ListTypePhotoHotel {
  type: number;
  name: string;
  listUrl: string[];
}

export const defaultListTypePhotoHotel: DataPhotoHotels[] = [
  {
    name: '',
    items: [],
  },
];

export interface DataTypesPhotoHotels {
  id: number;
  type: number;
  name: string;
}

export interface DataGeneralPhoto {
  photoId: number;
  url: string;
  type: number;
}

const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const checkRole = (roleExpect: string, roleUser: any) => {
  if (!roleUser || roleUser.length === 0) return false;
  return roleUser.some((v: some) => v.description === roleExpect);
};
export interface ICheckBox extends some{
  platformTypes: some[];
  customerTypes: some[];
  roomsTypes: some[];
  amenitiesTypes: some[];
}


export interface PaymentInfo {
  accountNumber: string;
  accountName: string;
  bankId: number;
  bankBranchId: number;
  company: string;
  delegate: string;
  address: string;
  taxCode: string;
  email: string;
}
