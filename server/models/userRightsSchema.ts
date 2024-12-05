import { defineMongooseModel } from "#nuxt/mongoose";
import type { UserRights } from "~/data/interfaces";

export const userRightsSchema = defineMongooseModel<UserRights>(
  "userRightsSchema",
  {
    accountType: {
      type: String,
      unique: true,
    },
    project: {
      type: Boolean,
      required: false,
      default: false,
    },
    schedule: {
      type: Boolean,
      required: false,
      default: false,
    },
    production: {
      type: Boolean,
      required: false,
      default: false,
    },
    installation: {
      type: Boolean,
      required: false,
      default: false,
    },
    gate: {
      type: Boolean,
      required: false,
      default: false,
    },
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { collection: "userRights" }
);
