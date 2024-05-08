import { defineMongooseModel } from "#nuxt/mongoose";
import type { GateSchema } from "~/data/interfaces";

export const gateSchemaVartonas = defineMongooseModel<GateSchema>(
  "gateSchemaVartonas",
  {
    _id: Object,
    client: Object,
    creator: Object,
    orderNr: {
      type: String,
      required: false,
      default: "",
    },
    comments: {
      type: [Object],
      required: false,
      default: [],
    },
    measure: {
      type: String,
      required: false,
      default: "Eilėje",
    },
    gates: [Object],
    dateCreated: String,
  },
  { collection: "gatesVartonas" }
);
