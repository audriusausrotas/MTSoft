import { defineStore } from "pinia";
import type { Product } from "~/data/interfaces";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    addProducts(data: any) {
      this.products = [...data];
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
