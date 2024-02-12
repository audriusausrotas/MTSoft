import type { Measure, Calculations, Fence } from "~/data/interfaces";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  createInitialMeasure,
  fenceMeasures,
  clientInitialValue,
} from "~/data/initialValues";
import { pramatomumas, verticals } from "~/data/selectFieldData";

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
          value: "",
        },
      };
      this.fences[index].measures.push(kampas);
    },

    addLaiptas(index: number): void {
      const laiptas: Measure = {
        ...createInitialMeasure(),
        laiptas: {
          exist: true,
          value: "",
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
      this.fences[index].measures[measureIndex].kampas.value = value;
    },

    updateMeasureLaiptas(
      index: number,
      value: string,
      measureIndex: number
    ): void {
      this.fences[index].measures[measureIndex].laiptas.value = value;
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
      } else {
        if (measure.height) {
          elements =
            (measure.height - 1) /
            (fenceMeasures[fenceDataIndex].seeThrough[seeThroughIndex] +
              fenceMeasures[fenceDataIndex].height);
        }
      }
      measure.elements = +elements.toFixed(1);
    },
    setProject(project: any) {
      this.fences = [...project.fenceMeasures];
      this.client = { ...project.client };
    },
  },

  getters: {},
});
