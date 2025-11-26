export function calculateProductPrice(cost: number, profit: number) {
  return (cost / ((100 - profit) / 100)).toFixed(2);
}
