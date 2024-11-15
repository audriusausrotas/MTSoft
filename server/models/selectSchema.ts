import { defineMongooseModel } from "#nuxt/mongoose";
import type { SelectValues } from "~/data/interfaces";

export const selectSchema = defineMongooseModel<SelectValues>(
  "selectSchema",
  {
    fenceMaterials: String,
    gateOption: String,
    gateLock: String,
    gateTypes: String,
    fenceColors: String,
    fenceTypes: String,
    retailFenceTypes: String,
    status: String,
    accountTypes: String,
  },
  { collection: "selectData" }
);
