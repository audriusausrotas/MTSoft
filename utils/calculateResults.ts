import { useResultsStore } from "~/store/results";
import { verticals } from "~/data/selectFieldData";
import type { Gate, Poles, Fences } from "~/data/interfaces";
import calculateHorizontalFence from "./calculateHorizontalFence";
import calculateVerticalFence from "./calculateverticalFence";

export default function calculateResults() {
  const results = useResultsStore();
  const fences = useCalculationsStore();

  results.clearResults();
  results.clearParts();

  let isTogether: boolean = false;
  let polesTemp: Poles[] = [];
  let gatePolesTemp: number = 0;
  let crossbarsTemp: number = 0;
  let gatesTemp: Gate[] = [];
  let totalHeight: number = 0;
  let fenceTemp: Fences[] = [];
  let totalElements: number = 0;

  fences.fences.forEach((item) => {
    const hasCrossbars: boolean =
      verticals.some((vertical) => vertical === item.type) &&
      item.direction === "Vertikali";
    let polesTemp2: number = 1;

    console.log(item);

    // calculate fences
    if (hasCrossbars) {
      calculateVerticalFence();
    } else {
      const temp = calculateHorizontalFence(fenceTemp, item);
      fenceTemp = [...temp];
    }

    item.measures.forEach((measure) => {
      // calculate fence elements
      totalElements += measure.elements;

      // calculate gates
      if (measure.gates) {
        gatesTemp.push({
          client: fences.client.username,
          phone: fences.client.phone,
          address: fences.client.address,
          type: measure.length! > 2 ? "stumdomi" : "varteliai",
          auto: true,
          width: measure.length!,
          height: measure.height || 0,
          color: item.color,
          filling: item.type,
          ready: false,
          aditional: [],
        });

        // calculate poles
        if (!isTogether) {
          polesTemp2--;
          gatePolesTemp += 2;
        } else {
          gatePolesTemp++;
        }
        isTogether = true;
      } else {
        polesTemp2++;
        isTogether = false;
      }

      // calculate borders, crossbars
      if (!measure.gates && !measure.kampas.exist && !measure.laiptas.exist) {
        // calculate total height
        totalHeight += measure.height || 0;

        // calculate crossbars
        if (hasCrossbars) {
          crossbarsTemp += 2;
        }
        // calculate borders
        results.addBorders();

        // calculate segment
        if (item.type.includes("Segmentas")) {
          results.addSegment();
        }
      }

      // add poles to temp data
      const poleData: Poles = {
        height: 0,
        thickness: 0,
        color: item.color,
        quantity: polesTemp2,
      };

      if (item.type.includes("segmentas")) {
        poleData.height = 2.6;
        poleData.thickness = 1.3;
      } else {
        poleData.height = 3;
        poleData.thickness = 2;
      }

      let notExist: boolean = true;

      polesTemp.forEach((pole) => {
        if (
          pole.height === poleData.height &&
          pole.thickness === poleData.thickness &&
          pole.color === poleData.color
        ) {
          pole.quantity += poleData.quantity;
          notExist = false;
        }
      });

      if (notExist) polesTemp.push(poleData);

      //calculate crossbar holders
      if (item.type.includes("Segmentas")) {
        const poleCount = polesTemp.length + gatePolesTemp;
        const averageHeight = totalHeight / item.measures.length;
        const holdersOnPole =
          averageHeight < 130 ? 2 : averageHeight < 170 ? 3 : 4;
        results.addSegmentHolders(poleCount * holdersOnPole);
      }
    });
  });
  results.addFences(fenceTemp);
  results.addPoles(polesTemp);
  results.addGatePoles(gatePolesTemp);
  results.addCrossbars(crossbarsTemp);
  results.addGates(gatesTemp);
  results.addTotalElements(totalElements);

  console.log(results);
}
