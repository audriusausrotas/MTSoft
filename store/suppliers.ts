import type { Supplier } from "~/data/interfaces";

export const useSuppliersStore = defineStore("suppliers", {
  state: () => ({
    suppliers: [] as Supplier[],
  }),

  actions: {
    async setSuppliers(supplier: Supplier[]) {
      this.suppliers = [...supplier];
    },

    addSupplier(supplier: Supplier) {
      this.suppliers.push(supplier);
    },

    updateSupplier(data: Supplier) {
      this.suppliers = this.suppliers.map((supplier) => {
        if (supplier._id === data._id) return data;
        else return supplier;
      });
    },

    deleteSupplier(id: string) {
      this.suppliers = this.suppliers.filter((supplier) => supplier._id !== id);
    },
  },

  getters: {},
});
