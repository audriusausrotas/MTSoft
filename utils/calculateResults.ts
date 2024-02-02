import { useResultsStore } from "~/store/results";
import { verticals } from "~/data/selectFieldData";
import type { Fences, OtherParts } from "~/data/interfaces";
import calculateHorizontalFence from "~/utils/calculateHorizontalFence";
import calculateVerticalFence from "~/utils/calculateVerticalFence";
import generateResults from "~/utils/generateResults";

export default function calculateResults() {
  const results = useResultsStore();
  const fences = useCalculationsStore();

  results.clearResults();
  results.clearParts();

  let fenceTemp: Fences[] = [];

  fences.fences.forEach((item, index) => {
    // checks if crossbars needed
    const hasCrossbars: boolean = verticals.some(
      (vertical) => vertical === item.type
    );
    const isSegment: boolean = item.type.includes("Segmentas");
    const polesNeeded: boolean =
      item.services !== "Tik Montavimas" &&
      item.parts !== "Tik Borteliai" &&
      item.parts !== "Be Bortelių Ir Stulpų";

    const bordersNeeded: boolean =
      item.services !== "Tik Montavimas" &&
      item.parts !== "Tik Stulpai" &&
      item.parts !== "Be Bortelių Ir Stulpų";

    // calculate horizontal fence by suare meters
    if (!hasCrossbars && !isSegment) {
      const temp = calculateHorizontalFence(fenceTemp, item);
      fenceTemp = [...temp];
    }

    let isTogether: boolean = false;
    let lastBindingHeight = 0;

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
        fenceTemp = [...temp];
      }

      // calculate horizontal fence board fence
      if (hasCrossbars && item.direction === "Horizontali" && !isSegment) {
        // const temp = calculateVerticalFence(item, measure, fenceTemp);
        // fenceTemp = [...temp];
      }

      // calculate total elements
      if (!isSegment) {
        results.addTotalElements(measure.elements, item.color);

        // calculate bindings
        if (item.direction === "Horizontali") {
          results.addBindingsLength(measure.height, item.color);
          lastBindingHeight = measure.height;
        }
      }

      // calculate borders, crossbars
      if (isFence) {
        // calculate crossbars
        if (hasCrossbars && !isSegment) {
          results.addCrossbars(item.color);
        }
        // calculate borders
        if (bordersNeeded) {
          results.addBorders(item.color);
        }

        // calculate segment
        if (isSegment) {
          results.addSegment(measure.height, item.color);
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

        if (!measure.gates.exist) {
          results.addPoles(item.color, poleHeight);
          isTogether = false;
        } else {
          if (!isTogether) {
            results.removePole(item.color);
            results.addGatePoles(item.color, 2);
          } else {
            results.addGatePoles(item.color, 1);
          }
          isTogether = true;
        }
      }
    });
    if (!isSegment) {
      results.addBindingsLength(lastBindingHeight, item.color);
    }

    /////////////  skaiciuot darbus jei reikalingi
  });
  results.addFences(fenceTemp);

  generateResults();
}
