import { defineMongooseModel } from "#nuxt/mongoose";
import type { Gamyba } from "~/data/interfaces";

export const gamybaSchema = defineMongooseModel<Gamyba>(
  "gamybaSchema",
  {
    _id: Object,
    client: Object,
    creator: Object,
    orderNumber: String,
    fences: Array,
    bindings: {
      type: Array,
      required: false,
      default: [],
    },
    aditional: {
      type: [String],
      required: false,
      default: [],
    },
  },
  { collection: "gamyba" }
);
