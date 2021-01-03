export const dataType = [
  {
    id: 1,
    name: 'MOD',
  },
  {
    id: 2,
    name: 'MYD',
  },
  {
    id: 3,
    name: 'VIIRS',
  },
  {
    id: 4,
    name: 'Landsat',
  },
];

export const radiusMODValues = Array.from(Array(50).keys())
  .filter((_el: any, index: number) => {
    return index % 3 === 0 && index > 0;
  })
  .map((el: number, _index: number) => {
    return { id: el };
  });

export const radiusMYDValues = Array.from(Array(50).keys())
  .filter((_el: any, index: number) => {
    return index % 3 === 0 && index > 0;
  })
  .map((el: number, _index: number) => {
    return { id: el };
  });
export const radiusVIRValues = Array.from(Array(50).keys())
  .filter((_el: any, index: number) => {
    return index % 3 === 0 && index > 0;
  })
  .map((el: number, _index: number) => {
    return { id: el };
  });

export const radiusLANDValues = Array.from(Array(50).keys())
  .filter((_el: any, index: number) => {
    return index % 3 === 0 && index > 0;
  })
  .map((el: number, _index: number) => {
    return { id: el / 100 };
  });

export const timeEvaluation = [
  {
    id: 15,
    endor: 'm',
  },
  {
    id: 30,
    endor: 'm',
  },
  {
    id: 1,
    endor: 'h',
  },
  {
    id: 2,
    endor: 'h',
  },
  {
    id: 3,
    endor: 'h',
  },
  {
    id: 4,
    endor: 'h',
  },
  ,
  {
    id: 12,
    endor: 'h',
  },
  {
    id: 24,
    endor: 'h',
  },
];

export const stationList = [
  {
    id: 1,
    name: 'Aqua',
  },
  {
    id: 2,
    name: 'Terra',
  },
];
