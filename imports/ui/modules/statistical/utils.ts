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
    name: 'Áp suất khí quyển',
  },
];

