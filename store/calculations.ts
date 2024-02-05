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

    updateSide(data: { index: number; value: string }): void {
      this.fences[data.index].side = data.value;
    },

    updateType(data: { index: number; value: string }): void {
      this.fences[data.index].type = data.value;
      this.calculateAllElements(data.index);
    },

    updateColor(data: { index: number; value: string }): void {
      this.fences[data.index].color = data.value;
    },

    updateMaterial(data: { index: number; value: string }): void {
      this.fences[data.index].material = data.value;
    },

    updateSeeThrough(data: { index: number; value: string }): void {
      this.fences[data.index].seeThrough = data.value;
      this.calculateAllElements(data.index);
    },

    updateDirection(data: { index: number; value: string }): void {
      this.fences[data.index].direction = data.value;
    },

    updateServices(data: { index: number; value: string }): void {
      this.fences[data.index].services = data.value;
    },

    updateGateType(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.type =
        data.value;
    },

    updateGateDirection(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.direction =
        data.value;
    },

    updateGateLock(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.lock =
        data.value;
    },

    updateAutomatics(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.automatics =
        data.value;
    },

    updateParts(data: { index: number; value: string }): void {
      this.fences[data.index].parts = data.value;
    },

    updateMeasureSpace(data: { index: number; value: number }): void {
      this.fences[data.index].space = data.value;
      this.calculateAllElements(data.index);
    },

    updateMeasureGate(data: {
      index: number;
      measureIndex: number;
      value: boolean;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.exist =
        data.value;
    },

    updateTwoSided(data: { index: number; value: string }): void {
      this.fences[data.index].twoSided = data.value;
      this.calculateAllElements(data.index);
    },

    updateGateAditional(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates.aditional =
        data.value;
    },

    updateAditional(data: { index: number; value: string }): void {
      this.fences[data.index].aditional = data.value;
    },

    updateMeasureKampas(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].kampas.value =
        data.value;
    },

    updateMeasureLaiptas(data: {
      index: number;
      measureIndex: number;
      value: string;
    }): void {
      this.fences[data.index].measures[data.measureIndex].laiptas.value =
        data.value;
    },

    updateTotalLength(data: { index: number; value: number }): void {
      this.fences[data.index].totalLength = data.value;
    },

    updateTotalQuantity(data: { index: number; value: number }): void {
      this.fences[data.index].totalQuantity = data.value;
    },

    oneHeight(index: number, height: number) {
      this.fences[index].measures.forEach((item, i) => {
        item.height = height;
        this.calculateElements(index, i);
      });
    },

    copyLast(index: number): void {
      const elementIndex = this.fences[index].measures.length - 1;
      const element = this.fences[index].measures[elementIndex];
      this.fences[index].measures.push({ ...element });
    },

    clearFields(): void {
      this.client = { ...clientInitialValue };
      this.fences;
    },

    deleteMeasure(data: { index: number; measureIndex: number }): void {
      this.fences[data.index].measures = this.fences[
        data.index
      ].measures.filter((measure, index) => index !== data.measureIndex);
    },

    deleteMeasures(index: number): void {
      this.fences[index].measures = [createInitialMeasure()];
    },

    deleteFence(id: string): void {
      this.fences = this.fences.filter((fence) => fence.id !== id);
    },

    updateMeasureHeight(data: {
      index: number;
      measureIndex: number;
      value: number;
    }): void {
      this.fences[data.index].measures[data.measureIndex].height = data.value;
      this.calculateElements(data.index, data.measureIndex);
    },

    updateMeasureLength(data: {
      index: number;
      measureIndex: number;
      value: number;
    }): void {
      this.fences[data.index].measures[data.measureIndex].length = data.value;
      this.calculateElements(data.index, data.measureIndex);
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
      measure.elements = elements;
    },
  },

  getters: {},
});
