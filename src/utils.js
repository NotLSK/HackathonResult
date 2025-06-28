export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

/**
 * @returns {string} Возвращает случайный цвет в hex формате (#ffffff)
 * @author Mikita
 */
export function getRandomColor() {
  const hexRange = '1234567890ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexRange[random(0, hexRange.length - 1)];
  }
  return color;
}