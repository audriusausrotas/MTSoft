import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema } from "mongoose";
import type { Montavimas } from "~/data/interfaces";

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
  done: { type: Number, default: undefined },
  postone: { type: Boolean, default: false },
  kampas: { type: kampasSchema, default: () => ({}) },
  laiptas: { type: laiptasSchema, default: () => ({}) },
});

const resultSchema = new Schema({
  type: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  color: { type: String, default: "" },
  width: { type: Number, default: 0 },
  category: { type: String, default: "" },
  delivered: { type: Boolean, required: false, default: false },
});

const workSchema = new Schema({
  name: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  delivered: { type: Boolean, required: false, default: false },
});

const fenceSchema = new Schema({
  id: String,
  side: String,
  type: String,
  color: String,
  material: String,
  services: String,
  seeThrough: String,
  direction: String,
  parts: String,
  aditional: String,
  twoSided: String,
  bindings: String,
  anchoredPoles: String,
  space: Number,
  elements: Number,
  totalLength: Number,
  totalQuantity: Number,
  startBinding: String,
  endBinding: String,
  measures: { type: [measureSchema], default: [] },
});

export const montavimasSchema = defineMongooseModel<Montavimas>(
  "montavimasSchema",
  {
    client: Object,
    creator: Object,
    orderNumber: String,
    workers: [String],
    status: {
      type: String,
      required: false,
      default: "Montuojama",
    },
    fences: {
      type: [fenceSchema],
      default: [],
    },
    results: {
      type: [resultSchema],
      default: [],
    },
    works: {
      type: [workSchema],
      default: [],
    },
    aditional: {
      type: [Object],
      required: false,
      default: [],
    },
    files: {
      type: [Object],
      required: false,
      default: [],
    },
  },
  { collection: "montavimas" }
);
