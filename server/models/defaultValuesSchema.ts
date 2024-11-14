import { defineMongooseModel } from "#nuxt/mongoose";
import { DefaultValues } from "~/data/interfaces";

export const defaultValuesSchema = defineMongooseModel<DefaultValues>(
  "defaultValuesSchema",
  {
    poleMain: { type: String, required: false, default: "" },
    poleAlt: { type: String, required: false, default: "" },
    gatePoleMain: { type: String, required: false, default: "" },
    gatePoleAlt: { type: String, required: false, default: "" },
    border: { type: String, required: false, default: "" },
    borderHolder: { type: String, required: false, default: "" },
    crossbar: { type: String, required: false, default: "" },
    crossbarHolders: { type: String, required: false, default: "" },
    rivets: { type: String, required: false, default: "" },
    bolts: { type: String, required: false, default: "" },
    bindings: { type: String, required: false, default: "" },
    retailBindings: { type: String, required: false, default: "" },
    retailDoubleLeg: { type: String, required: false, default: "" },
    retailSingleLeg: { type: String, required: false, default: "" },
    segment103: { type: String, required: false, default: "" },
    segment123: { type: String, required: false, default: "" },
    segment153: { type: String, required: false, default: "" },
    segment173: { type: String, required: false, default: "" },
    segment203: { type: String, required: false, default: "" },
    segmentHolders: { type: String, required: false, default: "" },
    gates: { type: String, required: false, default: "" },
    gates2: { type: String, required: false, default: "" },
    gatesAuto: { type: String, required: false, default: "" },
    gates2Auto: { type: String, required: false, default: "" },
    smallGates: { type: String, required: false, default: "" },
    smallGates2: { type: String, required: false, default: "" },
    smallGatesSegment: { type: String, required: false, default: "" },
    segmentGatesWork: { type: String, required: false, default: "" },
    segmentGateWork: { type: String, required: false, default: "" },
    gateSegment: { type: String, required: false, default: "" },
    polesWork: { type: String, required: false, default: "" },
    gatesPoleWork: { type: String, required: false, default: "" },
    gateBnkette: { type: String, required: false, default: "" },
    bordersWork: { type: String, required: false, default: "" },
    transport: { type: String, required: false, default: "" },
    fenceWork: { type: String, required: false, default: "" },
    totalFencesWithBindings: { type: String, required: false, default: "" },
    bindingWork: { type: String, required: false, default: "" },
    fenceboardWork: { type: String, required: false, default: "" },
    crossbarWork: { type: String, required: false, default: "" },
    segmentWork: { type: String, required: false, default: "" },
    anchoredPoleMain: { type: String, required: false, default: "" },
    anchoredPoleAlt: { type: String, required: false, default: "" },
    anchoredPolesWork: { type: String, required: false, default: "" },
    anchoredGatePoleMain: { type: String, required: false, default: "" },
    anchoredGatePoleAlt: { type: String, required: false, default: "" },
    anchoredGatePolesWork: { type: String, required: false, default: "" },
    dileCork: { type: String, required: false, default: "" },
  },

  { collection: "defaultValues" }
);