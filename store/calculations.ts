import type { Measure, Calculations, Fence } from "~/data/interfaces";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { createInitialMeasure, clientInitialValue } from "~/data/initialValues";
import { pramatomumas } from "~/data/selectFieldData";
import calculateFenceBoards from "~/utils/calculations/calculateFenceBoards";

export const useCalculationsStore = defineStore("calculations", {
  state: (): Calculations => ({
    client: { ...clientInitialValue },
    fences: [],
    retail: true,
    units: true,
  }),

  actions: {
    addFence(): void {
      const initialFence: Fence = {
        id: uuidv4(),
        side: "Priekis",
        name: "Daimond 60/90",
        color: "7016",
        material: "Matinė",
        manufacturer: "Arcelor",
        seeThrough: "Nepramatoma",
        direction: "Horizontali",
        services: "Medžiagos, Montavimas",
        parts: "Borteliai, Stulpai",
        twoSided: "Ne",
        comment: "",
        bindings: "Taip",
        holes: "Taip",
        anchoredPoles: "Ne",
        space: 2,
        elements: 0,
        totalLength: 0,
        totalQuantity: 0,
        measures: [],
        fenceboards: false,
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
          comment: "",
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

    updateRetail(value: boolean) {
      this.retail = value;
    },

    updateUnits(value: boolean) {
      this.units = value;
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
      this.fences[index].name = value;
      this.calculateAllElements(index);
    },

    updateColor(index: number, value: string): void {
      this.fences[index].color = value;
    },

    updateMaterial(index: number, value: string): void {
      this.fences[index].material = value;
    },

    updateManufacturer(index: number, value: string): void {
      this.fences[index].manufacturer = value;
    },

    updateSeeThrough(index: number, value: string): void {
      this.fences[index].seeThrough = value;
      this.calculateAllElements(index);
    },

    updateDirection(index: number, value: string): void {
      this.fences[index].direction = value;
      this.calculateAllElements(index);
    },

    updateServices(index: number, value: string): void {
      this.fences[index].services = value;
    },

    updateBindings(index: number, value: string): void {
      this.fences[index].bindings = value;
    },

    updateGateType(index: number, value: string, measureIndex: number): void {
      this.fences[index].measures[measureIndex].gates.name = value;
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

    updateGateComment(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].gates.comment = value;
    },

    updateComment(index: number, value: string): void {
      this.fences[index].comment = value;
    },

    updateAnchoredPoles(index: number, value: string): void {
      this.fences[index].anchoredPoles = value;
    },

    updateHoles(index: number, value: string): void {
      this.fences[index].holes = value;
    },

    updateMeasureKampas(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].kampas.value = +value;
    },

    updateMeasureKampasComment(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].kampas.comment = value;
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

    updateFenceTotals(index: number) {
      let totalM: number = 0;
      let totalQuantity: number = 0;
      this.fences[index].measures.forEach((item: Measure) => {
        if (!item.length) return;
        totalM += +item.length;
        if (item.height) totalQuantity += item.length! * item.height!;
      });
      this.updateTotalLength(index, totalM / 100);
      this.updateTotalQuantity(index, totalQuantity / 10000);
    },

    oneHeight(index: number, height: number) {
      this.fences[index].measures.forEach((item, i) => {
        item.height = height;
        this.calculateElements(index, i);
      });
      this.updateFenceTotals(index);
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
      this.retail = false;
    },

    deleteMeasure(index: number, measureIndex: number): void {
      this.fences[index].measures = this.fences[index].measures.filter(
        (measure, index) => index !== measureIndex
      );
      this.updateFenceTotals(index);
    },

    deleteMeasures(index: number): void {
      this.fences[index].measures = [createInitialMeasure()];
      this.updateFenceTotals(index);
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
      this.updateFenceTotals(index);
    },

    updateMeasureLength(
      index: number,
      measureIndex: number,
      value: number
    ): void {
      this.fences[index].measures[measureIndex].length = +value;
      this.calculateElements(index, measureIndex);
      this.updateFenceTotals(index);
    },

    updateMeasureElements(
      index: number,
      measureIndex: number,
      value: number
    ): void {
      this.fences[index].measures[measureIndex].elements = +value;
    },

    calculateAllElements(index: number) {
      this.fences[index].measures.forEach((measure, measureIndex) =>
        this.calculateElements(index, measureIndex)
      );
    },

    calculateElements(index: number, measureIndex: number) {
      const fence = this.fences[index];
      const measure = fence.measures[measureIndex];

      const fenceData = useSettingsStore().fences.find(
        (item) =>
          item.name.trim().toLowerCase() === fence.name.trim().toLowerCase()
      );

      if (!fenceData || fenceData?.category === "Segmentas") return;
      const isFenceBoards = fenceData.category === "Tvoralentė";

      let elements = 0;

      if (isFenceBoards) {
        elements = calculateFenceBoards(
          fence.direction === "Vertikali" ? measure.length : measure.height,
          fence.space,
          fenceData.details.width,
          fence.twoSided
        );
      } else {
        const fenceRename = fence.seeThrough
          .replace("š", "s")
          .replace("25% Pramatomumas", "pramatoma25")
          .replace("50% Pramatomumas", "pramatoma50")
          .toLowerCase() as keyof typeof fenceData.steps;

        const seeThroughStep =
          fenceRename in fenceData.steps ? fenceData.steps[fenceRename] : null;

        if (
          measure.height &&
          this.fences[index].direction === "Horizontali" &&
          seeThroughStep
        ) {
          elements = measure.height / seeThroughStep;
        } else if (
          measure.length &&
          this.fences[index].direction === "Vertikali" &&
          seeThroughStep
        ) {
          elements = measure.length / seeThroughStep;
        }
      }
      this.fences[index].measures[measureIndex].elements = Math.round(elements);
      this.fences[index].elements += Math.round(elements);
    },

    setProject(project: any) {
      this.fences = [...project.fenceMeasures];
      this.client = { ...project.client };
      this.retail = project.retail;
    },

    calculatefromTotalLength(index: number, totalLength: number) {
      const totalMeasures: number[] = [];
      if (+totalLength > 0) {
        const measures = Math.floor(+totalLength / 250);
        const modula = +totalLength % 250;
        for (let i = 0; i < measures; i++) {
          totalMeasures.push(250);
        }
        if (modula > 0) totalMeasures.push(modula);
      } else return;

      const checkCalculations = (): void => {
        const lastElement = totalMeasures.length - 1;
        const isShort = totalMeasures.some((item) => item === 250);
        if (totalMeasures[lastElement] < 200 && isShort) {
          totalMeasures[lastElement] += 50;
          for (let i = lastElement - 1; i >= 0; i--) {
            if (totalMeasures[i] === 250) {
              totalMeasures[i] -= 50;
              break;
            }
          }
          if (totalMeasures[lastElement] < 200 && isShort) checkCalculations();
        }
      };
      checkCalculations();

      totalMeasures.forEach((item) => {
        let lastElement: Measure =
          this.fences[index].measures[this.fences[index].measures.length - 1];

        if (!lastElement) {
          this.addMeasure(index);
          lastElement = this.fences[index].measures[0];
        }

        if (
          lastElement.length !== 0 ||
          lastElement.kampas.exist ||
          lastElement.laiptas.exist
        ) {
          this.addMeasure(index);
        }
        this.updateMeasureLength(
          index,
          this.fences[index].measures.length - 1,
          item
        );
      });
    },

    //   calculation from Bosh lazer app
    lazerCalculate(text: string, units: string, precision: string) {
      const settingsStore = useSettingsStore();
      const tempArr: string = text.replace(/\n/g, " ");
      const splitArr: string[] = tempArr.split(" ");
      const unit = units === "Metrai" ? 100 : units === "Milimetrai" ? 0.1 : 1;

      let lastHeight: number = 0;

      const formatHeight = (number: string): number =>
        +number.replace(",", ".") * unit;

      const formatLength = (number: string): number => {
        const value = +number.replace(",", ".") * unit;

        if (precision === "Žemyn") {
          return Math.floor(value);
        } else if (precision === "Standartas") {
          return Math.round(value);
        } else if (precision === "Andriaus") {
          if (value % 1 <= 0.6) {
            return Math.floor(value);
          } else {
            return Math.ceil(value);
          }
        }
        return value;
      };

      const checkFence = () => {
        if (this.fences.length - 1 < 0) this.addFence();
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
          let temp = item.replace("ad.", "");

          const makeSpace = (string: string) => {
            return string.replace(",", " ");
          };

          while (temp.includes(",")) {
            temp = makeSpace(temp);
          }

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
        } else if (item.startsWith("ba.")) {
          checkFence();
          const temp = item.replace("ba.", "");
          const formated = formatHeight(temp);
          lastHeight = formated;

          // fence color
        } else if (item.startsWith("ral.")) {
          let temp = item.replace("ral.", "");
          checkFence();
          this.updateColor(this.fences.length - 1, temp);

          // fence type
        } else if (item.startsWith("tt.")) {
          const temp = item.replace("tt.", "");
          checkFence();
          let found = "Nerasta";

          if (
            settingsStore.selectValues.fenceTypes.some(
              (item) => item === capitalize(temp)
            )
          ) {
            found = capitalize(temp);
          } else {
            if (temp === "60x90") found = "Daimond 60/90";
            else if (temp === "vertical") found = "Daimond Vertical";
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
          checkFence();
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
          checkFence();
          let found = "Nerasta";
          if (temp === "taip") found = "Taip";
          else if (temp === "ne") found = "Ne";
          this.updateBindings(this.fences.length - 1, found);

          // fence direction
        } else if (item === "horizontali") {
          checkFence();
          this.updateDirection(this.fences.length - 1, "Horizontali");
        } else if (item === "vertikali") {
          checkFence();
          this.updateDirection(this.fences.length - 1, "Vertikali");

          // anchored poles
        } else if (item === "ankeriuojami") {
          checkFence();
          this.updateAnchoredPoles(this.fences.length - 1, "Taip");
          this.updateParts(this.fences.length - 1, "Tik Stulpai");

          // parts
        } else if (item === "stulpai") {
          checkFence();
          this.updateParts(this.fences.length - 1, "Tik Stulpai");
        } else if (item === "borteliai") {
          checkFence();
          this.updateParts(this.fences.length - 1, "Tik Borteliai");
        } else if (item === "tvora") {
          checkFence();
          this.updateParts(this.fences.length - 1, "Be Bortelių Ir Stulpų");

          // services
        } else if (item === "darbai") {
          checkFence();
          this.updateServices(this.fences.length - 1, "Tik Montavimas");
        } else if (item === "medziagos" || item === "medžiagos") {
          checkFence();
          this.updateServices(this.fences.length - 1, "Tik Medžiagos");

          // two sided
        } else if (item === "dvipuse" || item === "dvipusė") {
          checkFence();
          this.updateTwoSided(this.fences.length - 1, "Taip");

          // space between elements
        } else if (item.startsWith("tarpas.")) {
          const temp = item.replace("tarpas.", "");
          checkFence();
          this.updateSpace(this.fences.length - 1, +temp);

          // corner
        } else if (item.startsWith("k.")) {
          const temp = item.replace("k.", "");
          checkFence();
          const lastIndex = this.fences.length - 1;
          this.addKampas(lastIndex);
          this.updateMeasureKampas(
            lastIndex,
            temp,
            this.fences[lastIndex].measures.length - 1
          );

          // step
        } else if (item.startsWith("la.") || item.startsWith("lz.")) {
          checkFence();
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
          checkFence();
          const lastIndex = this.fences.length - 1;
          this.addMeasure(lastIndex);

          const lastMeasure = this.fences[lastIndex].measures.length - 1;
          this.updateMeasureGate(lastIndex, true, lastMeasure);

          let temp = item.replace("v.", "");
          let auto = true;
          let bankette = true;
          let lock = false;
          let gateType = "Stumdomi";

          if (temp.includes("a")) {
            temp = temp.replace("a", "");
            auto = false;
          }
          if (temp.includes("b")) {
            temp = temp.replace("b", "");
            bankette = false;
          }
          if (temp.includes("e")) {
            temp = temp.replace("e", "");
            lock = true;
          }

          const numericPart = parseInt(temp.match(/\d+/)?.[0] || "0", 10);
          if (numericPart * unit < 200) {
            gateType = "Gaminami";
          }
          if (temp.includes("s")) {
            temp = temp.replace("s", "");
            gateType = "Segmentiniai";
          }
          if (temp.includes("v")) {
            temp = temp.replace("v", "");
            gateType = "Varstomi";
          }

          if (!auto) this.updateAutomatics(lastIndex, "Ne", lastMeasure);
          if (!bankette) this.updateBankette(lastIndex, "Ne", lastMeasure);
          if (lock)
            this.updateGateLock(lastIndex, "Elektromagnetinė", lastMeasure);
          this.updateMeasureLength(lastIndex, lastMeasure, formatLength(temp));
          this.updateMeasureHeight(lastIndex, lastMeasure, lastHeight);
          this.updateGateType(lastIndex, gateType, lastMeasure);

          //measure length
        } else if (/^[0-9]*\.?[0-9]+$/.test(item)) {
          checkFence();
          let lastIndex = this.fences.length - 1;

          this.addMeasure(lastIndex);

          this.updateMeasureLength(
            lastIndex,
            this.fences[lastIndex].measures.length - 1,
            formatLength(item)
          );
          this.updateMeasureHeight(
            lastIndex,
            this.fences[lastIndex].measures.length - 1,
            lastHeight
          );

          // measure height
        } else if (item.startsWith("a.")) {
          const temp = item.replace("a.", "");
          checkFence();
          const lastIndex = this.fences.length - 1;
          this.updateMeasureHeight(
            lastIndex,
            this.fences[lastIndex].measures.length - 1,
            formatHeight(temp)
          );

          // calculate from long length
        } else if (item.startsWith("i.")) {
          const temp = item.replace("i.", "");
          checkFence();
          this.calculatefromTotalLength(
            this.fences.length - 1,
            formatHeight(temp)
          );
          this.oneHeight(this.fences.length - 1, lastHeight);
        } else return;
      });
    },
  },

  getters: {},
});
