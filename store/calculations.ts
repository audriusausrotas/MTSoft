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
  },

  getters: {
    updateClientAddress:
      (state) =>
      (data: string): void => {
        state.client.address = data;
      },

    updateClientUsername:
      (state) =>
      (data: string): void => {
        state.client.username = data;
      },

    updateClientPhone:
      (state) =>
      (data: string): void => {
        state.client.phone = data;
      },

    updateClientEmail:
      (state) =>
      (data: string): void => {
        state.client.email = data;
      },

    updateSide:
      (state) =>
      (data: { index: number; value: string }): void => {
        state.fences[data.index].side = data.value;
      },

    updateType:
      (state) =>
      (data: { index: number; value: string }): void => {
        state.fences[data.index].type = data.value;
      },

    updateColor:
      (state) =>
      (data: { index: number; value: string }): void => {
        state.fences[data.index].color = data.value;
      },

    updateMaterial:
      (state) =>
      (data: { index: number; value: string }): void => {
        state.fences[data.index].material = data.value;
      },

    updateMontavimas:
      (state) =>
      (data: { index: number; value: boolean }): void => {
        state.fences[data.index].montavimas = data.value;
      },

    updateBorteliai:
      (state) =>
      (data: { index: number; value: boolean }): void => {
        state.fences[data.index].borteliai = data.value;
      },

    updateStulpai:
      (state) =>
      (data: { index: number; value: boolean }): void => {
        state.fences[data.index].stulpai = data.value;
      },

    updateTikMontavimas:
      (state) =>
      (data: { index: number; value: boolean }): void => {
        state.fences[data.index].tikMontavimas = data.value;
        if (data.value) {
          state.fences[data.index].stulpai = false;
          state.fences[data.index].borteliai = false;
          state.fences[data.index].montavimas = false;
        }
      },

    updateMeasureLength:
      (state) =>
      (data: { index: number; measureIndex: number; value: number }): void => {
        state.fences[data.index].measures[data.measureIndex].length =
          data.value;
      },

    updateMeasureHeight:
      (state) =>
      (data: { index: number; measureIndex: number; value: number }): void => {
        state.fences[data.index].measures[data.measureIndex].height =
          data.value;
      },

    updateMeasureSpace:
      (state) =>
      (data: { index: number; value: number }): void => {
        state.fences[data.index].space = data.value;
      },

    updateMeasureGate:
      (state) =>
      (data: { index: number; measureIndex: number; value: boolean }): void => {
        state.fences[data.index].measures[data.measureIndex].gates = data.value;
      },

    updateMeasureTwoSided:
      (state) =>
      (data: { index: number; value: boolean }): void => {
        state.fences[data.index].twoSided = data.value;
      },

    updateMeasureKampas:
      (state) =>
      (data: { index: number; measureIndex: number; value: string }): void => {
        state.fences[data.index].measures[data.measureIndex].kampas.value =
          data.value;
      },

    updateMeasureLaiptas:
      (state) =>
      (data: { index: number; measureIndex: number; value: string }): void => {
        state.fences[data.index].measures[data.measureIndex].laiptas.value =
          data.value;
      },

    updateTotalLength:
      (state) =>
      (data: { index: number; value: number }): void => {
        state.fences[data.index].totalLength = data.value;
      },

    updateTotalSQ:
      (state) =>
      (data: { index: number; value: number }): void => {
        state.fences[data.index].totalSQ = data.value;
      },

    copyLast:
      (state) =>
      (index: number): void => {
        const elementIndex = state.fences[index].measures.length - 1;
        const element = state.fences[index].measures[elementIndex];
        state.fences[index].measures.push({ ...element });
      },

    clearFields: (state) => (): void => {
      state.client = { ...clientInitialValue };
      state.fences;
    },

    deleteMeasure:
      (state) =>
      (data: { index: number; measureIndex: number }): void => {
        state.fences[data.index].measures = state.fences[
          data.index
        ].measures.filter((measure, index) => index !== data.measureIndex);
      },

    deleteMeasures:
      (state) =>
      (index: number): void => {
        state.fences[index].measures = [{ ...initialMeasure }];
      },

    deleteFence:
      (state) =>
      (id: string): void => {
        state.fences = state.fences.filter((fence) => fence.id !== id);
      },
  },
});
