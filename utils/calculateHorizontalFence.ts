import type { Fence, Fences } from "~/data/interfaces";

export default function calculateHorizontalFence(fenceTemp: Fences[], item: Fence) {
  const tempFence: Fences[] = [...fenceTemp];
  const useCalculate = useCalculationsStore();
  const retail = useCalculate.retail;

  let fenceExist: boolean = false;

  if (item.services === "Tik Montavimas") return;

  const initialFenceData = {
    ...item,
    length: item.totalLength,
    height: 0,
    quantity: retail ? calculateRetail(item) : item.totalQuantity,
    elements: 0,
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
      if (retail) {
        fenceItem.quantity += calculateRetail(item);
      } else {
        fenceItem.length += item.totalLength || 0;
        fenceItem.quantity += item.totalQuantity || 0;
        fenceExist = true;
      }
    }
  });
  if (!fenceExist) {
    tempFence.push(initialFenceData);
  }

  return tempFence;
}

function calculateRetail(item: Fence) {
  let tempTotalElements = 0;
  item.measures.forEach((element) => {
    tempTotalElements += (element.length / 100) * element.elements;
  });
  return tempTotalElements;
}
