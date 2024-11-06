import type { Selects } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    users: [] as any[],
    selects: [
      { name: "testas", values: [{ value: "vienas" }, { value: "asdasd" }] },
    ] as Selects[],
  }),

  actions: {
    addData(data: any) {
      this.general = [...data.general];
      this.fence = [...data.fence];
      this.users = [...data.users];
      this.selects = [...data.selects];
    },

    addSelect(index: number) {
      this.selects[index].values.push({ value: "" });
    },

    deleteSelect(index: number, valueIndex: number) {
      this.selects[index].values = this.selects[index].values.filter(
        (value, i) => i !== valueIndex
      );
    },

    updateSelect(index: number, valueIndex: number, value: string) {
      this.selects[index].values[valueIndex].value = value;
    },
  },

  getters: {},
});
