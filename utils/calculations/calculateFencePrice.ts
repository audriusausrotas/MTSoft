export function calculateFencePrice(step: number, price: number, legPrice: number) {
  return (((100 / step) * 2.5 * price + legPrice * 2) / 2.5).toFixed(2);
}
