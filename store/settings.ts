import type { DefaultValues, Selects, Value } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    defaultValues: {} as DefaultValues,
    selects: [] as Selects[],
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
