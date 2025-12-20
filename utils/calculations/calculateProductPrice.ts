export function calculateProductPrice(cost: number, profit: number) {
  if (cost === 0 || profit === 0) return 0;
  return +(cost / ((100 - profit) / 100)).toFixed(2);
}
