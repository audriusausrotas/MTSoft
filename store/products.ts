import { defineStore } from "pinia";
import type { Product, ProductsState, SeeThrough, SeeThroughOptions } from "~/data/interfaces";

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    searchValue: "",
  }),

  actions: {
    addProducts(data: any) {
      this.products = [...data];
    },

    updateSearch(value: string): void {
      this.searchValue = value;
    },

    newProduct(data: Product): void {
      this.products.push(data);
    },

    updateProduct(data: Product): void {
      this.products = this.products.map((item) => (item._id === data._id ? data : item));
    },
    deleteProduct(_id: string): void {
      this.products = this.products.filter((item) => item._id !== _id);
    },
  },

  getters: {},
});
