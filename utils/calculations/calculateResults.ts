import { v4 as uuidv4 } from "uuid";
import type { Fences, FenceSetup } from "~/data/interfaces";
import calculateHorizontalFence from "~/utils/calculations/calculateHorizontalFence";
import calculateFenceboardFence from "~/utils/calculations/calculateFenceboardFence";
import generateResults from "~/utils/calculations/generateResults";

export default function calculateResults() {
  const calculationsStore = useCalculationsStore();
  const settingsStore = useSettingsStore();
  const results = useResultsStore();
  const fences: FenceSetup[] = useSettingsStore().fences;

  results.clearAll();

  let fenceTemp: Fences[] = [];

  calculationsStore.fences.forEach((item) => {
    const fenceSettings = fences.find((fence) => fence.name === item.name);

    if (!fenceSettings) return;

    // checks what is needed
    const anchoredPoles = item.anchoredPoles === "Taip";
    const onlyParts = item.services === "Tik Medžiagos";
    const onlyServices = item.services === "Tik Montavimas";
    const isSegment: boolean = fenceSettings?.category === "Segmentas";
    const isFenceboard: boolean = fenceSettings?.category === "Tvoralentė";
    const polesNeeded: boolean =
      item.parts !== "Tik Borteliai" && item.parts !== "Be Bortelių Ir Stulpų";
    const bordersNeeded: boolean =
      item.parts !== "Tik Stulpai" &&
      item.parts !== "Be Bortelių Ir Stulpų" &&
      item.anchoredPoles === "Ne";

    // calculate horizontal fence by suare meters
    if (fenceSettings?.category === "Tvora") {
      const temp = calculateHorizontalFence(fenceTemp, item);
      if (!onlyServices) fenceTemp = [...(temp || [])];
      if (!onlyParts) {
        if (item.bindings === "Taip")
          results.addTotalFenceWithBindings(item.totalQuantity);
        else results.addTotalFence(item.totalQuantity);
      }
    }

    let isTogether: boolean = false;
    let lastBindingHeight: number = 0;

    item.measures.forEach((measure) => {
      const isFence =
        !measure.gates.exist && !measure.kampas.exist && !measure.laiptas.exist;

      // calculate gates
      if (measure.gates.exist) {
        results.addGates({
          _id: uuidv4(),
          name: measure.length > 200 ? measure.gates.name : "Varteliai",
          auto: measure.length > 200 ? measure.gates.automatics : "",
          width: measure.length,
          height: measure.height,
          color: item.color,
          filling: item.name,
          ready: false,
          bankette:
            measure.length! > 200 && measure.gates.name === "Stumdomi"
              ? measure.gates.bankette
              : "",

          comment: measure.gates.comment,
          direction: measure.length! < 200 ? measure.gates.direction : "",
          lock: measure.length! < 200 ? measure.gates.lock : "",
          option: measure.gates.option,
        });
      }

      // calculate fenceboard fence
      if (isFenceboard) {
        const temp = calculateFenceboardFence(
          item,
          measure,
          fenceTemp,
          fenceSettings.details.width
        );
        if (!onlyServices) fenceTemp = [...temp.arr];
        if (!onlyParts) results.addTotalFenceboards(temp.quantity);
      }

      // calculate total elements
      if (!isSegment) {
        if (!onlyServices)
          results.addTotalElements(measure.elements, item.color, item.name);

        // calculate bindings

        if (item.direction === "Horizontali" && item.bindings === "Taip") {
          if (!onlyServices)
            results.addBindingsLength(measure.height, item.color);
          if (!onlyServices && !calculationsStore.retail)
            lastBindingHeight = measure.height;
        }
      }

      // calculate wholesale legs
      if (!calculationsStore.retail) {
        if (fenceSettings.category === "Tvora" && !measure.gates.exist) {
          const name =
            item.bindings === "Taip"
              ? settingsStore.defaultValues.retailSingleLeg
              : settingsStore.defaultValues.retailDoubleLeg;
          results.addRetailLeg(measure.height, item.color, name);
        }
      }

      // calculate borders, crossbars
      if (isFence) {
        // calculate crossbars
        if (isFenceboard) {
          if (!onlyServices) results.addCrossbars(item.color);
          if (!onlyParts) results.addTotalCrossbars();
        }
        // calculate borders
        if (bordersNeeded) {
          if (!onlyServices) results.addBorders(item.color);
          if (!onlyParts) results.addTotalBorders();
        }

        // calculate segment

        if (isSegment) {
          if (!onlyServices)
            results.addSegment(
              measure.height,
              item.color,
              item.name,
              Math.ceil(measure.length / 255)
            );
          if (!onlyParts) results.addTotalSegments();
        }
      }

      // calculate poles

      if (polesNeeded) {
        // if gates
        if (measure.gates.exist) {
          if (!isTogether) {
            if (!onlyServices && measure.gates.option !== "Segmentiniai") {
              if (anchoredPoles) {
                results.removeAnchoredPole(item.color);
                results.addAnchoredGatePoles(item.color, 2);
              } else {
                results.removePole(item.color);
                results.addGatePoles(item.color, 2);
              }
            }

            if (!onlyParts) {
              if (anchoredPoles) {
                results.removeTotalAnchoredPole();
                results.addTotalAnchoredGatePoles(2);
              } else {
                results.removeTotalPole();
                results.addTotalGatePoles(2);
              }
            }
          } else {
            if (!onlyServices)
              anchoredPoles
                ? results.addAnchoredGatePoles(item.color, 1)
                : results.addGatePoles(item.color, 1);

            if (!onlyParts)
              anchoredPoles
                ? results.addTotalAnchoredGatePoles(1)
                : results.addTotalGatePoles(1);
          }
          isTogether = true;
        } else {
          // if fence
          if (!isFence) return;

          if (!onlyServices)
            anchoredPoles
              ? results.addAnchoredPoles(item.color, 3)
              : results.addPoles(
                  item.color,
                  isSegment
                    ? settingsStore.defaultValues.poleAlt
                    : settingsStore.defaultValues.poleMain
                );

          if (results.totalPoles === 0 && !onlyParts)
            anchoredPoles
              ? results.addTotalAnchoredPoles()
              : results.addTotalPoles();

          if (!onlyParts)
            anchoredPoles
              ? results.addTotalAnchoredPoles()
              : results.addTotalPoles();

          isTogether = false;
        }
      }
    });

    if (!isSegment && !onlyServices && item.bindings === "Taip")
      results.addBindingsLength(lastBindingHeight + 0.1, item.color);
  });

  results.addFences(fenceTemp);

  generateResults();
}
