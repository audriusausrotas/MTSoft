import createResultElement from "~/utils/createResultElement";
import { defaultValues } from "~/data/initialValues";

export default function generateResults() {
  const results = useResultsStore();

  if (results.fences.length > 0) {
    let cork = 0;
    results.fences.forEach((item) => {
      createResultElement(item);
      if (item.type.includes("Dilė")) {
        cork += item.quantity;
      }
    });
    if (cork > 0) {
      createResultElement({
        type: defaultValues.dileCork,
        quantity: cork,
        color: 9005,
      });
    }
  }

  if (results.segments.length > 0) {
    results.segments.forEach((item) => {
      if (item.height <= 113)
        createResultElement({ ...item, type: defaultValues.segment103 });
      else if (item.height <= 133)
        createResultElement({ ...item, type: defaultValues.segment123 });
      else if (item.height <= 163)
        createResultElement({ ...item, type: defaultValues.segment153 });
      else if (item.height <= 183)
        createResultElement({ ...item, type: defaultValues.segment173 });
      else createResultElement({ ...item, type: defaultValues.segment203 });
    });
  }

  if (results.segmentHolders.length > 0) {
    results.segmentHolders.forEach((item) => {
      createResultElement({ ...item, type: defaultValues.segmentHolders });
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
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.anchoredPoles.length > 0) {
    results.anchoredPoles.forEach((item) => {
      let pole = "";
      if (item.height <= 150) {
        pole = defaultValues.anchoredPoleMain;
      } else {
        pole = defaultValues.anchoredPoleAlt;
      }
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.anchoredGatePoles.length > 0) {
    let pole = "";
    const exist = results.gates.some((item) => item.type === "Varstomi");
    if (exist) {
      pole = defaultValues.anchoredGatePoleAlt;
    } else {
      pole = defaultValues.anchoredGatePoleMain;
    }

    results.anchoredGatePoles.forEach((item) => {
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.borders > 0) {
    createResultElement({
      type: defaultValues.border,
      quantity: results.borders,
    });
    results.borderHolders.forEach((item) => {
      createResultElement({ ...item, type: defaultValues.borderHolder });
    });
  }

  if (results.crossbars.length > 0) {
    results.crossbars.forEach((item) => {
      createResultElement({ ...item, type: defaultValues.crossbar });
    });

    results.crossbarHolders.forEach((item) => {
      createResultElement({ ...item, type: defaultValues.crossbarHolders });
    });
  }

  if (results.rivets.length > 0) {
    results.rivets.forEach((item) => {
      const boxQuantity = Math.ceil(
        (item.quantity + item.quantity * 0.1) / 1000
      );
      createResultElement({
        ...item,
        type: defaultValues.rivets,
        quantity: boxQuantity,
      });
    });
  }

  if (results.bolts.length > 0) {
    results.bolts.forEach((item) => {
      const boxQuantity = Math.ceil(
        (item.quantity + item.quantity * 0.1) / 1000
      );
      createResultElement({
        ...item,
        type: defaultValues.bolts,
        quantity: boxQuantity,
      });
    });
  }

  if (results.bindingsLength.length > 0) {
    results.bindingsLength.forEach((item) => {
      createResultElement({
        ...item,
        type: defaultValues.bindings,
        quantity: item.quantity / 100,
      });
    });
  }

  if (results.gates.length > 0) {
    results.gates.forEach((item) => {
      if (item.type === "Stumdomi") {
        if (item.auto === "Taip") {
          createResultElement({
            ...item,
            type: defaultValues.gatesAuto,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            type: defaultValues.gates,
            quantity: 1,
          });
        }
      } else if (item.type === "Varstomi") {
        if (item.auto !== "Taip") {
          createResultElement({
            ...item,
            type: defaultValues.gates2,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            type: defaultValues.gates2Auto,
            quantity: 1,
          });
        }
      } else {
        console.log(item);
        if (item.lock === "Elektromagnetinė") {
          createResultElement({
            ...item,
            type: defaultValues.smallGates2,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            type: defaultValues.smallGates,
            quantity: 1,
          });
        }
      }
    });
  }

  // calculate works

  if (results.totalFences > 0) {
    createWorkElement({
      name: defaultValues.fenceWork,
      quantity: results.totalFences,
    });
  }

  if (results.totalFencesWithBindings > 0) {
    createWorkElement({
      name: defaultValues.totalFencesWithBindings,
      quantity: results.totalFencesWithBindings,
    });
  }

  if (results.totalFenceboards > 0) {
    createWorkElement({
      name: defaultValues.fenceboardWork,
      quantity: results.totalFenceboards,
    });
  }

  if (results.totalPoles > 0) {
    createWorkElement({
      name: defaultValues.polesWork,
      quantity: results.totalPoles,
    });
  }

  if (results.totalGatePoles > 0) {
    createWorkElement({
      name: defaultValues.gatesPoleWork,
      quantity: results.totalGatePoles,
    });
  }

  if (results.totalAnchoredPoles > 0) {
    createWorkElement({
      name: defaultValues.anchoredPolesWork,
      quantity: results.totalAnchoredPoles,
    });
  }

  if (results.totalAnchoredGatePoles > 0) {
    createWorkElement({
      name: defaultValues.anchoredGatePolesWork,
      quantity: results.totalAnchoredGatePoles,
    });
  }

  if (results.totalBorders > 0) {
    createWorkElement({
      name: defaultValues.bordersWork,
      quantity: results.totalBorders,
    });
  }

  if (results.totalCrossbars > 0) {
    createWorkElement({
      name: defaultValues.crossbarWork,
      quantity: results.totalCrossbars,
    });
  }

  if (results.totalSegments > 0) {
    createWorkElement({
      name: defaultValues.segmentWork,
      quantity: results.totalSegments,
    });
  }

  if (results.gates.length > 0) {
    let quantity = 0;
    results.gates.forEach((item) => {
      if (item.bankette === "Taip" && item.type.includes("Stumdomi")) {
        quantity +=
          item.width <= 500
            ? 2
            : item.width <= 600
            ? 2.5
            : item.width <= 700
            ? 3
            : item.width <= 800
            ? 3.5
            : item.width <= 900
            ? 4
            : 5;
      }
    });

    if (quantity > 0) {
      createWorkElement({
        name: defaultValues.gateBnkette,
        quantity,
      });
    }
  }

  createWorkElement({
    name: defaultValues.transport,
    quantity: 1,
  });
}
