import { defineMongooseModel } from "#nuxt/mongoose";
import type { Project } from "~/data/interfaces";

export const backupSchema = defineMongooseModel<Project>(
  "backupSchema",
  {
    client: {
      type: Object,
      required: false,
      default: {},
    },
    fenceMeasures: {
      type: [Object],
      required: false,
      default: [],
    },
    results: {
      type: [Object],
      required: false,
      default: [],
    },
    works: {
      type: [Object],
      required: false,
      default: [],
    },
    gates: {
      type: [Object],
      required: false,
      default: [],
    },
    advance: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      required: false,
      default: "Nepatvirtintas",
    },
    files: {
      type: [Object],
      required: false,
      default: [],
    },
    versions: {
      type: [Object],
      required: false,
      default: [],
    },
    creator: Object,
    orderNumber: String,
    totalPrice: Number,
    totalCost: Number,
    totalProfit: Number,
    totalMargin: Number,
    priceVAT: Number,
    priceWithDiscount: Number,
    discount: Boolean,
    dateCreated: String,
    dateExparation: String,
  },
  { collection: "backup" }
);
