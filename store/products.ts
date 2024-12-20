import { defineStore } from "pinia";
import type { Product } from "~/data/interfaces";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    filteredProducts: [] as Product[],
  }),

  actions: {
    addProducts(data: any) {
      this.products = [...data];
      this.updateProductSearch();
    },

    searchProduct(value: string): void {
      if (value.length > 2) {
        const foundProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );

        this.filteredProducts = [...foundProducts];
      } else {
        this.updateProductSearch();
      }
    },

    newProduct(data: Product): void {
      this.products.push(data);
      this.updateProductSearch();
    },

    updateProduct(data: Product): void {
      this.products = this.products.map((item) =>
        item._id === data._id ? data : item
      );
      this.updateProductSearch();
    },

    deleteProduct(_id: string): void {
      this.products = this.products.filter((item) => item._id !== _id);
      this.updateProductSearch();
    },

    updateProductSearch() {
      this.filteredProducts = [...this.products];
    },
  },

  getters: {},
});
