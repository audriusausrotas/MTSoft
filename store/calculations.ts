import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  clientInitialValue,
  initialMeasure,
  initialFence,
} from "~/data/initialValues";
import type { Measure, Calculations } from "~/data/interfaces";

export const useCalculationsStore = defineStore("calculations", {
  state: (): Calculations => ({
    client: { ...clientInitialValue },
    fences: [],
  }),

  actions: {
    addFence(): void {
      const tempFence = {
        ...initialFence,
        id: uuidv4(),
        measures: [{ ...initialMeasure }],
      };
      this.fences.push(tempFence);
    },

    clearAll() {
      this.client = { ...clientInitialValue };
      this.fences = [];
    },

    addMeasure(index: number): void {
      this.fences[index].measures.push({ ...initialMeasure });
    },

    addKampas(index: number): void {
      const kampas: Measure = {
        ...initialMeasure,
        kampas: {
          exist: true,
          value: "",
        },
      };
      this.fences[index].measures.push(kampas);
    },

    addLaiptas(index: number): void {
      const laiptas: Measure = {
        ...initialMeasure,
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
    },

    updateColor(data: { index: number; value: string }): void {
      this.fences[data.index].color = data.value;
    },

    updateMaterial(data: { index: number; value: string }): void {
      this.fences[data.index].material = data.value;
    },

    updateSeeThrough(data: { index: number; value: string }): void {
      this.fences[data.index].seeThrough = data.value;
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
      this.fences[index].measures = [{ ...initialMeasure }];
    },

    deleteFence(id: string): void {
      this.fences = this.fences.filter((fence) => fence.id !== id);
    },

    calculateTotalElements(data: {
      index: number;
      measureIndex: number;
    }): void {
      const fence = this.fences[data.index];
      const height = fence.measures[data.measureIndex].height;
      const space = fence.space;
      const type = fence.type;
      const seeThrough = fence.seeThrough;

      if (height && space) {
      }
    },

    updateMeasureHeight(data: {
      index: number;
      measureIndex: number;
      value: number;
    }): void {
      this.fences[data.index].measures[data.measureIndex].height = data.value;

      this.calculateTotalElements({
        index: data.index,
        measureIndex: data.measureIndex,
      });
    },

    updateMeasureLength(data: {
      index: number;
      measureIndex: number;
      value: number;
    }): void {
      this.fences[data.index].measures[data.measureIndex].length = data.value;

      this.calculateTotalElements({
        index: data.index,
        measureIndex: data.measureIndex,
      });
    },
  },

  getters: {},
});
