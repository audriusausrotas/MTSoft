import { defineMongooseModel } from "#nuxt/mongoose";
import type { PotentialClient } from "~/data/interfaces";

export const potentialClientSchema = defineMongooseModel<PotentialClient>(
  "potentialClientSchema",
  {
    name: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    status: {
      type: String,
      required: false,
      default: "",
    },
    send: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { collection: "potentialClients" }
);
