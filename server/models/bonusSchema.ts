import { defineMongooseModel } from "#nuxt/mongoose";
import type { Bonus } from "~/data/interfaces";

export const bonusSchema = defineMongooseModel<Bonus>(
  "bonusSchema",
  {
    address: String,
    dateFinished: String,
    price: Number,
    cost: Number,
    profit: Number,
    margin: Number,
    bonus: Number,
  },
  { collection: "bonus" }
);
