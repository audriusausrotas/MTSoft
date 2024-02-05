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

  let totalPoles = 0;
  let totalGatePoles = 0;
  let totalBorders = 0;
  let totalCrossbars = 0;
  let totalElements = 0;
  let totalSegments = 0;

  fences.fences.forEach((item) => {
    // checks if crossbars needed
    const hasCrossbars: boolean = verticals.some(
      (vertical) => vertical === item.type
    );

    const onlyParts = item.services === "Tik Medžiagos";
    const onlyServices = item.services === "Tik Medžiagos";
    const isSegment: boolean = item.type.includes("Segmentas");

    const polesNeeded: boolean =
      item.parts !== "Tik Borteliai" && item.parts !== "Be Bortelių Ir Stulpų";

    const bordersNeeded: boolean =
      item.parts !== "Tik Stulpai" && item.parts !== "Be Bortelių Ir Stulpų";

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
        totalElements += measure.elements;

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
          if (!onlyServices) results.addCrossbars(item.color);
          if (!onlyParts) totalCrossbars += 2;
        }
        // calculate borders
        if (bordersNeeded) {
          if (!onlyServices) results.addBorders(item.color);
          if (!onlyParts) totalBorders++;
        }

        // calculate segment
        if (isSegment) {
          if (!onlyServices) results.addSegment(measure.height, item.color);
          if (!onlyParts) totalSegments++;
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
          if (!onlyServices) results.addPoles(item.color, poleHeight);
          if (totalPoles === 0 && !onlyParts) totalPoles++;
          if (!onlyParts) totalPoles++;

          isTogether = false;
        } else {
          if (!isTogether) {
            if (!onlyServices) results.removePole(item.color);
            if (!onlyServices) results.addGatePoles(item.color, 2);
            if (!onlyParts) totalPoles--;
            if (!onlyParts) totalGatePoles += 2;
          } else {
            if (!onlyServices) results.addGatePoles(item.color, 1);
            if (!onlyParts) totalGatePoles++;
          }
          isTogether = true;
        }
      }
    });
    if (!isSegment) {
      results.addBindingsLength(lastBindingHeight, item.color);
    }

    // calculate works
    if (!onlyParts) {
      if (totalPoles > 0) {
        createWorkElement({
          name: defaultValues.polesWork,
          quantity: totalPoles,
        });
      }
      if (totalGatePoles > 0) {
        createWorkElement({
          name: defaultValues.gatesPoleWork,
          quantity: totalGatePoles,
        });
      }
      if (totalBorders > 0) {
        createWorkElement({
          name: defaultValues.bordersWork,
          quantity: totalBorders,
        });
      }
      if (totalCrossbars > 0) {
        createWorkElement({
          name: defaultValues.crossbarWork,
          quantity: totalCrossbars,
        });
      }
      if (totalSegments > 0) {
        createWorkElement({
          name: defaultValues.segmentWork,
          quantity: totalSegments,
        });
      }
    }
  });
  results.addFences(fenceTemp);

  generateResults();
}
