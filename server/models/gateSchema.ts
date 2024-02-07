import { defineMongooseModel } from "#nuxt/mongoose";
import type { GateSchema } from "~/data/interfaces";

export const gateSchema = defineMongooseModel<GateSchema>(
  "gateSchema",
  {
    client: String,
    phone: String,
    address: String,
    creator: String,
    gates: [Object],
  },
  { collection: "gates" }
);
