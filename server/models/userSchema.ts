import { defineMongooseModel } from "#nuxt/mongoose";

interface User {
  email: string;
  password: string;
  username: string;
  verified?: boolean;
  admin: boolean;
  photo: string;
}

export const userSchema = defineMongooseModel<User>(
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
