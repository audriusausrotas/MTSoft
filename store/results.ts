import { defineStore } from "pinia";
import { initialResultData } from "~/data/initialValues";
import { v4 as uuidv4 } from "uuid";
import type { Result, Fences, Gate, Poles } from "~/data/interfaces";

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: [] as Result[],
    fences: [] as Fences[],
    poles: [] as Poles[],
    gatePoles: 0,
    borders: 0,
    borderHolders: 0,
    crossbars: 0,
    crossbarHolders: 0,
    rivets: 0,
    totalElements: 0,
    bindingsLength: 0,
    segments: 0,
    segmentHolders: 0,
    gates: [] as Gate[],
    totalPrice: 0,
    totalCost: 0,
    totalProfit: 0,
    totalMargin: 0,
  }),

  actions: {
    createFence(item: any) {
      // let fenceExist = false;
      // const initialFenceData = {
      //   name: item.type,
      //   color: item.color,
      //   length: item.totalLength,
      //   sq: item.totalSQ,
      //   material: item.material,
      //   space: item.space,
      //   twoSided: false,
      // };
      // this.fences.forEach((fenceItem) => {
      //   if (
      //     fenceItem.name === item.type &&
      //     fenceItem.color === item.color &&
      //     fenceItem.material === item.material &&
      //     fenceItem.space === item.space
      //   ) {
      //     fenceItem.length += item.totalLength || 0;
      //     fenceItem.sq += item.totalSQ || 0;
      //     fenceExist = true;
      //   }
      // });
      // if (!fenceExist) {
      //   this.fences.push(initialFenceData);
      // }
    },

    addNew() {
      const newResult: Result = {
        ...initialResultData,
        id: uuidv4(),
        isNew: true,
      };
      this.results.push(newResult);
    },

    updateName(data: { index: number; value: string }) {
      this.results[data.index].name = data.value;
    },

    selectItem(data: {
      index: number;
      value: { name: string; price: number; cost: number; category: string };
    }) {
      const selectedResult = this.results[data.index];
      selectedResult.name = data.value.name;
      selectedResult.price = data.value.price;
      selectedResult.cost = data.value.cost;
      selectedResult.category = data.value.category;
    },

    updateQuantity(data: { index: number; value: number }) {
      this.results[data.index].quantity = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    updateSpace(data: { index: number; value: number }) {
      this.results[data.index].space = data.value;
    },

    updateColor(data: { index: number; value: string }) {
      this.results[data.index].color = data.value;
    },

    updatePrice(data: { index: number; value: number }) {
      this.results[data.index].price = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    recalculateTotals(index: number) {
      const result = this.results[index];
      result.totalPrice = result.price * result.quantity;
      result.totalCost = result.cost * result.quantity;
      result.profit = result.totalPrice - result.totalCost;
      const marginValue =
        ((result.totalPrice - result.totalCost) / result.totalPrice) * 100;
      result.margin = parseFloat(marginValue.toFixed(2));
    },

    // done
    addPoles(data: Poles[]) {
      this.poles = [...data];
    },

    // done
    addGatePoles(data: number) {
      this.gatePoles = data;
    },

    // done
    addBorders() {
      this.borders++;
      this.borderHolders += 2;
    },

    addRivets(data: number) {
      this.rivets += data;
    },

    // done
    addCrossbars(data: number) {
      this.crossbars = data;
      this.crossbarHolders = data * 2;
    },

    addtotalElements(data: number) {
      this.totalElements += data;
    },
    addBindingsLength(data: number) {
      this.bindingsLength += data;
    },
    addSegments(data: number) {
      this.segments += data;
    },
    addSegmentHolders(data: number) {
      this.segmentHolders += data;
    },
    addGates(data: Gate[]) {
      this.gates = [...data];
    },

    calculateTotals() {
      this.clearTotals();
      this.results.forEach((item) => {
        this.totalPrice += +item.totalPrice;
        this.totalCost += +item.totalCost;
        this.totalProfit += +item.profit;
        this.totalMargin += +item.margin || 0;
      });
      this.totalMargin = +this.totalMargin / +this.results.length;
    },

    deleteResult(id: string) {
      this.results = this.results.filter((item) => item.id !== id);
      this.calculateTotals();
    },

    clearResults() {
      this.results = [];
      this.clearTotals();
    },

    clearTotals() {
      this.totalPrice = 0;
      this.totalCost = 0;
      this.totalProfit = 0;
      this.totalMargin = 0;
    },

    clearParts() {
      this.fences = [];
      this.poles = [];
      this.gatePoles = 0;
      this.borders = 0;
      this.borderHolders = 0;
      this.rivets = 0;
      this.crossbars = 0;
      this.crossbarHolders = 0;
      this.totalElements = 0;
      this.bindingsLength = 0;
      this.segments = 0;
      this.segmentHolders = 0;
    },

    clearAll() {
      this.clearParts();
      this.clearTotals();
      this.clearResults();
    },
  },

  // fences: [] as Fences[],
  // poles: 0,
  // gatePoles: 0,
  // borders: 0,
  // borderHolders: 0,
  // rivets: 0,
  // crossbars: 0,
  // crossbarHolders: 0,
  // totalElements: 0,
  // bindingsLength: 0,
  // segments: 0,
  // segmentHolders: 0,
  // gates: [] as Gate[],
  // totalPrice: 0,
  // totalCost: 0,
  // totalProfit: 0,
  // totalMargin: 0,

  getters: {},
});
