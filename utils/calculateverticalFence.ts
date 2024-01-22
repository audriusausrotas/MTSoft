import type { Fence, Measure, Fences } from "~/data/interfaces";
import { fenceMeasures } from "~/data/selectFieldData";

export default function CalculateVerticalFence(
  item: Fence,
  measure: Measure,
  fenceTemp: Fences[]
) {
  const tempFence: Fences[] = [...fenceTemp];
  let fenceExist: boolean = false;
  let fenceWidth: number = 0;

  const initialFenceData = {
    type: item.type,
    color: item.color,
    length: 0,
    height: measure.height,
    quantity: 0,
    material: item.material,
    space: item.space,
    seeThrough: "",
    direction: item.direction,
    twoSided: item.twoSided,
  };

  switch (item.type) {
    case "Alba":
      fenceWidth = fenceMeasures.Alba.height;
      break;
    case "Standard":
      fenceWidth = fenceMeasures.Standard.height;
      break;
    case "Sigma":
      fenceWidth = fenceMeasures.Sigma.height;
      break;
    case "Astra":
      fenceWidth = fenceMeasures.Astra.height;
      break;
    case "Polo":
      fenceWidth = fenceMeasures.Polo.height;
      break;
    case "Eva":
      fenceWidth = fenceMeasures.Eva.height;
      break;
    case "Eva3":
      fenceWidth = fenceMeasures.Eva3.height;
      break;
    case "Estetic":
      fenceWidth = fenceMeasures.Estetic.height;
      break;
    case "Emka":
      fenceWidth = fenceMeasures.Emka.height;
      break;
    case "Dija":
      fenceWidth = fenceMeasures.Dija.height;
      break;
    case "Dilė":
      fenceWidth = fenceMeasures.Dilė.height;
      break;
    default:
      break;
  }

  const elementsTemp = Math.round(measure.length! / (item.space + fenceWidth));
  const elements =
    item.twoSided === "Taip" ? elementsTemp * 2 - 1 : elementsTemp;

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
      fenceItem.quantity += elements;
      fenceExist = true;
    }
  });
  if (!fenceExist) {
    initialFenceData.quantity = elements;
    tempFence.push(initialFenceData);
  }

  return tempFence;
}
