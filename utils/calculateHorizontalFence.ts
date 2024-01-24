import type { Fence, Fences } from "~/data/interfaces";

export default function calculateHorizontalFence(
  fenceTemp: Fences[],
  item: Fence
) {
  const tempFence: Fences[] = [...fenceTemp];

  let fenceExist: boolean = false;

  const initialFenceData = {
    type: item.type,
    color: item.color,
    length: item.totalLength,
    height: 0,
    quantity: item.totalQuantity,
    material: item.material,
    elements: 0,
    space: item.space,
    seeThrough: item.seeThrough,
    direction: item.direction,
    twoSided: item.twoSided,
  };

  tempFence.forEach((fenceItem) => {
    if (
      fenceItem.type === item.type &&
      fenceItem.color === item.color &&
      fenceItem.material === item.material &&
      fenceItem.space === item.space &&
      fenceItem.seeThrough === item.seeThrough &&
      fenceItem.direction === item.direction
    ) {
      fenceItem.length += item.totalLength || 0;
      fenceItem.quantity += item.totalQuantity || 0;
      fenceExist = true;
    }
  });
  if (!fenceExist) {
    tempFence.push(initialFenceData);
  }

  return tempFence;
}
