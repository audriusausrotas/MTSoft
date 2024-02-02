import { defineStore } from "pinia";
import { initialResultData } from "~/data/initialValues";
import { v4 as uuidv4 } from "uuid";
import type {
  Result,
  Fences,
  Gate,
  OtherParts,
  Works,
} from "~/data/interfaces";
import addPartsHelper from "~/utils/addPartsHelper";

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: [] as Result[],
    works: [] as Works[],
    fences: [] as Fences[],
    poles: [] as OtherParts[],
    gatePoles: [] as OtherParts[],
    borders: 0 as number,
    borderHolders: [] as OtherParts[],
    crossbars: [] as OtherParts[],
    crossbarHolders: [] as OtherParts[],
    rivets: [] as OtherParts[],
    totalElements: 0 as number,
    bindingsLength: [] as OtherParts[],
    segments: [] as OtherParts[],
    segmentHolders: [] as OtherParts[],
    gates: [] as Gate[],
    totalPrice: 0,
    totalCost: 0,
    totalProfit: 0,
    totalMargin: 0,
  }),

  actions: {
    addFences(data: Fences[]): void {
      this.fences = [...data];
    },

    addNew(): void {
      const newResult: Result = {
        ...initialResultData,
        id: uuidv4(),
        isNew: true,
      };
      this.results.push(newResult);
    },

    updateName(data: { index: number; value: string }): void {
      this.results[data.index].type = data.value;
    },

    selectItem(data: {
      index: number;
      value: { type: string; price: number; cost: number; category: string };
    }): void {
      const selectedResult = this.results[data.index];
      selectedResult.type = data.value.type;
      selectedResult.price = data.value.price;
      selectedResult.cost = data.value.cost;
      selectedResult.category = data.value.category;
    },

    updateQuantity(data: { index: number; value: number }): void {
      this.results[data.index].quantity = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    updateSpace(data: { index: number; value: number }): void {
      this.results[data.index].space = data.value;
    },

    updateColor(data: { index: number; value: string }): void {
      this.results[data.index].color = data.value;
    },

    updatePrice(data: { index: number; value: number }): void {
      this.results[data.index].price = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    recalculateTotals(index: number): void {
      const result = this.results[index];
      result.totalPrice = result.price * result.quantity;
      result.totalCost = result.cost * result.quantity;
      result.profit = result.totalPrice - result.totalCost;
      const marginValue =
        ((result.totalPrice - result.totalCost) / result.totalPrice) * 100;
      result.margin = parseFloat(marginValue.toFixed(2));
    },

    addGates(gate: Gate): void {
      this.gates.push(gate);
    },

    calculateTotals(): void {
      this.clearTotals();
      this.results.forEach((item) => {
        this.totalPrice += +item.totalPrice;
        this.totalCost += +item.totalCost;
        this.totalProfit += +item.profit;
        this.totalMargin += +item.margin || 0;
      });
      this.totalMargin = +this.totalMargin / +this.results.length;
    },

    deleteResult(id: string): void {
      this.results = this.results.filter((item) => item.id !== id);
      this.calculateTotals();
    },

    clearResults(): void {
      this.results = [];
      this.clearTotals();
    },

    clearTotals(): void {
      this.totalPrice = 0;
      this.totalCost = 0;
      this.totalProfit = 0;
      this.totalMargin = 0;
    },

    clearParts(): void {
      this.fences = [];
      this.poles = [];
      this.gates = [];
      this.gatePoles = [];
      this.borders = 0;
      this.borderHolders = [];
      this.rivets = [];
      this.crossbars = [];
      this.crossbarHolders = [];
      this.totalElements = 0;
      this.bindingsLength = [];
      this.segments = [];
      this.segmentHolders = [];
    },

    clearAll(): void {
      this.clearParts();
      this.clearTotals();
      this.clearResults();
    },
  },

  getters: {
    addBorders:
      (store) =>
      (color: string): void => {
        store.borders++;
        store.borderHolders = addPartsHelper(store.borderHolders, color, 2, 0);
      },

    addPoles:
      (store) =>
      (color: string, height: number): void => {
        let quantity = 0;
        if (store.poles.length === 0 && store.gatePoles.length === 0)
          quantity++;
        const doesExist = store.poles.some((item) => item.color === color);
        if (!doesExist) quantity++;
        if (quantity === 0) quantity++;
        store.poles = addPartsHelper(store.poles, color, quantity, height);
      },

    removePole:
      (store) =>
      (color: string): void => {
        store.poles = store.poles.map((item) => {
          if (item.color === color) item.quantity--;
          return item;
        });
      },

    addGatePoles:
      (store) =>
      (color: string, quantity: number): void => {
        store.gatePoles = addPartsHelper(store.gatePoles, color, quantity, 3);
      },

    addCrossbars:
      (store) =>
      (color: string): void => {
        store.crossbars = addPartsHelper(store.crossbars, color, 2, 0);
        store.crossbarHolders = addPartsHelper(
          store.crossbarHolders,
          color,
          4,
          0
        );
      },

    addTotalElements:
      (store) =>
      (elements: number, color: string): void => {
        store.totalElements += elements;
        store.rivets = addPartsHelper(
          store.rivets,
          color,
          Math.ceil(elements) * 4,
          0
        );
      },

    addBindingsLength:
      (store) =>
      (height: number, color: string): void => {
        if (store.bindingsLength.length === 0) {
          store.bindingsLength = addPartsHelper(
            store.bindingsLength,
            color,
            height * 2,
            0
          );
        }
        store.bindingsLength = addPartsHelper(
          store.bindingsLength,
          color,
          height * 2,
          0
        );
      },

    addSegment:
      (store) =>
      (height: number, color: string): void => {
        store.segments = addPartsHelper(store.segments, color, 1, height);

        const holdersCount = height < 130 ? 2 : height < 170 ? 3 : 4;

        if (store.segmentHolders.length === 0) {
          store.segmentHolders = addPartsHelper(
            store.segmentHolders,
            color,
            holdersCount,
            0
          );
        }
        store.segmentHolders = addPartsHelper(
          store.segmentHolders,
          color,
          holdersCount,
          0
        );
      },
  },
});
