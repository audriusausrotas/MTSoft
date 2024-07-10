import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema } from "mongoose";
import type { Gamyba } from "~/data/interfaces";

const gatesSchema = new Schema({
  exist: { type: Boolean, default: false },
  type: { type: String, default: "" },
  automatics: { type: String, default: "" },
  aditional: { type: String, default: "" },
  direction: { type: String, default: "" },
  lock: { type: String, default: "" },
  bankette: { type: String, default: "" },
  option: { type: String, default: "" },
});

const kampasSchema = new Schema({
  exist: { type: Boolean, default: false },
  value: { type: Number, default: 0 },
  aditional: { type: String, default: "" },
});

const laiptasSchema = new Schema({
  exist: { type: Boolean, default: false },
  value: { type: Number, default: 0 },
  direction: { type: String, default: "" },
});

const measureSchema = new Schema({
  length: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  MeasureSpace: { type: Number, default: 0 },
  elements: { type: Number, default: 0 },
  gates: { type: gatesSchema, default: () => ({}) },
  cut: { type: Number, default: 0 },
  done: { type: Number, default: 0 },
  postone: { type: Boolean, default: false },
  kampas: { type: kampasSchema, default: () => ({}) },
  laiptas: { type: laiptasSchema, default: () => ({}) },
});

const fenceSchema = new Schema({
  measures: { type: [measureSchema], default: [] },
});

export const gamybaSchema = defineMongooseModel<Gamyba>(
  "gamybaSchema",
  {
    client: Object,
    creator: Object,
    orderNumber: String,
    fences: {
      type: [fenceSchema],
      default: [],
    },
    bindings: {
      type: Array,
      required: false,
      default: [],
    },
    aditional: {
      type: [Object],
      required: false,
      default: [],
    },
  },
  { collection: "gamyba" }
);
