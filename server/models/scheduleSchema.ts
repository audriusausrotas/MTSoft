import { defineMongooseModel } from "#nuxt/mongoose";
import { Schedule } from "~/data/interfaces";

export const scheduleSchema = defineMongooseModel<Schedule>(
  "scheduleSchema",
  {
    date: String,
    worker: Object,
    jobs: [Object],
    comment: {
      type: String,
      required: false,
      default: "",
    },
  },
  { collection: "schedule" }
);
