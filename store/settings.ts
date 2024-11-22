import { sign } from "jsonwebtoken";
import type { DefaultValues, SelectValues } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    defaultValues: {} as DefaultValues,
    selectValues: {
      fenceMaterials: [],
      fenceColors: [],
      fenceTypes: [],
      retailFenceTypes: [],
      status: [],
      accountTypes: [],
      gateTypes: [],
      gateOption: [],
      gateLock: [],
    } as SelectValues,
  }),

  actions: {
    addDefaultValues(data: DefaultValues) {
      this.defaultValues = data;
    },

    addSelectData(data: SelectValues) {
      this.selectValues = data;
    },

    changeDefaultValue(value: string, field: keyof DefaultValues) {
      this.defaultValues[field] = value;
    },

    newSelectValue(field: keyof SelectValues, value: string) {
      this.selectValues[field].push(value);
    },

    deleteSelectValue(field: keyof SelectValues, index: number) {
      this.selectValues[field] = this.selectValues[field].filter(
        (item, ind) => ind !== index
      );
    },
  },

  getters: {},
});
