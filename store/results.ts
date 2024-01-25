import { defineStore } from "pinia";
import { initialResultData } from "~/data/initialValues";
import { v4 as uuidv4 } from "uuid";
import type { Result, Fences, Gate, OtherParts } from "~/data/interfaces";
import addPartsHelper from "~/utils/addPartsHelper";

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: [] as Result[],
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

    addPoles(): void {},

    addGatePoles(): void {},

    addBorders(color: string): void {
      this.borders++;
      addPartsHelper(this.borderHolders, color, 2, 0);
    },

    addCrossbars(color: string): void {
      addPartsHelper(this.crossbars, color, 2, 0);
      addPartsHelper(this.crossbarHolders, color, 4, 0);
    },

    addTotalElements(elements: number, color: string): void {
      this.totalElements += elements;
      addPartsHelper(this.rivets, color, this.totalElements * 4, 0);
    },

    addBindingsLength(height: number, color: string): void {
      if (this.bindingsLength.length === 0) {
        addPartsHelper(this.bindingsLength, color, height * 2, 0);
      }
      addPartsHelper(this.bindingsLength, color, height * 2, 0);
    },

    addSegment(height: number, color: string) {
      addPartsHelper(this.segments, color, 1, height);

      const holders = height < 130 ? 2 : height < 170 ? 3 : 4;
      if (this.segmentHolders.length === 0) {
        addPartsHelper(this.segmentHolders, color, holders, 0);
      }
      addPartsHelper(this.segmentHolders, color, holders, 0);
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

  getters: {},
});
