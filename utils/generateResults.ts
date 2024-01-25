import createResultElement from "~/utils/createResultElement";
import { defaultValues } from "~/data/initialValues";

export default function generateResults() {
  const results = useResultsStore();

  if (results.fences.length > 0) {
    results.fences.forEach((item) => {
      createResultElement(item);
    });
  }

  if (results.poles.length > 0) {
    results.poles.forEach((item) => {
      let pole = "";
      if (item.height === 3) {
        pole = defaultValues.poleMain;
      } else {
        pole = defaultValues.poleAlt;
      }
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.gatePoles.length > 0) {
    let pole = "";
    results.gates.some((item) => {
      if (item.type === "Varstomi") {
        pole = defaultValues.gatePoleAlt;
      } else {
        pole = defaultValues.gatePoleMain;
      }
    });
    createResultElement({ type: pole, quantity: results.gatePoles });
  }

  if (results.borders > 0) {
    createResultElement({
      type: defaultValues.border,
      quantity: results.borders,
    });

    createResultElement({
      type: defaultValues.borderHolder,
      quantity: results.borderHolders,
    });
  }

  if (results.crossbars.length > 0) {
    createResultElement({
      type: defaultValues.crossbar,
      quantity: results.crossbars,
    });
    createResultElement({
      type: defaultValues.crossbarHolders,
      quantity: results.crossbarHolders,
    });
  }

  if (results.totalElements > 0) {
    createResultElement({
      type: defaultValues.rivets,
      quantity: results.totalElements * 4,
    });
  }

  if (results.bindingsLength.length > 0) {
    createResultElement({
      type: defaultValues.bindings,
      quantity: results.bindingsLength,
    });
  }

  if (results.segments.length > 0) {
  }

  if (results.segmentHolders.length > 0) {
  }

  if (results.gates.length > 0) {
  }
}
