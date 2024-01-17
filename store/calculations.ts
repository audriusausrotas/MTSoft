import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { clientInitialValue, initialMeasure } from "~/data/initialValues";
import type { Measure, Calculations } from "~/data/interfaces";

export const useCalculationsStore = defineStore("calculations", {
  state: (): Calculations => ({
    client: { ...clientInitialValue },
    fences: [],
  }),

  actions: {
    addFence(): void {
      this.fences.push({
        id: uuidv4(),
        side: "Priekis",
        type: "Daimond 60/90",
        color: "7016",
        material: "Matinė",
        seeThrough: "Nepramatoma",
        direction: "Vertikali",
        montavimas: true,
        borteliai: true,
        stulpai: true,
        tikMontavimas: false,
        twoSided: false,
        space: 3,
        elements: 0,
        totalLength: 0,
        totalSQ: 0,
        measures: [{ ...initialMeasure }],
      });
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

    updateMontavimas(data: { index: number; value: boolean }): void {
      this.fences[data.index].montavimas = data.value;
    },

    updateBorteliai(data: { index: number; value: boolean }): void {
      this.fences[data.index].borteliai = data.value;
    },

    updateStulpai(data: { index: number; value: boolean }): void {
      this.fences[data.index].stulpai = data.value;
    },

    updateTikMontavimas(data: { index: number; value: boolean }): void {
      this.fences[data.index].tikMontavimas = data.value;
      if (data.value) {
        this.fences[data.index].stulpai = false;
        this.fences[data.index].borteliai = false;
        this.fences[data.index].montavimas = false;
      }
    },

    updateMeasureSpace(data: { index: number; value: number }): void {
      this.fences[data.index].space = data.value;
    },

    updateMeasureGate(data: {
      index: number;
      measureIndex: number;
      value: boolean;
    }): void {
      this.fences[data.index].measures[data.measureIndex].gates = data.value;
    },

    updateMeasureTwoSided(data: { index: number; value: boolean }): void {
      this.fences[data.index].twoSided = data.value;
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

    updateTotalSQ(data: { index: number; value: number }): void {
      this.fences[data.index].totalSQ = data.value;
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
