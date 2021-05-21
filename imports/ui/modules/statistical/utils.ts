export const getDirection = (angle: number) => {
  var directions = ['Bắc', 'Tây Bắc', 'Tây', 'Tây Nam', 'Nam', 'Đông Nam', 'Đông', 'Đông Nam'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
};

export const filterList = [
  {
    id: 1,
    name: 'value1',
  },
  {
    id: 2,
    name: 'value2',
  },
  {
    id: 3,
    name: 'value3',
  },
  {
    id: 4,
    name: 'value4',
  },
];

