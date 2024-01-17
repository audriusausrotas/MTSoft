import type { Fence, Fences, Measure } from "~/data/interfaces";

export default function calculateHorizontalFence(
  fenceTemp: Fences[],
  item: Fence
) {
  const tempFence: Fences[] = [...fenceTemp];
  let fenceExist: boolean = false;
  const initialFenceData = {
    name: item.type,
    color: item.color,
    length: item.totalLength,
    sq: item.totalSQ,
    material: item.material,
    space: item.space,
    twoSided: false,
  };
  tempFence.forEach((fenceItem) => {
    if (
      fenceItem.name === item.type &&
      fenceItem.color === item.color &&
      fenceItem.material === item.material &&
      fenceItem.space === item.space
    ) {
      fenceItem.length += item.totalLength || 0;
      fenceItem.sq += item.totalSQ || 0;
      fenceExist = true;
    }
  });
  if (!fenceExist) {
    tempFence.push(initialFenceData);
  }
  return tempFence;
}
