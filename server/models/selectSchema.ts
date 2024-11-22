import { defineMongooseModel } from "#nuxt/mongoose";
import type { SelectValues } from "~/data/interfaces";

export const selectSchema = defineMongooseModel<SelectValues>(
  "selectSchema",
  {
    fenceMaterials: { type: [String], required: false, default: [] },
    gateOption: { type: [String], required: false, default: [] },
    gateLock: { type: [String], required: false, default: [] },
    gateTypes: { type: [String], required: false, default: [] },
    fenceColors: { type: [String], required: false, default: [] },
    fenceTypes: { type: [String], required: false, default: [] },
    retailFenceTypes: { type: [String], required: false, default: [] },
    status: { type: [String], required: false, default: [] },
    accountTypes: { type: [String], required: false, default: [] },
  },
  { collection: "selectData", minimize: false }
);
