import { defineMongooseModel } from "#nuxt/mongoose";
import type { Selects } from "~/data/interfaces";

export const selectSchema = defineMongooseModel<Selects>(
  "selectSchema",
  {
    name: String,
    values: [Object],
  },
  { collection: "selectData" }
);
