import { useResultsStore } from "~/store/results";
import calculatePols from "./calculatePoles";

export default function calculateResults() {
  const results = useResultsStore();
  const fences = useCalculationsStore().fences;

  results.clearResults();
  results.clearParts();

  // calculate result elements
  fences.forEach((item) => {
    // results.createFence(item);
    // calculatePols(item.measures);
  });

  //create results
  results.createResults();
}
