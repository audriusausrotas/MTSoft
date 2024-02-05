import { defineStore } from "pinia";
import type {
  Product,
  ProductsState,
  ResponseProducts,
} from "~/data/interfaces";

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    searchValue: "",
  }),

  actions: {
    // fetch from database
    async fetchProducts(): Promise<void> {
      const response: ResponseProducts = await $fetch("/api/products");
      const { data } = response;
      this.products = [...data];
    },

    updateSearch(value: string): void {
      this.searchValue = value;
    },

    newProduct(data: Product): void {
      this.products.push(data);
    },
  },

  getters: {
    updateProduct:
      (store) =>
      (data: Product): void => {
        store.products = store.products.map((item) =>
          item._id === data._id ? data : item
        );
      },

    deleteProduct:
      (store) =>
      (_id: string): void => {
        store.products = store.products.filter((item) => item._id !== _id);
      },
  },
});
