import { useResultsStore } from "~/store/results";
import { verticals } from "~/data/selectFieldData";
import { defaultValues } from "~/data/initialValues";
import type { Fences } from "~/data/interfaces";
import calculateHorizontalFence from "~/utils/calculateHorizontalFence";
import calculateVerticalFence from "~/utils/calculateVerticalFence";
import generateResults from "~/utils/generateResults";

export default function calculateResults() {
  const results = useResultsStore();
  const fences = useCalculationsStore();

  results.clearResults();
  results.clearParts();

  let fenceTemp: Fences[] = [];

  fences.fences.forEach((item) => {
    // checks if crossbars needed
    const onlyParts = item.services === "Tik Medžiagos";
    const onlyServices = item.services === "Tik Montavimas";
    const isSegment: boolean = item.type.includes("Segmentas");
    const polesNeeded: boolean =
      item.parts !== "Tik Borteliai" && item.parts !== "Be Bortelių Ir Stulpų";
    const bordersNeeded: boolean =
      item.parts !== "Tik Stulpai" &&
      item.parts !== "Be Bortelių Ir Stulpų" &&
      item.anchoredPoles === "Ne";
    const hasCrossbars: boolean = verticals.some(
      (vertical) => vertical === item.type
    );

    // calculate horizontal fence by suare meters
    if (!hasCrossbars && !isSegment) {
      const temp = calculateHorizontalFence(fenceTemp, item);
      if (!onlyServices) fenceTemp = [...temp];
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
          client: fences.client.username,
          phone: fences.client.phone,
          address: fences.client.address,
          type: measure.length! > 200 ? measure.gates.type : "Varteliai",
          auto: measure.gates.automatics,
          width: measure.length,
          height: measure.height,
          color: item.color,
          filling: item.type,
          ready: false,
          aditional: measure.gates.aditional,
        });
      }

      // calculate vertical fence board fence
      if (hasCrossbars && item.direction === "Vertikali" && !isSegment) {
        const temp = calculateVerticalFence(item, measure, fenceTemp);
        if (!onlyServices) fenceTemp = [...temp.arr];
        if (!onlyParts) results.addTotalFenceboards(temp.quantity);
      }

      // calculate horizontal fence board fence
      if (hasCrossbars && item.direction === "Horizontali" && !isSegment) {
        // const temp = calculateVerticalFence(item, measure, fenceTemp);
        // fenceTemp = [...temp];
      }

      // calculate total elements
      if (!isSegment) {
        if (!onlyServices)
          results.addTotalElements(measure.elements, item.color);

        // calculate bindings
        if (item.direction === "Horizontali" && item.bindings === "Taip") {
          if (!onlyServices)
            results.addBindingsLength(measure.height, item.color);
          if (!onlyServices) lastBindingHeight = measure.height;
        }
      }

      // calculate borders, crossbars
      if (isFence) {
        // calculate crossbars
        if (hasCrossbars && !isSegment) {
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
          if (!onlyServices) results.addSegment(measure.height, item.color);
          if (!onlyParts) results.addTotalSegments();
        }
      }

      // calculate poles
      if (polesNeeded) {
        let poleHeight = 0;

        if (isSegment) {
          if (measure.height < 150) {
            poleHeight = 2.4;
          } else {
            poleHeight = 3;
          }
        } else {
          poleHeight = 3;
        }

        if (item.anchoredPoles === "Taip") {
          // count anchored poles
          if (!measure.gates.exist) {
            if (!onlyServices) results.addAnchoredPoles(item.color, poleHeight);

            if (results.totalAnchoredPoles === 0 && !onlyParts)
              results.addTotalAnchoredPoles();
            if (!onlyParts) results.addTotalAnchoredPoles();

            isTogether = false;
          } else {
            if (!isTogether) {
              if (!onlyServices) results.removeAnchoredPole(item.color);
              if (!onlyServices) results.addAnchoredGatePoles(item.color, 2);
              if (!onlyParts) results.removeTotalAnchoredPole();
              if (!onlyParts) results.addTotalAnchoredGatePoles(2);
            } else {
              if (!onlyServices) results.addAnchoredGatePoles(item.color, 1);
              if (!onlyParts) results.addTotalAnchoredGatePoles(1);
            }
            isTogether = true;
          }
        } else {
          //count regular poles
          if (!measure.gates.exist) {
            if (!onlyServices) results.addPoles(item.color, poleHeight);

            if (results.totalPoles === 0 && !onlyParts) results.addTotalPoles();
            if (!onlyParts) results.addTotalPoles();

            isTogether = false;
          } else {
            if (!isTogether) {
              if (!onlyServices) results.removePole(item.color);
              if (!onlyServices) results.addGatePoles(item.color, 2);
              if (!onlyParts) results.removeTotalPole();
              if (!onlyParts) results.addTotalGatePoles(2);
            } else {
              if (!onlyServices) results.addGatePoles(item.color, 1);
              if (!onlyParts) results.addTotalGatePoles(1);
            }
            isTogether = true;
          }
        }
      }
    });

    if (!isSegment && !onlyServices && item.bindings === "Taip")
      results.addBindingsLength(lastBindingHeight, item.color);
  });
  results.addFences(fenceTemp);

  generateResults();
}
