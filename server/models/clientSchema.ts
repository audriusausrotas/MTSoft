import { defineMongooseModel } from "#nuxt/mongoose";
import type { Client } from "~/data/interfaces";

export const clientSchema = defineMongooseModel<Client>(
  "clientSchema",
  {
    username: {
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
  },
  { collection: "clients" }
);
