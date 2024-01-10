import { defineMongooseModel } from "#nuxt/mongoose";

interface Gate {
  client: string;
  phone: string;
  address: string;
  type: string;
  auto: boolean;
  width: number;
  height: number;
  color: string;
  filling: string;
  ready: boolean;
  aditional: any[];
  smallGates: any[];
}

export const gateSchema = defineMongooseModel<Gate>(
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
      default: [],
    },
    smallGates: {
      type: Array,
      required: false,
      default: {},
    },
  },
  { collection: "gates" }
);
