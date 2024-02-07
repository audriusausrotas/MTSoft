export default function calculateFenceBoards(
  length: number,
  space: number,
  fenceWidth: number,
  twoSided: string
) {
  const elementsTemp = Math.round(length / (fenceWidth + space));
  console.log(elementsTemp);

  return twoSided === "Taip" ? elementsTemp * 2 - 1 : elementsTemp;
}
