import createResultElement from "~/utils/createResultElement";

export default function generateResults() {
  const results = useResultsStore();
  const calculationsStore = useCalculationsStore();
  const backupStore = useBackupStore();
  const settingsStore = useSettingsStore();

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
        type: settingsStore.defaultValues.dileCork,
        quantity: cork,
        color: 9005,
      });
    }
  }

  if (results.segments.length > 0) {
    results.segments.forEach((item) => {
      if (item.height <= 113)
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.segment103,
        });
      else if (item.height <= 133)
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.segment123,
        });
      else if (item.height <= 163)
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.segment153,
        });
      else if (item.height <= 183)
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.segment173,
        });
      else
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.segment203,
        });
    });
  }

  if (results.segmentHolders.length > 0) {
    results.segmentHolders.forEach((item) => {
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.segmentHolders,
      });
    });
  }

  if (results.poles.length > 0) {
    results.poles.forEach((item) => {
      let pole = "";
      if (item.height === 3) {
        pole = settingsStore.defaultValues.poleMain;
      } else {
        pole = settingsStore.defaultValues.poleAlt;
      }

      createResultElement({ ...item, type: pole });
    });
  }

  if (results.gatePoles.length > 0) {
    let pole = "";
    const exist = results.gates.some((item) => item.type === "Varstomi");
    if (exist) {
      pole = settingsStore.defaultValues.gatePoleAlt;
    } else {
      pole = settingsStore.defaultValues.gatePoleMain;
    }

    results.gatePoles.forEach((item) => {
      createResultElement({ ...item, type: pole });
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
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.anchoredGatePoles.length > 0) {
    let pole = "";
    const exist = results.gates.some((item) => item.type === "Varstomi");
    if (exist) {
      pole = settingsStore.defaultValues.anchoredGatePoleAlt;
    } else {
      pole = settingsStore.defaultValues.anchoredGatePoleMain;
    }

    results.anchoredGatePoles.forEach((item) => {
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.borders > 0) {
    createResultElement({
      type: settingsStore.defaultValues.border,
      quantity: results.borders,
    });
    results.borderHolders.forEach((item) => {
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.borderHolder,
      });
    });
  }

  if (results.crossbars.length > 0) {
    results.crossbars.forEach((item) => {
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.crossbar,
      });
    });
    results.crossbarHolders.forEach((item) => {
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.crossbarHolders,
      });
    });
  }

  if (results.rivets.length > 0) {
    results.rivets.forEach((item) => {
      const boxQuantity = Math.ceil((item.quantity + item.quantity * 0.1) / 1000);
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.rivets,
        quantity: boxQuantity,
      });
    });
  }

  if (results.bolts.length > 0) {
    results.bolts.forEach((item) => {
      const boxQuantity = Math.ceil((item.quantity + item.quantity * 0.1) / 1000);
      createResultElement({
        ...item,
        type: settingsStore.defaultValues.bolts,
        quantity: boxQuantity,
      });
    });
  }

  if (results.retailLegs.length > 0) {
    results.retailLegs.forEach((item) => {
      createResultElement({
        ...item,
        type: item.type,
        quantity: item.quantity / 100,
      });
    });
  }

  if (results.bindingsLength.length > 0) {
    results.bindingsLength.forEach((item) => {
      createResultElement({
        ...item,
        type: calculationsStore.retail
          ? settingsStore.defaultValues.retailBindings
          : settingsStore.defaultValues.bindings,
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
            type: settingsStore.defaultValues.gatesAuto,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            type: settingsStore.defaultValues.gates,
            quantity: 1,
          });
        }
      } else if (item.type === "Varstomi") {
        if (item.auto !== "Taip") {
          createResultElement({
            ...item,
            type: settingsStore.defaultValues.gates2,
            quantity: 1,
          });
        } else {
          createResultElement({
            ...item,
            type: settingsStore.defaultValues.gates2Auto,
            quantity: 1,
          });
        }
      } else if (item.type === "Segmentiniai") {
        createResultElement({
          ...item,
          type: settingsStore.defaultValues.gateSegment,
          quantity: 1,
        });
        createWorkElement({
          name: settingsStore.defaultValues.segmentGateWork,
          quantity: 1,
        });
      } else {
        if (item.option === "Gaminami") {
          if (item.lock === "Elektromagnetinė") {
            createResultElement({
              ...item,
              type: settingsStore.defaultValues.smallGates2,
              quantity: 1,
            });
          } else {
            createResultElement({
              ...item,
              type: settingsStore.defaultValues.smallGates,
              quantity: 1,
            });
          }
        } else {
          createResultElement({
            ...item,
            type: settingsStore.defaultValues.smallGatesSegment,
            quantity: 1,
          });
          createWorkElement({
            name: settingsStore.defaultValues.segmentGatesWork,
            quantity: 1,
          });
        }
      }
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
        name: settingsStore.defaultValues.gateBnkette,
        quantity,
      });
    }
  }

  let transportCount = 1;
  if (backupStore.backupExist) {
    const temp = backupStore.works.find((item) => item.name === "Transportas");
    transportCount = temp?.quantity || 1;
  }

  createWorkElement({
    name: settingsStore.defaultValues.transport,
    quantity: transportCount,
  });

  const tempResults = backupStore.results.filter(
    (item) => !results.results.some((itm) => itm.type === item.type)
  );
  const tempWorks = backupStore.works.filter(
    (item) => !results.works.some((itm) => itm.name === item.name)
  );

  tempResults.forEach((item) => {
    createResultElement({
      ...item,
      type: item.type,
      quantity: item.quantity,
    });
  });

  tempWorks.forEach((item) => {
    createWorkElement({
      name: item.name,
      quantity: item.quantity,
    });
  });
}
