import type { DefaultValues, SelectValues } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
    defaultValues: {} as DefaultValues,
    selectValues: {
      fenceMaterials: ["matine", "blizgi", "ice crystal"],
      fenceColors: ["7016", "8019", "8017"],
      fenceTypes: ["daimond", "dile", "plank"],
      retailFenceTypes: ["daimond metras", "plank metras", "namelis"],
      status: ["patvirtintas", "tinkamas", "netinkamas"],
      accountTypes: ["adminas", "vartonas"],
      gateTypes: ["gaminami", "segmentiniai"],
      gateOption: ["stumdomi ", "varstomi", "segmentiniai"],
      gateLock: ["paprasta", "elektromagnetine"],
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
