import type { DefaultValues, SelectValues } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    defaultValues: {} as DefaultValues,
    selectValues: {
      fenceMaterials: ["aaaa", "bbbb", "cccc"],
    } as SelectValues,
  }),

  actions: {
    addDefaultValues(data: DefaultValues) {
      this.defaultValues = data;
    },

    changeDefaultValue(value: string, field: keyof DefaultValues) {
      this.defaultValues[field] = value;
    },
  },

  getters: {},
});
