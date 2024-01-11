import { defineMongooseModel } from "#nuxt/mongoose";
import type { Project } from "~/data/interfaces";

export const projectSchema = defineMongooseModel<Project>(
  "projectSchema",
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
    calculatedParts: {
      type: Object,
      required: false,
      default: {},
    },
    confirmed: {
      type: Boolean,
      required: false,
      default: false,
    },
    advance: {
      type: Boolean,
      required: false,
      default: false,
    },
    payed: {
      type: Boolean,
      required: false,
      default: false,
    },
    status: {
      type: String,
      required: false,
      default: "Nepatvirtintas",
    },
    creator: String,
    orderNumber: String,
  },
  { collection: "projects" }
);
