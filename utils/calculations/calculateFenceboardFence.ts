import type { Fence, Measure, Fences } from "~/data/interfaces";
import calculateFenceBoards from "./calculateFenceBoards";

export default function calculateFenceboardFence(
  item: Fence,
  measure: Measure,
  fenceTemp: Fences[],
  fenceboardWidth: number
) {
  const tempFence: Fences[] = [...fenceTemp];
  let fenceExist: boolean = false;

  const elements = calculateFenceBoards(
    item.direction === "Vertikali" ? measure.length : measure.height,
    item.space,
    fenceboardWidth,
    item.twoSided
  );

  const convertedHeight = item.direction === "Vertikali" ? measure.height : measure.length;

  const initialFenceData = {
    name: item.name,
    color: item.color,
    length: 0,
    height: convertedHeight,
    quantity: 0,
    elements: 0,
    material: item.material,
    manufacturer: item.manufacturer,
    space: item.space,
    seeThrough: "",
    direction: item.direction,
    twoSided: item.twoSided,
  };

  tempFence.forEach((fenceItem) => {
    if (
      fenceItem.name === item.name &&
      fenceItem.color === item.color &&
      fenceItem.material === item.material &&
      fenceItem.manufacturer === item.manufacturer &&
      fenceItem.space === item.space &&
      fenceItem.direction === item.direction &&
      fenceItem.height === convertedHeight &&
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

  return { arr: tempFence, quantity: elements };
}
