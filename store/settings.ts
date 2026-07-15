import type {
  DefaultValues,
  FenceSetup,
  Gates,
  ReportSettings,
  SelectValues,
  UserRights,
} from "~/data/interfaces";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    general: [] as any,
    fences: [] as FenceSetup[],
    gates: [] as Gates[],
    defaultValues: {} as DefaultValues,
    userRights: [] as UserRights[],
    reports: [] as ReportSettings[],
    selectValues: {
      fenceMaterials: [],
      fenceColors: [],
      fenceTypes: [],
      fenceManufacturers: [],
      status: [],
      accountTypes: [],
      gateTypes: [],
      gateOption: [],
      gateLock: [],
      productionElements: [],
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

    addReportSettings(data: ReportSettings[]) {
      this.reports = [...data];
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

    newReport(data: ReportSettings) {
      this.reports.push(data);
    },

    editReport(data: ReportSettings) {
      this.reports = this.reports.map((item) => {
        if (item._id === data._id) return data;
        else return item;
      });
    },

    deleteReport(_id: string) {
      this.reports = this.reports.filter((item) => item._id !== _id);
    },

    deleteSelectValue(field: keyof SelectValues, index: number) {
      this.selectValues[field] = this.selectValues[field].filter(
        (item, ind) => ind !== index,
      );
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
      this.fences = this.fences.filter(
        (item: FenceSetup) => item._id.toString() !== id.toString(),
      );
    },
  },

  getters: {},
});
