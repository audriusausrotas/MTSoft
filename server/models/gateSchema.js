import { defineMongooseModel } from "#nuxt/mongoose";

export const gateSchema = defineMongooseModel(
  "gateSchema",
  {
    client: String,
    phone: String,
    address: String,
    type: String,
    auto: Boolean,
    width: Number,
    height: Number,
    color: String,
    filling: String,
    ready: {
      type: Boolean,
      required: false,
      default: false,
    },
    aditional: {
      type: Array,
      required: false,
      default: []
    },
    smallGates: {
      type: Object,
      required: false,
      default: {},
    }

    
  },
  { collection: "gates" }
);
