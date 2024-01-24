import type { Fence, Measure, Fences } from "~/data/interfaces";
import { fenceMeasures } from "~/data/initialValues";

export default function calculateVerticalFence(
  item: Fence,
  measure: Measure,
  fenceTemp: Fences[]
) {
  const tempFence: Fences[] = [...fenceTemp];
  let fenceExist: boolean = false;
  let fenceWidth: number = 0;

  fenceWidth = fenceMeasures.findIndex((element) => element.name === item.type);

  const elements = calculateFenceBoards(
    measure.length,
    item.space,
    fenceMeasures[fenceWidth].height,
    item.twoSided
  );

  const initialFenceData = {
    type: item.type,
    color: item.color,
    length: 0,
    height: measure.height,
    quantity: 0,
    elements: 0,
    material: item.material,
    space: item.space,
    seeThrough: "",
    direction: item.direction,
    twoSided: item.twoSided,
  };

  tempFence.forEach((fenceItem) => {
    if (
      fenceItem.type === item.type &&
      fenceItem.color === item.color &&
      fenceItem.material === item.material &&
      fenceItem.space === item.space &&
      fenceItem.direction === item.direction &&
      fenceItem.height === measure.height &&
      fenceItem.twoSided === item.twoSided
    ) {
      fenceItem.elements += elements;
      fenceItem.quantity += elements;
      fenceExist = true;
    }
  });
  if (!fenceExist) {
    initialFenceData.elements = elements;
    initialFenceData.quantity = elements;
    tempFence.push(initialFenceData);
  }

  return tempFence;
}
