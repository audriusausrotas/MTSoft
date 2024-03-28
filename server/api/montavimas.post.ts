import { defineMongooseModel } from "#nuxt/mongoose";
import type { Montavimas } from "~/data/interfaces";

export const montavimasSchema = defineMongooseModel<Montavimas>(
  "montavimasSchema",
  {
    _id: Object,
    client: Object,
    creator: Object,
  },
  { collection: "montavimas" }
);
