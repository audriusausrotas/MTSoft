import { defineStore } from "pinia";
import type {
  Product,
  ProductsState,
  ResponseProducts,
} from "~/data/interfaces";

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    fences: [],
    poles: [],
    borders: [],
    crossbars: [],
    holders: [],
    gates: [],
    other: [],
    searchValue: "",
  }),

  actions: {
    // fetch from website
    async fetchProductsFromWebsite(): Promise<void> {
      try {
        let currentPage = 1;
        let totalPages = 1;
        let allProducts: Product[] = [];
        while (currentPage <= totalPages) {
          const response: any = await $fetch(
            `https://modernitvora.lt/api/api/public/products?page=${currentPage}`
          );
          const { data, last_page } = response.products;
          allProducts = [...allProducts, ...data];
          totalPages = last_page;
          currentPage++;
        }
        this.products = [...allProducts];
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    // fetch from database
    async fetchProducts(): Promise<void> {
      const response: ResponseProducts = await $fetch("/api/products");
      const { data } = response;
      this.products = [...data];
      data.forEach((item) => {
        switch (item.category) {
          case "tvoros":
            this.fences.push(item);
            break;
          case "stulpai":
            this.poles.push(item);
            break;
          case "borteliai":
            this.borders.push(item);
            break;
          case "skersiniai":
            this.crossbars.push(item);
            break;
          case "laikikliai":
            this.holders.push(item);
            break;
          case "vartai":
            this.gates.push(item);
            break;
          default:
            this.other.push(item);
            break;
        }
      });
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
