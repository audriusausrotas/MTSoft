import type { FenceSetup } from "~/data/interfaces";
import createResultElement from "~/utils/calculations/createResultElement";
import createWorkElement from "~/utils/calculations/createWorkElement";

export default function generateResults() {
  const results = useResultsStore();
  const calculationsStore = useCalculationsStore();
  const backupStore = useBackupStore();
  const settingsStore = useSettingsStore();

  if (results.fences.length > 0) {
    let cork = 0;
    results.fences.forEach((item: any) => {
      createResultElement(item);

      //generate holes
      if (results.totalHoles > 0)
        createWorkElement({
          name: settingsStore.defaultValues.holesWork,
          quantity: results.totalHoles,
        });

      if (item.name.includes("Dilė")) {
        cork += item.quantity;
      }
    });

    if (cork > 0) {
      createResultElement({
        name: settingsStore.defaultValues.dileCork,
        quantity: cork,
        color: 9005,
      });
    }
  }

  if (results.segments.length > 0) {
    results.segments.forEach((item) => {
      createResultElement({
        ...item,
      });
    });
  }

  if (results.segmentHolders.length > 0) {
    results.segmentHolders.forEach((item) => {
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.segmentHolders,
      });
    });
  }

  if (results.poles.length > 0) {
    results.poles.forEach((item) => {
      createResultElement({ ...item });
    });
  }

  if (results.gatePoles.length > 0) {
    let pole = "";
    const exist = results.gates.some((item) => item.name === "Varstomi");
    if (exist) {
      pole = settingsStore.defaultValues.gatePoleAlt;
    } else {
      pole = settingsStore.defaultValues.gatePoleMain;
    }

    results.gatePoles.forEach((item) => {
      createResultElement({ ...item, name: pole });
    });
  }

  if (results.anchoredPoles.length > 0) {
    results.anchoredPoles.forEach((item) => {
      let pole = "";
      if (item.height <= 150) {
        pole = settingsStore.defaultValues.anchoredPoleMain;
      } else {
        pole = settingsStore.defaultValues.anchoredPoleAlt;
      }
      createResultElement({ ...item, name: pole });
    });
  }

  if (results.anchoredGatePoles.length > 0) {
    let pole = "";
    const exist = results.gates.some((item) => item.name === "Varstomi");
    if (exist) {
      pole = settingsStore.defaultValues.anchoredGatePoleAlt;
    } else {
      pole = settingsStore.defaultValues.anchoredGatePoleMain;
    }

    results.anchoredGatePoles.forEach((item) => {
      createResultElement({ ...item, name: pole });
    });
  }

  if (results.borders > 0) {
    createResultElement({
      name: settingsStore.defaultValues.border,
      quantity: results.borders,
    });
    results.borderHolders.forEach((item) => {
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.borderHolder,
      });
    });
  }

  if (results.crossbars.length > 0) {
    results.crossbars.forEach((item) => {
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.crossbar,
      });
    });
    results.crossbarHolders.forEach((item) => {
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.crossbarHolders,
      });
    });
  }

  if (results.rivets.length > 0) {
    results.rivets.forEach((item) => {
      const boxQuantity = Math.ceil((item.quantity + item.quantity * 0.1) / 1000);
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.rivets,
        quantity: boxQuantity,
      });
    });
  }

  if (results.bolts.length > 0) {
    results.bolts.forEach((item) => {
      const boxQuantity = Math.ceil((item.quantity + item.quantity * 0.1) / 1000);
      createResultElement({
        ...item,
        name: settingsStore.defaultValues.bolts,
        quantity: boxQuantity,
      });
    });
  }

  if (results.retailLegs.length > 0) {
    results.retailLegs.forEach((item) => {
      createResultElement({
        ...item,
        quantity: item.quantity / 100,
      });
    });
  }

  if (results.bindingsLength.length > 0) {
    results.bindingsLength.forEach((item) => {
      createResultElement({
        ...item,
        name: calculationsStore.retail
          ? settingsStore.defaultValues.bindings
          : settingsStore.defaultValues.retailBindings,
        quantity: item.quantity / 100,
      });
    });
  }

  if (results.gates.length > 0) {
    const gates = useSettingsStore().gates;

    results.gates.forEach((item) => {
      if (item.option === "Segmentiniai") {
        if (item.name === "Varteliai") {
          createResultElement({
            ...item,
            name: settingsStore.defaultValues.smallGatesSegment,
            quantity: 1,
          });
          createWorkElement({
            name: settingsStore.defaultValues.segmentGatesWork,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            name: settingsStore.defaultValues.gateSegment,
            quantity: 1,
          });
          createWorkElement({
            name: settingsStore.defaultValues.segmentGateWork,
            quantity: 1,
          });
        }
        return;
      }

      const length = Math.ceil(item.width);
      const gate = gates.find(
        (gate) => gate.category.toLowerCase() === item.name.toLowerCase() && length === gate.length
      );
      console.log(gate);

      console.log(gates);

      if (!gate) return;

      createResultElement({
        ...item,
        name: gate.name,
        quantity: 1,
      });
    });
  }

  // calculate works

  if (results.totalFences > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.fenceWork,
      quantity: results.totalFences,
    });
  }

  if (results.totalFencesWithBindings > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.totalFencesWithBindings,
      quantity: results.totalFencesWithBindings,
    });
  }

  if (results.totalFenceboards > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.fenceboardWork,
      quantity: results.totalFenceboards,
    });
  }

  if (results.totalPoles > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.polesWork,
      quantity: results.totalPoles,
    });
  }

  if (results.totalGatePoles > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.gatesPoleWork,
      quantity: results.totalGatePoles,
    });
  }

  if (results.totalAnchoredPoles > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.anchoredPolesWork,
      quantity: results.totalAnchoredPoles,
    });
  }

  if (results.totalAnchoredGatePoles > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.anchoredGatePolesWork,
      quantity: results.totalAnchoredGatePoles,
    });
  }

  if (results.totalBorders > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.bordersWork,
      quantity: results.totalBorders,
    });
  }

  if (results.totalCrossbars > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.crossbarWork,
      quantity: results.totalCrossbars,
    });
  }

  if (results.totalSegments > 0) {
    createWorkElement({
      name: settingsStore.defaultValues.segmentWork,
      quantity: results.totalSegments,
    });
  }

  if (results.gates.length > 0) {
    let quantity = 0;
    results.gates.forEach((item) => {
      if (item.bankette === "Taip" && item.name.includes("Stumdomi")) {
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
        name: settingsStore.defaultValues.gateBnkette,
        quantity,
      });
    }
  }

  createWorkElement({
    name: settingsStore.defaultValues.transport,
    quantity: 1,
  });

  if (backupStore.backupExist) {
    const tempResults = backupStore.results.filter(
      (item) => !results.results.some((itm) => itm.name === item.name)
    );
    const tempWorks = backupStore.works.filter(
      (item) => !results.works.some((itm) => itm.name === item.name)
    );

    tempResults.forEach((item) => {
      results.results.push(item);
    });

    const works = useResultsStore();
    tempWorks.forEach((item) => {
      works.addWork(item);
    });
  }
}
