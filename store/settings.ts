import type {
  DefaultValues,
  SelectValues,
  UserRights,
} from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fence: [] as any,
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

    updateUserRights(data: UserRights) {
      this.userRights = this.userRights.map((item: UserRights) => {
        if (item.accountType === data.accountType) return data;
        else return item;
      });
    },

    updateFenceSettings(fence: any) {},
  },

  getters: {},
});
