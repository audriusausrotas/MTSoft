import type { Measure, Calculations, Fence } from "~/data/interfaces";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  createInitialMeasure,
  fenceMeasures,
  clientInitialValue,
} from "~/data/initialValues";
import { pramatomumas, verticals, fenceTypes } from "~/data/selectFieldData";

export const useCalculationsStore = defineStore("calculations", {
  state: (): Calculations => ({
    client: { ...clientInitialValue },
    fences: [],
  }),

  actions: {
    addFence(): void {
      const initialFence: Fence = {
        id: uuidv4(),
        side: "Priekis",
        type: "Daimond 60/90",
        color: "7016",
        material: "Matinė",
        seeThrough: "Nepramatoma",
        direction: "Horizontali",
        services: "Medžiagos, Montavimas",
        parts: "Borteliai, Stulpai",
        twoSided: "Ne",
        aditional: "",
        bindings: "Taip",
        anchoredPoles: "Ne",
        space: 2,
        elements: 0,
        totalLength: 0,
        totalQuantity: 0,
        startBinding: "Elka",
        endBinding: "Elka",
        measures: [createInitialMeasure()],
      };

      this.fences.push(initialFence);
    },

    clearAll() {
      this.client = { ...clientInitialValue };
      this.fences = [];
    },

    addMeasure(index: number): void {
      this.fences[index].measures.push(createInitialMeasure());
    },

    addKampas(index: number): void {
      const kampas: Measure = {
        ...createInitialMeasure(),
        kampas: {
          exist: true,
          value: 90,
          aditional: "",
        },
      };
      this.fences[index].measures.push(kampas);
    },

    addLaiptas(index: number): void {
      const laiptas: Measure = {
        ...createInitialMeasure(),
        laiptas: {
          exist: true,
          value: 0,
          direction: "Aukštyn",
        },
      };
      this.fences[index].measures.push(laiptas);
    },

    updateClientAddress(data: string): void {
      this.client.address = data;
    },

    updateClientUsername(data: string): void {
      this.client.username = data;
    },

    updateClientPhone(data: string): void {
      this.client.phone = data;
    },

    updateClientEmail(data: string): void {
      this.client.email = data;
    },

    updateSide(index: number, value: string): void {
      this.fences[index].side = value;
    },

    updateType(index: number, value: string): void {
      this.fences[index].type = value;
      this.calculateAllElements(index);
    },

    updateColor(index: number, value: string): void {
      this.fences[index].color = value;
    },

    updateMaterial(index: number, value: string): void {
      this.fences[index].material = value;
    },

    updateSeeThrough(index: number, value: string): void {
      this.fences[index].seeThrough = value;
      this.calculateAllElements(index);
    },

    updateDirection(index: number, value: string): void {
      this.fences[index].direction = value;
    },

    updateServices(index: number, value: string): void {
      this.fences[index].services = value;
    },

    updateBindings(index: number, value: string): void {
      this.fences[index].bindings = value;
    },

    updateGateType(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.type = value;
      if (value === "Segmentiniai") {
        this.fences[index].measures[measureIndex].gates.option = value;
      } else {
        this.fences[index].measures[measureIndex].gates.option = value;
      }
    },
    updateBankette(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.bankette = value;
    },

    updateGateDirection(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].gates.direction = value;
    },

    updateGateLock(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.lock = value;
    },

    updateGateOption(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.option = value;
    },

    updateAutomatics(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.automatics = value;
    },

    updateParts(index: number, value: string): void {
      this.fences[index].parts = value;
    },

    updateSpace(index: number, value: number): void {
      this.fences[index].space = +value;
      this.calculateAllElements(index);
    },

    updateMeasureGate(
      index: number,
      value: boolean,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].gates.exist = value;
    },

    updateTwoSided(index: number, value: string): void {
      this.fences[index].twoSided = value;
      this.calculateAllElements(index);
    },

    updateGateAditional(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].gates.aditional = value;
    },

    updateAditional(index: number, value: string): void {
      this.fences[index].aditional = value;
    },

    updateAnchoredPoles(index: number, value: string): void {
      this.fences[index].anchoredPoles = value;
    },

    updateMeasureKampas(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].kampas.value = +value;
    },

    updateMeasureKampasAditional(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].kampas.aditional = value;
    },

    updateMeasureLaiptas(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].laiptas.value = +value;
    },

    updateMeasureLaiptasDirection(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].laiptas.direction = value;
    },

    updateTotalLength(index: number, value: number): void {
      this.fences[index].totalLength = +value.toFixed(2);
    },

    updateTotalQuantity(index: number, value: number): void {
      this.fences[index].totalQuantity = +value.toFixed(2);
    },

    oneHeight(index: number, height: number) {
      this.fences[index].measures.forEach((item, i) => {
        item.height = height;
        this.calculateElements(index, i);
      });
    },

    copyLast(index: number): void {
      const lastElementIndex = this.fences[index].measures.length - 1;
      const lastElement = this.fences[index].measures[lastElementIndex];

      this.addMeasure(index);
      this.updateMeasureLength(index, lastElementIndex + 1, lastElement.length);
      this.updateMeasureHeight(index, lastElementIndex + 1, lastElement.height);
    },

    clearFields(): void {
      this.client = { ...clientInitialValue };
      this.fences;
    },

    deleteMeasure(index: number, measureIndex: number): void {
      this.fences[index].measures = this.fences[index].measures.filter(
        (measure, index) => index !== measureIndex
      );
    },

    deleteMeasures(index: number): void {
      this.fences[index].measures = [createInitialMeasure()];
    },

    deleteFence(id: string): void {
      this.fences = this.fences.filter((fence) => fence.id !== id);
    },

    updateMeasureHeight(
      index: number,
      measureIndex: number,
      value: number
    ): void {
      this.fences[index].measures[measureIndex].height = +value;
      this.calculateElements(index, measureIndex);
    },

    updateMeasureLength(
      index: number,
      measureIndex: number,
      value: number
    ): void {
      this.fences[index].measures[measureIndex].length = +value;
      this.calculateElements(index, measureIndex);
    },

    calculateAllElements(index: number) {
      this.fences[index].measures.forEach((measure, measureIndex) =>
        this.calculateElements(index, measureIndex)
      );
    },

    calculateElements(index: number, measureIndex: number) {
      const fence = this.fences[index];
      const measure = fence.measures[measureIndex];
      const isFenceBoards = verticals.includes(fence.type);
      const seeThroughIndex = pramatomumas.indexOf(fence.seeThrough);
      const fenceDataIndex = fenceMeasures.findIndex(
        (element) => element.name === fence.type
      );
      let elements = 0;
      if (isFenceBoards) {
        elements = calculateFenceBoards(
          measure.length,
          fence.space,
          fenceMeasures[fenceDataIndex].height,
          fence.twoSided
        );
        this.fences[index].elements += elements;
      } else {
        if (measure.height) {
          elements =
            (measure.height - 1) /
            (fenceMeasures[fenceDataIndex].seeThrough[seeThroughIndex] +
              fenceMeasures[fenceDataIndex].height);
        }
      }
      measure.elements = Math.round(elements);
    },
    setProject(project: any) {
      this.fences = [...project.fenceMeasures];
      this.client = { ...project.client };
    },

    lazerCalculate(text: string) {
      const tempArr = text.replace(/\n/g, " ");
      const splitArr = tempArr.split(" ");

      const formatNumbers = (nr: string) => {
        let temp = nr.replace(".", "");
        if (temp.length > 3) {
          temp = temp.slice(0, -1) + "." + temp.slice(-1);
        }
        return temp;
      };

      const capitalize = (string: string) => {
        const words = string.split(" ");
        const capitalizedWords = words.map((word) => {
          const firstLetter = word.charAt(0).toUpperCase();
          const restOfWord = word.slice(1);
          return firstLetter + restOfWord;
        });
        return capitalizedWords.join(" ");
      };

      splitArr.forEach((item) => {
        item = item.toLowerCase();

        if (item === "m") return;

        // email
        if (item.includes("@")) {
          this.updateClientEmail(item);
        }

        // phone
        else if (item.startsWith("tel.")) {
          const temp = item.replace("tel.", "");
          this.updateClientPhone(temp);
        }

        // address
        else if (item.startsWith("ad.")) {
          const temp = item.replace("ad.", "").replace(",", " ");
          this.updateClientAddress(capitalize(temp));

          // client
        } else if (item.startsWith("kl.")) {
          const temp = item.replace("kl.", "").replace(",", " ");
          this.updateClientUsername(capitalize(temp));

          // create front fence
        } else if (item === "p" || item === "priekis") {
          this.addFence();
          this.updateSide(this.fences.length - 1, "Priekis");

          // create left fence
        } else if (item === "k" || item === "kaire" || item === "kairė") {
          this.addFence();
          this.updateSide(this.fences.length - 1, "Kairė");

          // create right fence
        } else if (
          item === "d" ||
          item === "desine" ||
          item === "dešinė" ||
          item === "desinė" ||
          item === "dešine"
        ) {
          this.addFence();
          this.updateSide(this.fences.length - 1, "Dešinė");

          // create back fence
        } else if (item === "g" || item === "galas") {
          this.addFence();
          this.updateSide(this.fences.length - 1, "Galas");

          // total fence height
        } else if (item.startsWith("ba")) {
          const temp = item.replace("ba", "");
          const formated = formatNumbers(temp);
          this.oneHeight(this.fences.length - 1, +formated);

          // fence color
        } else if (item.startsWith("ral.")) {
          let temp = item.replace("ral.", "");
          this.updateColor(this.fences.length - 1, temp);

          // fence type
        } else if (item.startsWith("tt.")) {
          const temp = item.replace("tt.", "");
          let found = "Nerasta";
          if (fenceTypes.includes(capitalize(temp))) {
            found = capitalize(temp);
          } else {
            if (temp === "60x90") found = "Daimond 60/90";
            else if (temp === "60x90v") found = "Daimond 60/90 Vertical";
            else if (temp === "40x105") found = "Daimond 40/105";
            else if (temp === "60x120") found = "Daimond 60/120";
            else if (temp === "zaliuzi") found = "Žaliuzi";
            else if (temp === "egle") found = "Eglė";
            else if (temp === "dile") found = "Dilė";
          }
          this.updateType(this.fences.length - 1, found);

          // fence seethrough
        } else if (item.startsWith("pr.")) {
          const temp = item.replace("pr.", "");
          let found = "Nerasta";
          pramatomumas.forEach((type) => {
            if (type.toLowerCase() === temp) found === type;
            else {
              if (temp === "vidutiniska") found = "Vidutiniška";
              else if (temp === "25") found = "25% Pramatomumas";
              else if (temp === "50") found = "50% pramatomumas";
              else found = temp;
            }
          });
          this.updateSeeThrough(this.fences.length - 1, found);

          // bindings
        } else if (item.startsWith("apk.")) {
          const temp = item.replace("apk.", "");
          let found = "Nerasta";
          if (temp === "taip") found = "Taip";
          else if (temp === "ne") found = "Ne";
          this.updateBindings(this.fences.length - 1, found);

          // fence direction
        } else if (item === "horizontali") {
          this.updateDirection(this.fences.length - 1, "Horizontali");
        } else if (item === "vertikali") {
          this.updateDirection(this.fences.length - 1, "Vertikali");

          // anchored poles
        } else if (item === "ankeriuojami") {
          this.updateAnchoredPoles(this.fences.length - 1, "Taip");
          this.updateParts(this.fences.length - 1, "Tik Stulpai");

          // parts
        } else if (item === "stulpai") {
          this.updateParts(this.fences.length - 1, "Tik Stulpai");
        } else if (item === "borteliai") {
          this.updateParts(this.fences.length - 1, "Tik Borteliai");
        } else if (item === "tvora") {
          this.updateParts(this.fences.length - 1, "Be Bortelių Ir Stulpų");

          // services
        } else if (item === "darbai") {
          this.updateServices(this.fences.length - 1, "Tik Montavimas");
        } else if (item === "medziagos" || item === "medžiagos") {
          this.updateServices(this.fences.length - 1, "Tik Medžiagos");

          // two sided
        } else if (item === "dvipuse" || item === "dvipusė") {
          this.updateTwoSided(this.fences.length - 1, "Taip");

          // space between elements
        } else if (item.startsWith("tarpas.")) {
          const temp = item.replace("tarpas.", "");
          this.updateSpace(this.fences.length - 1, +temp);

          // corner
        } else if (item.startsWith("k.")) {
          const temp = item.replace("k.", "");
          const lastIndex = this.fences.length - 1;
          this.addKampas(lastIndex);
          this.updateMeasureKampas(
            lastIndex,
            temp,
            this.fences[lastIndex].measures.length - 1
          );

          // step
        } else if (item.startsWith("la.") || item.startsWith("lz.")) {
          const lastIndex = this.fences.length - 1;
          let measure = "";
          let direction = "";

          if (item.startsWith("la.")) {
            measure = item.replace("la.", "");
            direction = "Aukštyn";
          } else {
            measure = item.replace("lz.", "");
            direction = "Žemyn";
          }

          this.addLaiptas(lastIndex);
          this.updateMeasureLaiptas(
            lastIndex,
            measure,
            this.fences[lastIndex].measures.length - 1
          );
          this.updateMeasureLaiptasDirection(
            lastIndex,
            direction,
            this.fences[lastIndex].measures.length - 1
          );

          // handle gates
        } else if (item.startsWith("v.")) {
          const temp = item.replace("v.", "");
          const lastIndex = this.fences.length - 1;
          this.addMeasure(lastIndex);
          const lastMeasure = this.fences[lastIndex].measures.length - 1;
          this.updateMeasureLength(lastIndex, lastMeasure, +temp);
          // nebaigta
        }
      });
    },
  },

  getters: {},
});
