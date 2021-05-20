export const getDirection = (angle: number) => {
  var directions = ['Bắc', 'Tây Bắc', 'Tây', 'Tây Nam', 'Nam', 'Đông Nam', 'Đông', 'Đông Nam'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
};
