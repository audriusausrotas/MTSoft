import { defineMongooseModel } from "#nuxt/mongoose";

export const projectSchema = defineMongooseModel(
  "projectSchema",
  {
    client: {
      type: Object,
      required: false,
      default: {},
    },
    fenceMeasures: {
      type: Array,
      required: false,
      default: [],
    },
    results: {
      type: Array,
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
