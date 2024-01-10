import { defineMongooseModel } from "#nuxt/mongoose";

interface Client {}

interface CalculatedParts {}

interface Project {
  client: Client;
  fenceMeasures?: any[];
  results?: any[];
  calculatedParts: CalculatedParts;
  confirmed?: boolean;
  advance?: boolean;
  payed?: boolean;
  status?: string;
  creator: string;
  orderNumber: string;
}

export const projectSchema = defineMongooseModel<Project>(
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
