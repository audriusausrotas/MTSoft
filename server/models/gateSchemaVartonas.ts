import { defineMongooseModel } from "#nuxt/mongoose";
import type { GateSchema } from "~/data/interfaces";

export const gateSchemaVartonas = defineMongooseModel<GateSchema>(
  "gateSchemaVartonas",
  {
    _id: Object,
    client: Object,
    creator: Object,
    gates: [Object],
    dateCreated: String,
  },
  { collection: "gatesVartonas" }
);
