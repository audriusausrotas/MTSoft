import { useResultsStore } from "~/store/results";
import { verticals } from "~/data/selectFieldData";
import type { Gate, Poles } from "~/data/interfaces";

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

  fences.fences.forEach((item) => {
    const hasCrossbars: boolean = verticals.some(
      (vertical) => vertical === item.type
    );
    let polesTemp2: number = 1;

    console.log(item);

    item.measures.forEach((measure) => {
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
        // calculate crossbars
        if (hasCrossbars) {
          crossbarsTemp = +2;
        }
        // calculate borders
        results.addBorders();

        // add poles to temp data
      }
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
      console.log(polesTemp2);
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
    });
  });

  results.addPoles(polesTemp);
  results.addGatePoles(gatePolesTemp);
  results.addCrossbars(crossbarsTemp);
  results.addGates(gatesTemp);

  console.log(results);
}
