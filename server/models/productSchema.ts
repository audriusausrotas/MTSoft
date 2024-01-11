import { defineMongooseModel } from "#nuxt/mongoose";
import type { Product } from "~/data/interfaces";

export const productSchema = defineMongooseModel<Product>(
  "productSchema",
  {
    name: String,
    price: String,
    cost: {
      type: Number,
      required: false,
      default: 0,
    },
    category: {
      type: String,
      required: false,
      default: "other",
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  { collection: "products" }
);
