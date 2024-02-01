import type { OtherParts } from "~/data/interfaces";

export default function addPartsHelper(
  array: OtherParts[],
  color: string,
  quantity: number,
  height: number
) {
  let tempArr = [...array];
  let itemExist = false;
  tempArr.forEach((item) => {
    if (item.color === color && height === item.height) {
      item.quantity += quantity;
      itemExist = true;
    }
  });
  if (!itemExist) {
    tempArr.push({ color, quantity, height });
  }
  return tempArr;
}
