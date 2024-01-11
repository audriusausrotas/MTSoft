import type { Measure } from "~/data/interfaces";

export default function calculatePols(measures: Measure[]) {
  const results = useResultsStore();

  let poles = 1;
  let gatePoles = 0;
  let isTogether = false;

  measures.forEach((measure: Measure) => {
    if (measure.gates) {
      if (!isTogether) {
        poles--;
        gatePoles += 2;
      } else {
        gatePoles++;
      }
      isTogether = true;
    } else {
      poles++;
      isTogether = false;
    }
  });
  results.addPoles(poles);
  results.addGatePoles(gatePoles);
}
