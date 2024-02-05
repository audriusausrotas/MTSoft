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

export const useResultsStore = defineStore("results", {
  state: () => ({
    results: [] as Result[],
    works: [] as Works[],
    fences: [] as Fences[],
    totalFences: 0 as number,
    totalFencesWithBindings: 0 as number,
    totalFenceboards: 0 as number,
    poles: [] as OtherParts[],
    totalPoles: 0 as number,
    gatePoles: [] as OtherParts[],
    totalGatePoles: 0 as number,
    borders: 0 as number,
    totalBorders: 0 as number,
    borderHolders: [] as OtherParts[],
    crossbars: [] as OtherParts[],
    totalCrossbars: 0 as number,
    crossbarHolders: [] as OtherParts[],
    rivets: [] as OtherParts[],
    totalElements: 0 as number,
    bindingsLength: [] as OtherParts[],
    segments: [] as OtherParts[],
    totalSegments: 0 as number,
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

    // update bellow
    clearParts(): void {
      this.fences = [];
      this.works = [];
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

    addBorders(color: string) {
      this.borders++;
      this.borderHolders = this.addPart(this.borderHolders, color, 2, 0);
    },

    addTotalPoles() {
      this.totalPoles++;
    },
    removeTotalPole() {
      this.totalPoles--;
    },
    addTotalGatePoles(quantity: number) {
      this.totalGatePoles += quantity;
    },
    addTotalBorders() {
      this.totalBorders++;
    },
    addTotalCrossbars() {
      this.totalCrossbars += 2;
    },
    addTotalSegments() {
      this.totalSegments++;
    },
    addTotalFence(quantity: number) {
      this.totalFences += quantity;
    },
    addTotalFenceWithBindings(quantity: number) {
      this.totalFencesWithBindings += quantity;
    },
    addTotalFenceboards(quantity: number) {
      this.totalFenceboards += quantity;
    },

    addWork(work: Works) {
      let exist = false;
      this.works.forEach((item) => {
        if (item.name === work.name) {
          const totalPrice = work.price * work.quantity;
          const totalCost = work.cost * work.quantity;
          const profit = totalPrice - totalCost;
          const margin = +(
            Math.round((profit / totalPrice) * 10000) / 100
          ).toFixed(2);

          item.quantity = work.quantity;
          item.totalPrice = totalPrice;
          item.totalCost = totalCost;
          item.profit = profit;
          item.margin = margin;

          exist = true;
        }
      });
      if (!exist) this.works.push(work);
    },

    addPoles(color: string, height: number): void {
      let quantity = 0;
      if (this.poles.length === 0 && this.gatePoles.length === 0) quantity++;
      const doesExist = this.poles.some((item) => item.color === color);
      if (!doesExist) quantity++;
      if (quantity === 0) quantity++;
      this.poles = this.addPart(this.poles, color, quantity, height);
    },

    removePole(color: string): void {
      this.poles = this.poles.map((item) => {
        if (item.color === color) item.quantity--;
        return item;
      });
    },

    addGatePoles(color: string, quantity: number): void {
      this.gatePoles = this.addPart(this.gatePoles, color, quantity, 3);
    },

    addCrossbars(color: string): void {
      this.crossbars = this.addPart(this.crossbars, color, 2, 0);
      this.crossbarHolders = this.addPart(this.crossbarHolders, color, 4, 0);
    },

    addTotalElements(elements: number, color: string): void {
      this.totalElements += elements;
      this.rivets = this.addPart(
        this.rivets,
        color,
        Math.ceil(elements) * 4,
        0
      );
    },

    addBindingsLength(height: number, color: string): void {
      if (this.bindingsLength.length === 0) {
        this.bindingsLength = this.addPart(
          this.bindingsLength,
          color,
          height * 2,
          0
        );
      }
      this.bindingsLength = this.addPart(
        this.bindingsLength,
        color,
        height * 2,
        0
      );
    },

    addSegment(height: number, color: string): void {
      this.segments = this.addPart(this.segments, color, 1, height);

      const holdersCount = height < 130 ? 2 : height < 170 ? 3 : 4;

      if (this.segmentHolders.length === 0) {
        this.segmentHolders = this.addPart(
          this.segmentHolders,
          color,
          holdersCount,
          0
        );
      }
      this.segmentHolders = this.addPart(
        this.segmentHolders,
        color,
        holdersCount,
        0
      );
    },
    addPart(
      array: OtherParts[],
      color: string,
      quantity: number,
      height: number
    ) {
      let tempArr = [...array];
      let itemExist = false;
      tempArr.forEach((item) => {
        if (item.color === color && height === item.height) {
          item.quantity += quantity;
          itemExist = true;
        }
      });
      if (!itemExist) {
        tempArr.push({ color, quantity, height });
      }
      return tempArr;
    },
  },

  getters: {},
});
