export const getDirection = (angle: number) => {
  var directions = ['Bắc', 'Tây Bắc', 'Tây', 'Tây Nam', 'Nam', 'Đông Nam', 'Đông', 'Đông Nam'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
};

export const filterList = [
  {
    id: 1,
    name: 'Gió',
  },
  {
    id: 2,
    name: 'Nhiệt độ',
  },
  {
    id: 3,
    name: 'Độ ẩm tương đối',
  },
  {
    id: 4,
    name: 'Áp suất khí quyển(2m)',
  },
];

export const DEFAULT_CHART_WIDTH = 680;
export const DEFAULT_CHAT_HEIGHT = 450;

export const windData = [
  {
    id: 31,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-01',
    dataType: 1,
    collectedDate: '01-01-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 30,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-02',
    dataType: 1,
    collectedDate: '01-02-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 29,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-03',
    dataType: 1,
    collectedDate: '01-03-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 28,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-04',
    dataType: 1,
    collectedDate: '01-04-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 27,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-05',
    dataType: 1,
    collectedDate: '01-05-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 26,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-06',
    dataType: 1,
    collectedDate: '01-06-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 25,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-07',
    dataType: 1,
    collectedDate: '01-07-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 24,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-08',
    dataType: 1,
    collectedDate: '01-08-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 23,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-09',
    dataType: 1,
    collectedDate: '01-09-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 22,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-10',
    dataType: 1,
    collectedDate: '01-10-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 21,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-11',
    dataType: 1,
    collectedDate: '01-11-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 20,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-12',
    dataType: 1,
    collectedDate: '01-12-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 19,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-13',
    dataType: 1,
    collectedDate: '01-13-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 18,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-14',
    dataType: 1,
    collectedDate: '01-14-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 17,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-15',
    dataType: 1,
    collectedDate: '01-15-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 16,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-16',
    dataType: 1,
    collectedDate: '01-16-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 15,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-17',
    dataType: 1,
    collectedDate: '01-17-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 14,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-18',
    dataType: 1,
    collectedDate: '01-18-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 13,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-19',
    dataType: 1,
    collectedDate: '01-19-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 12,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-20',
    dataType: 1,
    collectedDate: '01-20-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 11,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-21',
    dataType: 1,
    collectedDate: '01-21-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 10,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-22',
    dataType: 1,
    collectedDate: '01-22-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 9,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-23',
    dataType: 1,
    collectedDate: '01-23-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 8,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-24',
    dataType: 1,
    collectedDate: '01-24-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },

  {
    id: 7,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-25',
    dataType: 1,
    collectedDate: '01-25-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 6,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-26',
    dataType: 1,
    collectedDate: '01-26-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 5,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 4,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 3,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-28',
    dataType: 1,
    collectedDate: '01-28-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 2,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-29',
    dataType: 1,
    collectedDate: '01-29-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
  {
    id: 1,
    orderCode: null,
    bookingCode: 'WSPD_2020-01-30',
    dataType: 1,
    collectedDate: '01-30-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/wspd/WSPD_2020_01',
  },
];



export const tmpData = [
  {
    id: 31,
    orderCode: null,
    bookingCode: 'TMP_2020-01-01',
    dataType: 1,
    collectedDate: '01-01-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 30,
    orderCode: null,
    bookingCode: 'TMP_2020-01-02',
    dataType: 1,
    collectedDate: '01-02-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 29,
    orderCode: null,
    bookingCode: 'TMP_2020-01-03',
    dataType: 1,
    collectedDate: '01-03-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 28,
    orderCode: null,
    bookingCode: 'TMP_2020-01-04',
    dataType: 1,
    collectedDate: '01-04-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 27,
    orderCode: null,
    bookingCode: 'TMP_2020-01-05',
    dataType: 1,
    collectedDate: '01-05-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 26,
    orderCode: null,
    bookingCode: 'TMP_2020-01-06',
    dataType: 1,
    collectedDate: '01-06-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 25,
    orderCode: null,
    bookingCode: 'TMP_2020-01-07',
    dataType: 1,
    collectedDate: '01-07-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 24,
    orderCode: null,
    bookingCode: 'TMP_2020-01-08',
    dataType: 1,
    collectedDate: '01-08-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 23,
    orderCode: null,
    bookingCode: 'TMP_2020-01-09',
    dataType: 1,
    collectedDate: '01-09-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 22,
    orderCode: null,
    bookingCode: 'TMP_2020-01-10',
    dataType: 1,
    collectedDate: '01-10-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 21,
    orderCode: null,
    bookingCode: 'TMP_2020-01-11',
    dataType: 1,
    collectedDate: '01-11-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 20,
    orderCode: null,
    bookingCode: 'TMP_2020-01-12',
    dataType: 1,
    collectedDate: '01-12-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 19,
    orderCode: null,
    bookingCode: 'TMP_2020-01-13',
    dataType: 1,
    collectedDate: '01-13-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 18,
    orderCode: null,
    bookingCode: 'TMP_2020-01-14',
    dataType: 1,
    collectedDate: '01-14-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 17,
    orderCode: null,
    bookingCode: 'TMP_2020-01-15',
    dataType: 1,
    collectedDate: '01-15-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 16,
    orderCode: null,
    bookingCode: 'TMP_2020-01-16',
    dataType: 1,
    collectedDate: '01-16-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 15,
    orderCode: null,
    bookingCode: 'TMP_2020-01-17',
    dataType: 1,
    collectedDate: '01-17-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 14,
    orderCode: null,
    bookingCode: 'TMP_2020-01-18',
    dataType: 1,
    collectedDate: '01-18-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 13,
    orderCode: null,
    bookingCode: 'TMP_2020-01-19',
    dataType: 1,
    collectedDate: '01-19-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 12,
    orderCode: null,
    bookingCode: 'TMP_2020-01-20',
    dataType: 1,
    collectedDate: '01-20-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 11,
    orderCode: null,
    bookingCode: 'TMP_2020-01-21',
    dataType: 1,
    collectedDate: '01-21-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 10,
    orderCode: null,
    bookingCode: 'TMP_2020-01-22',
    dataType: 1,
    collectedDate: '01-22-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 9,
    orderCode: null,
    bookingCode: 'TMP_2020-01-23',
    dataType: 1,
    collectedDate: '01-23-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 8,
    orderCode: null,
    bookingCode: 'TMP_2020-01-24',
    dataType: 1,
    collectedDate: '01-24-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },

  {
    id: 7,
    orderCode: null,
    bookingCode: 'TMP_2020-01-25',
    dataType: 1,
    collectedDate: '01-25-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 6,
    orderCode: null,
    bookingCode: 'TMP_2020-01-26',
    dataType: 1,
    collectedDate: '01-26-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 5,
    orderCode: null,
    bookingCode: 'TMP_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 4,
    orderCode: null,
    bookingCode: 'TMP_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 3,
    orderCode: null,
    bookingCode: 'TMP_2020-01-28',
    dataType: 1,
    collectedDate: '01-28-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 2,
    orderCode: null,
    bookingCode: 'TMP_2020-01-29',
    dataType: 1,
    collectedDate: '01-29-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
  {
    id: 1,
    orderCode: null,
    bookingCode: 'TMP_2020-01-30',
    dataType: 1,
    collectedDate: '01-30-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/tmp/TMP_2020_01',
  },
];


export const hudData = [
  {
    id: 31,
    orderCode: null,
    bookingCode: 'RH_2020-01-01',
    dataType: 1,
    collectedDate: '01-01-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 30,
    orderCode: null,
    bookingCode: 'RH_2020-01-02',
    dataType: 1,
    collectedDate: '01-02-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 29,
    orderCode: null,
    bookingCode: 'RH_2020-01-03',
    dataType: 1,
    collectedDate: '01-03-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 28,
    orderCode: null,
    bookingCode: 'RH_2020-01-04',
    dataType: 1,
    collectedDate: '01-04-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 27,
    orderCode: null,
    bookingCode: 'RH_2020-01-05',
    dataType: 1,
    collectedDate: '01-05-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 26,
    orderCode: null,
    bookingCode: 'RH_2020-01-06',
    dataType: 1,
    collectedDate: '01-06-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 25,
    orderCode: null,
    bookingCode: 'RH_2020-01-07',
    dataType: 1,
    collectedDate: '01-07-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 24,
    orderCode: null,
    bookingCode: 'RH_2020-01-08',
    dataType: 1,
    collectedDate: '01-08-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 23,
    orderCode: null,
    bookingCode: 'RH_2020-01-09',
    dataType: 1,
    collectedDate: '01-09-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 22,
    orderCode: null,
    bookingCode: 'RH_2020-01-10',
    dataType: 1,
    collectedDate: '01-10-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 21,
    orderCode: null,
    bookingCode: 'RH_2020-01-11',
    dataType: 1,
    collectedDate: '01-11-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 20,
    orderCode: null,
    bookingCode: 'RH_2020-01-12',
    dataType: 1,
    collectedDate: '01-12-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 19,
    orderCode: null,
    bookingCode: 'RH_2020-01-13',
    dataType: 1,
    collectedDate: '01-13-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 18,
    orderCode: null,
    bookingCode: 'RH_2020-01-14',
    dataType: 1,
    collectedDate: '01-14-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 17,
    orderCode: null,
    bookingCode: 'RH_2020-01-15',
    dataType: 1,
    collectedDate: '01-15-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 16,
    orderCode: null,
    bookingCode: 'RH_2020-01-16',
    dataType: 1,
    collectedDate: '01-16-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 15,
    orderCode: null,
    bookingCode: 'RH_2020-01-17',
    dataType: 1,
    collectedDate: '01-17-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 14,
    orderCode: null,
    bookingCode: 'RH_2020-01-18',
    dataType: 1,
    collectedDate: '01-18-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 13,
    orderCode: null,
    bookingCode: 'RH_2020-01-19',
    dataType: 1,
    collectedDate: '01-19-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 12,
    orderCode: null,
    bookingCode: 'RH_2020-01-20',
    dataType: 1,
    collectedDate: '01-20-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 11,
    orderCode: null,
    bookingCode: 'RH_2020-01-21',
    dataType: 1,
    collectedDate: '01-21-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 10,
    orderCode: null,
    bookingCode: 'RH_2020-01-22',
    dataType: 1,
    collectedDate: '01-22-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 9,
    orderCode: null,
    bookingCode: 'RH_2020-01-23',
    dataType: 1,
    collectedDate: '01-23-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 8,
    orderCode: null,
    bookingCode: 'RH_2020-01-24',
    dataType: 1,
    collectedDate: '01-24-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },

  {
    id: 7,
    orderCode: null,
    bookingCode: 'RH_2020-01-25',
    dataType: 1,
    collectedDate: '01-25-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 6,
    orderCode: null,
    bookingCode: 'RH_2020-01-26',
    dataType: 1,
    collectedDate: '01-26-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 5,
    orderCode: null,
    bookingCode: 'RH_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 4,
    orderCode: null,
    bookingCode: 'RH_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 3,
    orderCode: null,
    bookingCode: 'RH_2020-01-28',
    dataType: 1,
    collectedDate: '01-28-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 2,
    orderCode: null,
    bookingCode: 'RH_2020-01-29',
    dataType: 1,
    collectedDate: '01-29-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
  {
    id: 1,
    orderCode: null,
    bookingCode: 'RH_2020-01-30',
    dataType: 1,
    collectedDate: '01-30-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/rh/RH_2020_01',
  },
];


export const pressData = [
  {
    id: 31,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-01',
    dataType: 1,
    collectedDate: '01-01-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 30,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-02',
    dataType: 1,
    collectedDate: '01-02-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 29,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-03',
    dataType: 1,
    collectedDate: '01-03-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 28,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-04',
    dataType: 1,
    collectedDate: '01-04-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 27,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-05',
    dataType: 1,
    collectedDate: '01-05-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 26,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-06',
    dataType: 1,
    collectedDate: '01-06-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 25,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-07',
    dataType: 1,
    collectedDate: '01-07-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 24,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-08',
    dataType: 1,
    collectedDate: '01-08-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 23,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-09',
    dataType: 1,
    collectedDate: '01-09-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 22,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-10',
    dataType: 1,
    collectedDate: '01-10-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 21,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-11',
    dataType: 1,
    collectedDate: '01-11-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 20,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-12',
    dataType: 1,
    collectedDate: '01-12-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 19,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-13',
    dataType: 1,
    collectedDate: '01-13-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 18,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-14',
    dataType: 1,
    collectedDate: '01-14-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 17,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-15',
    dataType: 1,
    collectedDate: '01-15-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 16,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-16',
    dataType: 1,
    collectedDate: '01-16-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 15,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-17',
    dataType: 1,
    collectedDate: '01-17-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 14,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-18',
    dataType: 1,
    collectedDate: '01-18-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 13,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-19',
    dataType: 1,
    collectedDate: '01-19-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 12,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-20',
    dataType: 1,
    collectedDate: '01-20-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 11,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-21',
    dataType: 1,
    collectedDate: '01-21-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 10,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-22',
    dataType: 1,
    collectedDate: '01-22-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 9,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-23',
    dataType: 1,
    collectedDate: '01-23-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 8,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-24',
    dataType: 1,
    collectedDate: '01-24-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },

  {
    id: 7,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-25',
    dataType: 1,
    collectedDate: '01-25-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 6,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-26',
    dataType: 1,
    collectedDate: '01-26-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 5,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 4,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-27',
    dataType: 1,
    collectedDate: '01-27-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 3,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-28',
    dataType: 1,
    collectedDate: '01-28-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 2,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-29',
    dataType: 1,
    collectedDate: '01-29-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
  {
    id: 1,
    orderCode: null,
    bookingCode: 'PRES2M_2020-01-30',
    dataType: 1,
    collectedDate: '01-30-2020',
    checkOut: '28-12-2020',
    created: '20-05-2021',
    url: 'data/pres2m/PRES2m_2020_01',
  },
];

