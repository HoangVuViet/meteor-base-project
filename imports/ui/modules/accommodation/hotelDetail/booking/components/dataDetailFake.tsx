export const fakeDetailData = {
  code: 200,
  message: 'Thành công',
  data: {
    id: 1,
    name: 'HYFK56F09I',
    status: 3,
    rateType: {
      id: 1,
      name: 'OTA',
    },
    saleChannel: 'Mytour',
    orderCode: 'MT86456HGT78',
    userInfo: {
      name: 'Nguyễn Thanh Thảo',
      phoneNumber: '0987654321',
      email: 'binLaden@obama.net',
      description: 'Cần thêm chăn nhỏ và chỗ phơi đồ dành cho trẻ em',
    },
    accommodationInfo: {
      nightStaying: 2,
      checkInDay: '30/02/2021',
      checkOutDay: '31/02/2021',
      touristAmount: 4,
    },
    bookingDetail: {
      roomName: 'Executive Suite River View Suite',
      roomQuality: 'Maybach S650',
      orderDate: '31/04/2021, 7:00',
      roomAmount: 2,
      adultAmount: 4,
      childAmount: 5,
      extraBed: 4,
    },
    payment: {
      paymentStatus: {
        cusMytour: {
          status: 1,
          price: 1000000000,
          date: '15/11/2020, 15:25:05',
          method: 'Chuyển khoản ngân hàng VCB',
        },
        nccMytour: {
          status: 2,
          price: 1000000000,
          date: null,
          method: null,
        },
      },
      paymentDetail: {
        roomPriceTotal: 100000000,
      },
    },
    history: [
      {
        date: '30/10/2020, 07:00:00',
        status: 1,
        cusMytour: 1,
        nccMytour: 1,
      },
      {
        date: '30/10/2020, 07:00:00',
        status: 2,
        cusMytour: 2,
        nccMytour: 3,
      },
      {
        date: '30/10/2020, 07:00:00',
        status: 4,
        cusMytour: 3,
        nccMytour: 2,
      },
      {
        date: '30/10/2020, 07:00:00',
        status: 3,
        cusMytour: 1,
        nccMytour: 2,
      },
    ],
  },
};
