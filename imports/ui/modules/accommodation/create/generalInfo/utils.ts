export interface Group1 {
  text: string;
}
export interface MainGroup {
  text1: string;
  object2: Group1;
}
export interface ILocation {
  id: number;
  name: string;
}
export interface HotelContacts {
  name: string;
  email: string;
  phone: string;
  type: string;
  emailBooking: boolean;
  emailReport: boolean;
  emailUpdateBooking: boolean;
  emailFeedback: boolean;
}
export interface ICreateHotelGeneralInfo {
  id?: number;
  name: string;
  starRating: number;
  potential: boolean;
  logo: string;
  numberOfRoom: string;
  houseNumber: string;
  description: string;
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
  countryId?: number;
  provinceId?: number;
  districtId?: number;
  streetId?: number;
  street: string;
  cms: string;
  numberOfFloor: string;
  numberOfRestaurant: string;
  numberOfBar: string;
  established: string;
  recentRepair: string;
  repairFrom: string;
  repairTo: string;
  supportLanguages: string[];
  hotelContacts: HotelContacts[];
  approveStatus?: string;
}
export const defaultHotelContact: HotelContacts = {
  name: '',
  email: '',
  phone: '',
  type: '',
  emailBooking: false,
  emailFeedback: false,
  emailReport: false,
  emailUpdateBooking: false,
};
export const defaultCreateHotelGeneralInfo: ICreateHotelGeneralInfo = {
  name: '',
  starRating: 0,
  potential: false,
  logo: '',
  numberOfRoom: '',
  houseNumber: '',
  description: '',
  checkInFrom: '14:00',
  checkInTo: '16:00',
  checkOutFrom: '10:00',
  checkOutTo: '12:00',
  cms: '',
  street: '',
  numberOfFloor: '',
  numberOfBar: '',
  numberOfRestaurant: '',
  established: '',
  recentRepair: '',
  repairFrom: '',
  repairTo: '',
  supportLanguages: ['vi'],
  hotelContacts: [{ ...defaultHotelContact, type: 'PRIMARY' }],
};

export const listLanguage = [
  {
    id: 'vi',
    name: 'Vietnamese',
  },
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'ru',
    name: 'Russian',
  },
  {
    id: 'ko',
    name: 'Korean',
  },
  {
    id: 'zh',
    name: 'Chinese',
  },
];
