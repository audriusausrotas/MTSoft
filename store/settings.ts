import type { Selects, Value } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    users: [] as any[],
    selects: [] as Selects[],
  }),

  actions: {
    addData(data: any) {
      // this.general = [...data.general];
      // this.fence = [...data.fence];
      // this.users = [...data.users];
      this.selects = [...data];
    },

    addSelect(select: Selects) {
      this.selects.unshift(select);
    },

    updateSelect(index: number, newValues: Value[]) {
      this.selects[index].values = [...newValues];
    },

    deleteSelect(index: number) {
      this.selects = this.selects.filter((item, ind) => ind !== index);
    },

    addSelectData(index: number) {
      this.selects[index].values.push({ value: "" });
    },

    deleteSelectData(index: number, valueIndex: number) {
      this.selects[index].values = this.selects[index].values.filter(
        (value, i) => i !== valueIndex
      );
    },

    updateSelectData(index: number, valueIndex: number, value: string) {
      this.selects[index].values[valueIndex].value = value;
    },
  },

  getters: {},
});
