import type { Fence, Fences } from "~/data/interfaces";

export default function calculateHorizontalFence(
  fenceTemp: Fences[],
  item: Fence
) {
  const tempFence: Fences[] = [...fenceTemp];
  const units = useCalculationsStore().units;

  let fenceExist: boolean = false;

  if (item.services === "Tik Montavimas") return;

  const initialFenceData = {
    ...item,
    length: item.totalLength,
    height: 0,
    quantity: units ? item.totalQuantity : calculateWholesale(item),
    elements: 0,
  };

  tempFence.forEach((fenceItem) => {
    if (
      fenceItem.name === item.name &&
      fenceItem.color === item.color &&
      fenceItem.material === item.material &&
      fenceItem.material === item.manufacturer &&
      fenceItem.space === item.space &&
      fenceItem.seeThrough === item.seeThrough &&
      fenceItem.direction === item.direction
    ) {
      if (units) {
        fenceItem.length += item.totalLength || 0;
        fenceItem.quantity += item.totalQuantity || 0;
        fenceItem.elements += item.elements || 0;
        fenceExist = true;
      } else {
        fenceItem.quantity += calculateWholesale(item);
      }
    }
  });

  if (!fenceExist) {
    tempFence.push(initialFenceData);
  }

  return tempFence;
}

function calculateWholesale(item: Fence) {
  let tempTotalElements = 0;
  item.measures.forEach((element) => {
    tempTotalElements += (element.length / 100) * element.elements;
  });
  return tempTotalElements;
}
