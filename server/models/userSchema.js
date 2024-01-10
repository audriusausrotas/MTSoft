import { defineMongooseModel } from "#nuxt/mongoose";

export const userSchema = defineMongooseModel(
  "userSchema",
  {
    email: String,
    password: String,
    username: String,
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    photo: {
      type: String,
      required: false,
      default: "",
    },
  },
  { collection: "users" }
);
