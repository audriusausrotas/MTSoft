import { initialResultData } from "~/data/initialValues";
import { v4 as uuidv4 } from "uuid";

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: [],
    fences: [],
    poles: [],
    gatePoles: [],
    borders: [],
    borderHolders: [],
    rivets: [],
    crossbars: [],
    crossbarHolders: [],
    totalElements: [],
    bindingsLength: [],
    segments: [],
    segmentHolders: [],
    gates: [],
    totalPrice: 0,
    totalCost: 0,
    totalProfit: 0,
    totalMargin: 0,
  }),

  actions: {
    createFence(item) {
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
      this.results.push({ ...initialResultData, id: uuidv4(), isNew: true });
    },

    updateName(data) {
      this.results[data.index].name = data.value;
    },

    selectItem(data) {
      const selectedResult = this.results[data.index];
      selectedResult.name = data.value.name;
      selectedResult.price = data.value.price;
      selectedResult.cost = data.value.cost;
      selectedResult.category = data.value.category;
    },

    updateQuantity(data) {
      this.results[data.index].quantity = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    updateSpace(data) {
      this.results[data.index].space = data.value;
    },

    updateColor(data) {
      this.results[data.index].color = data.value;
    },

    updatePrice(data) {
      this.results[data.index].price = data.value;
      this.recalculateTotals(data.index);
      this.calculateTotals();
    },

    recalculateTotals(index) {
      const result = this.results[index];
      result.totalPrice = result.price * result.quantity;
      result.totalCost = result.cost * result.quantity;
      result.profit = result.totalPrice - result.totalCost;
      result.margin = (
        Math.round(
          ((result.totalPrice - result.totalCost) / result.totalPrice) * 10000
        ) / 100
      ).toFixed(2);
    },

    addPoles(data) {
      this.poles += data;
    },
    addGatePoles(data) {
      this.gatePoles += data;
    },
    addBorders(data) {
      this.borders += data;
    },
    addBorderHolders(data) {
      this.borderHolders += data;
    },
    addRivets(data) {
      this.rivets += data;
    },
    addCrossbars(data) {
      this.crossbars += data;
    },
    addCrossbarHolders(data) {
      this.crossbarsHolders += data;
    },
    addtotalElements(data) {
      this.totalElements += data;
    },
    addBindingsLength(data) {
      this.bindingsLength += data;
    },
    addSegments(data) {
      this.segments += data;
    },
    addSegmentHolders(data) {
      this.segmentHolders += data;
    },
    addGates(data) {
      this.gates.push(data);
    },

    createResults() {},

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

    deleteResult(id) {
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
      this.poles = 0;
      this.gatePoles = 0;
      this.borders = 0;
      this.borderHolders = 0;
      this.rivets = 0;
      this.crossbars = 0;
      this.crossbarsHolders = 0;
      this.totalElements = 0;
      this.bindingsLength = 0;
      this.segments = 0;
      this.segmentHolders = 0;
    },
  },

  getters: {},
});
