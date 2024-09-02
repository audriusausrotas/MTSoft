import { defineStore } from "pinia";
import { initialResultData, initialWorkData } from "~/data/initialValues";
import { v4 as uuidv4 } from "uuid";
import type {
  Result,
  Fences,
  Gate,
  OtherParts,
  Works,
  Product,
} from "~/data/interfaces";
import { verticals } from "~/data/selectFieldData";

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
    anchoredPoles: [] as OtherParts[],
    totalAnchoredPoles: 0 as number,
    gatePoles: [] as OtherParts[],
    anchoredGatePoles: [] as OtherParts[],
    totalAnchoredGatePoles: 0 as number,
    totalGatePoles: 0 as number,
    borders: 0 as number,
    totalBorders: 0 as number,
    borderHolders: [] as OtherParts[],
    crossbars: [] as OtherParts[],
    totalCrossbars: 0 as number,
    crossbarHolders: [] as OtherParts[],
    rivets: [] as OtherParts[],
    bolts: [] as OtherParts[],
    totalElements: 0 as number,
    bindingsLength: [] as OtherParts[],
    segments: [] as OtherParts[],
    totalSegments: 0 as number,
    segmentHolders: [] as OtherParts[],
    gates: [] as Gate[],
    totalPrice: 0 as number,
    totalCost: 0 as number,
    totalProfit: 0 as number,
    totalMargin: 0 as number,
    priceVAT: 0 as number,
    priceWithDiscount: 0 as number,
    discount: false as boolean,
  }),

  actions: {
    useDiscount(): void {
      this.discount = !this.discount;
    },

    updateDiscount(value: number) {
      this.priceWithDiscount = +value;
    },

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
    addNewWork(): void {
      const newWork: Works = {
        ...initialWorkData,
        id: uuidv4(),
        isNew: true,
      };
      this.works.push(newWork);
    },

    updateName(index: number, value: string): void {
      this.results[index].type = value;
    },

    updateWorkName(index: number, value: string): void {
      this.works[index].name = value;
    },

    updateResultCost(index: number, value: number): void {
      this.results[index].cost = +value;
      this.recalculateTotals(index);
    },

    updateWorkCost(index: number, value: string): void {
      this.works[index].cost = +value;
      this.recalculateWorkTotals(index);
    },

    selectItem(index: number, value: Product): void {
      const selectedResult = this.results[index];
      selectedResult.type = value.name;
      selectedResult.price = value.price;
      selectedResult.cost = value.cost;
      selectedResult.category = value.category;
      selectedResult.quantity = this.results[index].quantity || 1;
      this.recalculateTotals(index);
    },

    selectWork(index: number, value: Works): void {
      const selectedResult = this.works[index];
      selectedResult.name = value.name;
      selectedResult.price = value.price;
      selectedResult.cost = value.cost;
      selectedResult.quantity = this.works[index].quantity || 1;
      this.recalculateWorkTotals(index);
    },

    updateQuantity(index: number, value: number): void {
      this.results[index].quantity = +value;
      this.recalculateTotals(index);
    },

    updateSpace(index: number, value: number): void {
      this.results[index].space = +value;
    },

    updateColor(index: number, value: string): void {
      this.results[index].isNew = true;
      this.results[index].color = value;
    },

    updatePrice(index: number, value: number): void {
      this.results[index].price = +value;
      this.recalculateTotals(index);
    },

    updateWorkQuantity(index: number, value: number): void {
      this.works[index].quantity = +value;
      this.recalculateWorkTotals(index);
    },

    updateWorkPrice(index: number, value: number): void {
      this.works[index].price = +value;
      if (this.works[index].name === "Transportas") {
        this.works[index].cost = +value;
      }
      this.recalculateWorkTotals(index);
    },

    recalculateTotals(index: number): void {
      const result = this.results[index];
      result.totalPrice = +(result.price * result.quantity).toFixed(2);
      result.totalCost = +(result.cost * result.quantity).toFixed(2);
      result.profit = +(result.totalPrice - result.totalCost).toFixed(2);
      const marginValue =
        ((result.totalPrice - result.totalCost) / result.totalPrice) * 100;
      result.margin = +marginValue.toFixed(2);
      this.calculateTotals();
    },

    recalculateWorkTotals(index: number): void {
      const work = this.works[index];
      work.totalPrice = Math.round(work.price * work.quantity);
      work.totalCost = Math.round(work.cost * work.quantity);
      work.profit = work.totalPrice - work.totalCost;
      const marginValue =
        ((work.totalPrice - work.totalCost) / work.totalPrice) * 100;
      work.margin = parseFloat(marginValue.toFixed(2));
      this.calculateTotals();
    },

    addGates(gate: Gate): void {
      this.gates.push(gate);
    },

    calculateTotals(): void {
      let newPrice = 0;
      let newCost = 0;

      const combinedItems = [...this.results, ...this.works];

      combinedItems.forEach((item) => {
        newPrice += item.totalPrice;
        newCost += item.totalCost;
      });

      this.totalPrice = +newPrice.toFixed(2);
      this.totalCost = +newCost.toFixed(2);
      this.totalProfit = +(newPrice - newCost).toFixed(2);
      this.totalMargin = +(
        Math.round(((newPrice - newCost) / newPrice) * 10000) / 100
      ).toFixed(2);
      this.priceVAT = +(newPrice + newPrice * 0.21).toFixed(2);
      this.calculatePriceWithDiscount();
    },

    calculatePriceWithDiscount() {
      const calculatedDiscount = +(
        this.totalPrice +
        (this.priceVAT - this.totalPrice) / 2
      ).toFixed(2);
      this.updateDiscount(calculatedDiscount);
    },

    deleteResult(id: string): void {
      this.results = this.results.filter((item) => item.id !== id);
      this.calculateTotals();
    },
    deleteWork(id: string): void {
      this.works = this.works.filter((item) => item.id !== id);
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
      this.priceVAT = 0;
      this.priceWithDiscount = 0;
      this.discount = false;
    },

    clearParts(): void {
      this.works = [];
      this.fences = [];
      this.poles = [];
      this.gates = [];
      this.gatePoles = [];
      this.borders = 0;
      this.borderHolders = [];
      this.rivets = [];
      this.bolts = [];
      this.crossbars = [];
      this.crossbarHolders = [];
      this.totalElements = 0;
      this.bindingsLength = [];
      this.segments = [];
      this.segmentHolders = [];
      this.totalFences = 0;
      this.totalFencesWithBindings = 0;
      this.totalFenceboards = 0;
      this.totalPoles = 0;
      this.totalGatePoles = 0;
      this.totalBorders = 0;
      this.totalCrossbars = 0;
      this.totalSegments = 0;
      this.anchoredPoles = [];
      this.totalAnchoredPoles = 0;
      this.anchoredGatePoles = [];
      this.totalAnchoredGatePoles = 0;
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

    addTotalAnchoredPoles() {
      this.totalAnchoredPoles++;
    },

    removeTotalPole() {
      this.totalPoles--;
    },

    removeTotalAnchoredPole() {
      this.totalAnchoredPoles--;
    },

    addTotalGatePoles(quantity: number) {
      this.totalGatePoles += quantity;
    },

    addTotalAnchoredGatePoles(quantity: number) {
      this.totalAnchoredGatePoles += quantity;
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
      this.poles = this.addPart(this.poles, color, quantity, +height);
    },

    addAnchoredPoles(color: string, height: number): void {
      let quantity = 0;
      if (
        this.anchoredPoles.length === 0 &&
        this.anchoredGatePoles.length === 0
      )
        quantity++;
      const doesExist = this.anchoredPoles.some((item) => item.color === color);
      if (!doesExist) quantity++;
      if (quantity === 0) quantity++;
      this.anchoredPoles = this.addPart(
        this.anchoredPoles,
        color,
        quantity,
        height
      );
    },

    removePole(color: string): void {
      this.poles = this.poles.map((item) => {
        if (item.color === color) item.quantity--;
        return item;
      });
    },

    removeAnchoredPole(color: string): void {
      this.anchoredPoles = this.anchoredPoles.map((item) => {
        if (item.color === color) item.quantity--;
        return item;
      });
    },

    addGatePoles(color: string, quantity: number): void {
      this.gatePoles = this.addPart(this.gatePoles, color, +quantity, 3);
    },

    addAnchoredGatePoles(color: string, quantity: number): void {
      this.anchoredGatePoles = this.addPart(
        this.anchoredGatePoles,
        color,
        +quantity,
        3
      );
    },

    addCrossbars(color: string): void {
      this.crossbars = this.addPart(this.crossbars, color, 2, 0);
      this.crossbarHolders = this.addPart(this.crossbarHolders, color, 4, 0);
    },

    addTotalElements(elements: number, color: string, type: string): void {
      this.totalElements += elements;

      if (verticals.includes(type)) {
        this.bolts = this.addPart(
          this.bolts,
          color,
          Math.ceil(elements) * 4,
          0
        );
      } else {
        this.rivets = this.addPart(
          this.rivets,
          color,
          Math.ceil(elements) * 4,
          0
        );
      }
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
      this.segments = this.addPart(this.segments, color, 1, +height);

      const holdersCount = +height < 130 ? 2 : +height < 170 ? 3 : 4;

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

    setProject(project: any) {
      this.results = [...project.results];
      this.works = [...project.works];
      this.gates = [...project.gates];
      this.totalPrice = project.price;
      this.totalCost = project.cost;
      this.totalProfit = project.profit;
      this.totalMargin = project.margin;
      this.priceVAT = project.priceVAT;
      this.discount = project.discount;
      this.priceWithDiscount = project.priceWithDiscount;
    },
  },

  getters: {},
});
