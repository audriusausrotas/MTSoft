import { defineMongooseModel } from "#nuxt/mongoose";

interface Product {
  name: string;
  price: string;
  cost?: string;
  category: string;
  image: string;
}

export const productSchema = defineMongooseModel<Product>(
  "productSchema",
  {
    name: String,
    price: String,
    cost: {
      type: String,
      required: false,
      default: "",
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
