import type { DefaultValues, FenceSetup, Gates, SelectValues, UserRights } from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fences: [] as FenceSetup[],
    gates: [] as Gates[],
    defaultValues: {} as DefaultValues,
    userRights: [] as UserRights[],
    selectValues: {
      fenceMaterials: [],
      fenceColors: [],
      fenceTypes: [],
      fenceManufacturers: [],
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

    addUserRights(data: UserRights[]) {
      this.userRights = [...data];
    },

    addGateData(data: Gates[]) {
      this.gates = [...data];
    },

    updateGateData(data: Gates) {
      this.gates = this.gates.map((item) => {
        if (item._id === data._id) {
          return data;
        } else return item;
      });
    },

    changeDefaultValue(value: string, field: keyof DefaultValues) {
      this.defaultValues[field] = value;
    },

    newSelectValue(field: keyof SelectValues, value: string) {
      this.selectValues[field].push(value);
    },

    deleteSelectValue(field: keyof SelectValues, index: number) {
      this.selectValues[field] = this.selectValues[field].filter((item, ind) => ind !== index);
    },

    updateUserRights(data: UserRights) {
      this.userRights = this.userRights.map((item: UserRights) => {
        if (item.accountType === data.accountType) return data;
        else return item;
      });
    },

    addFences(fences: FenceSetup[]) {
      this.fences = [...fences];
    },

    newFence(fence: FenceSetup) {
      this.fences.push(fence);
    },

    updateFenceSettings(fence: FenceSetup) {
      this.fences = this.fences.map((item: FenceSetup) => {
        if (item._id === fence._id) return fence;
        else return item;
      });
    },

    deleteFence(id: string) {
      this.fences = this.fences.filter((item: FenceSetup) => item._id.toString() !== id.toString());
    },
  },

  getters: {},
});
