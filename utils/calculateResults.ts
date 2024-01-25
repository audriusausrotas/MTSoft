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

  let polesTemp: Poles[] = [];
  let gatePolesTemp: OtherParts[] = [];
  let fenceTemp: Fences[] = [];

  fences.fences.forEach((item, index) => {
    // checks if crossbars needed
    const hasCrossbars: boolean = verticals.some(
      (vertical) => vertical === item.type
    );
    const polesNeeded =
      item.services !== "Tik Montavimas" &&
      item.parts !== "Tik Borteliai" &&
      item.parts !== "Be Bortelių Ir Stulpų";

    const bordersNeeded =
      item.services !== "Tik Montavimas" &&
      item.parts !== "Tik Stulpai" &&
      item.parts !== "Be Bortelių Ir Stulpų";

    let polesTemp2: number = 1;

    // calculate horizontal fence by suare meters
    if (!hasCrossbars) {
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
      if (hasCrossbars && item.direction === "Vertikali") {
        const temp = calculateVerticalFence(item, measure, fenceTemp);
        fenceTemp = [...temp];
      }

      // calculate horizontal fence board fence
      if (hasCrossbars && item.direction === "Horizontali") {
        // const temp = calculateVerticalFence(item, measure, fenceTemp);
        // fenceTemp = [...temp];
      }

      // calculate total elements
      results.addTotalElements(measure.elements, item.color);

      // calculate bindings
      if (item.direction === "Horizontali") {
        results.addBindingsLength(measure.height, item.color);
        lastBindingHeight = measure.height;
      }

      // calculate borders, crossbars
      if (isFence) {
        // calculate crossbars
        if (hasCrossbars) {
          results.addCrossbars(item.color);
        }
        // calculate borders
        if (bordersNeeded) {
          results.addBorders(item.color);
        }

        // calculate segment
        if (item.type.includes("Segmentas")) {
          results.addSegment(measure.height, item.color);
        }
      }

      // calculate poles
      if (polesNeeded) {
        if (!measure.gates.exist) {
          polesTemp2++;
          isTogether = false;
        } else {
          if (!isTogether) {
            polesTemp2--;
            gatePolesTemp += 2;
          } else {
            gatePolesTemp++;
          }
          isTogether = true;
        }
      }

      // add poles to temp data
      const poleData: OtherParts = {
        height:
          item.type.includes("Segmentas") && measure.height < 150 ? 2.4 : 3,
        color: item.color,
        quantity: polesTemp2,
      };

      if (item.type.includes("segmentas")) {
        poleData.height = 2.4;
      } else {
        poleData.height = 3;
      }

      if (
        item.services !== "Tik Montavimas" &&
        item.parts !== "Tik Borteliai" &&
        item.parts !== "Be Bortelių Ir Stulpų"
      ) {
        let notExist: boolean = true;

        polesTemp.forEach((pole) => {
          if (
            pole.height === poleData.height &&
            pole.color === poleData.color
          ) {
            pole.quantity = poleData.quantity;
            notExist = false;
          }
        });
        if (notExist) polesTemp.push(poleData);
      }
    });
    results.addBindingsLength(lastBindingHeight, item.color);
  });
  results.addFences(fenceTemp);

  generateResults();
}
