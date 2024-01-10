export default function calculatePols(measures) {
  const results = useResultsStore();

  let poles = 1;
  let gatePoles = 0;
  let isTogether = false;

  measures.forEach((measure) => {
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
