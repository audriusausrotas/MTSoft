import createResultElement from "~/utils/createResultElement";
import { defaultValues } from "~/data/initialValues";

export default function generateResults() {
  const results = useResultsStore();
  console.log(results.gates);

  if (results.fences.length > 0) {
    results.fences.forEach((item) => {
      createResultElement(item);
    });
  }

  if (results.segments.length > 0) {
    results.segments.forEach((item) => {
      createResultElement({
        type: defaultValues.segment,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.segmentHolders.length > 0) {
    results.segmentHolders.forEach((item) => {
      createResultElement({
        type: defaultValues.segmentHolders,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
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
    const exist = results.gates.some((item) => item.type === "Varstomi");
    if (exist) {
      pole = defaultValues.gatePoleAlt;
    } else {
      pole = defaultValues.gatePoleMain;
    }

    results.gatePoles.forEach((item) => {
      createResultElement({
        type: pole,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.borders > 0) {
    createResultElement({
      type: defaultValues.border,
      quantity: results.borders,
    });
    results.borderHolders.forEach((item) => {
      createResultElement({
        type: defaultValues.borderHolder,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.crossbars.length > 0) {
    results.crossbars.forEach((item) => {
      createResultElement({
        type: defaultValues.crossbar,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
    });

    results.crossbarHolders.forEach((item) => {
      createResultElement({
        type: defaultValues.crossbarHolders,
        quantity: item.quantity,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.totalElements > 0) {
    results.rivets.forEach((item) => {
      const boxQuantity = Math.ceil(
        (item.quantity + item.quantity * 0.1) / 1000
      );

      createResultElement({
        type: defaultValues.rivets,
        quantity: boxQuantity,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.bindingsLength.length > 0) {
    results.bindingsLength.forEach((item) => {
      createResultElement({
        type: defaultValues.bindings,
        quantity: item.quantity / 100,
        color: item.color,
        height: item.height,
      });
    });
  }

  if (results.gates.length > 0) {
    results.gates.forEach((item) => {
      if (item.type === "Stumdomi") {
        if (item.auto) {
          createResultElement({
            type: defaultValues.gatesAuto,
            quantity: 1,
            color: item.color,
            height: item.height,
          });
        } else {
          createResultElement({
            type: defaultValues.gates,
            quantity: 1,
            color: item.color,
            height: item.height,
          });
        }
      } else if (item.type === "Varstomi") {
        if (item.auto) {
          createResultElement({
            type: defaultValues.gates2,
            quantity: 1,
            color: item.color,
            height: item.height,
          });
        } else {
          createResultElement({
            type: defaultValues.gates2Auto,
            quantity: 1,
            color: item.color,
            height: item.height,
          });
        }
      } else {
        createResultElement({
          type: defaultValues.smallGates,
          quantity: 1,
          color: item.color,
          height: item.height,
        });
      }
    });
  }
}
