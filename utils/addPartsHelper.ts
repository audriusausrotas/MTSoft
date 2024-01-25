import type { OtherParts } from "~/data/interfaces";

export default function addPartsHelper(
  array: OtherParts[],
  color: string,
  quantity: number,
  height: number
) {
  let itemExist = false;
  array.forEach((item) => {
    if (item.color === color && height === item.height) {
      item.quantity += quantity;
      itemExist = true;
    }
    if (!itemExist) {
      array.push({ color, quantity: 2, height });
    }
  });
}
