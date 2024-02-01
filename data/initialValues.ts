import type {
  Client,
  Measure,
  Result,
  MenuLinks,
  FenceMeasure,
} from "~/data/interfaces";

export const clientInitialValue: Client = {
  username: "",
  address: "",
  phone: "",
  email: "",
};

export const initialResultData: Result = {
  id: "",
  type: "",
  quantity: 0,
  color: "",
  space: 0,
  price: 0,
  height: 0,
  direction: "",
  twoSided: "Ne",
  seeThrough: "",
  totalPrice: 0,
  cost: 0,
  totalCost: 0,
  profit: 0,
  margin: 0,
  isNew: false,
  category: "",
};

export const menuLinks: MenuLinks[] = [
  { name: "Projektai", link: "/", iconPath: "/icons/projects.svg" },
  {
    name: "Skaičiuoklė",
    link: "/skaiciuokle",
    iconPath: "/icons/calculations.svg",
  },
  { name: "Sąmata", link: "/samata", iconPath: "/icons/projects.svg" },
  { name: "Kainos", link: "/kainos", iconPath: "/icons/prices.svg" },
];
export const createInitialMeasure = (): Measure => ({
  length: 0,
  height: 0,
  MeasureSpace: 0,
  elements: 0,
  gates: {
    exist: false,
    type: "Stumdomi",
    automatics: "Taip",
    aditional: "",
    direction: "Vidus Kairė",
    lock: "Paprasta",
  },
  kampas: {
    exist: false,
    value: "",
  },
  laiptas: {
    exist: false,
    value: "",
  },
});

export const defaultValues = {
  poleMain: "Stulpas tvorai 60X40 mm, h3.0 m., sienelė: 2.0 mm",
  poleAlt: "Stulpas tvorai 60X40 mm, h2.4 m., sienelė: 1.25 mm",
  gatePoleMain: "Stulpas vartams 80X80 mm, h3.0 m., sienelė: 2.0 mm",
  gatePoleAlt: "Stulpas vartams 100x100 mm, h3.0 m., sienelė: 3.0 mm",
  border: "Tvoros pamatas tiesus LYGUS, betoninis 2500x200x50 mm",
  borderHolder: "Laikiklis pamato metalinis 200X50 mm",
  crossbar: "Skersinis tvorai 20x40 mm, l2.5 m.",
  crossbarHolders: "Laikiklis skersinio 20x40mm, įkišamas, plieninis, 2.0mm",
  rivets: "Kniedės 4.0 x 8.0 mm. 1000 vnt.",
  bindings: "Apkaustai",
  segment: "Segmentas tvorai, 2,5x1,53 m., [200x50mm]",
  segmentHolders: "Apkaba segmentui 60x40 mm. universali",
  gates: "Stumdomi kiemo vartai su montavimu",
  gates2: "Varstomi kiemo vartai su montavimu",
  gatesAuto: "Stumdomi kiemo vartai su automatika ir montavimu",
  gates2Auto: "Varstomi kiemo vartai su automatika ir montavimu",
  smallGates: "Kiemo varteliai su montavimu",
};

export const fenceMeasures: FenceMeasure[] = [
  {
    name: "Daimond 60/90",
    height: 9,
    width: 6,
    seeThrough: [2.5, 3, 4, 5, 4.5, 9],
  },
  {
    name: "Daimond 40/105",
    height: 10.5,
    width: 4,
    seeThrough: [2.5, 3, 4, 5, 5.25, 10.5],
  },
  {
    name: "Plank",
    height: 11,
    width: 4,
    seeThrough: [1, 2, 3, 4, 5.5, 11],
  },
  {
    name: "Žaliuzi",
    height: 0,
    width: 0,
    seeThrough: [1, 1, 1, 1, 1, 1],
  },
  {
    name: "Dilė",
    height: 8.6,
    width: 2,
    seeThrough: [1, 2, 3, 4, 4.3, 8.6],
  },
  {
    name: "Dija",
    height: 10.9,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.45, 10.9],
  },
  {
    name: "Eglė",
    height: 0,
    width: 0,
    seeThrough: [1, 1, 1, 1, 1, 1],
  },
  {
    name: "Alba",
    height: 10.9,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.45, 10.9],
  },
  {
    name: "Standard",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Sigma",
    height: 11.8,
    width: 2.3,
    seeThrough: [1, 2, 3, 4, 5.9, 11.8],
  },
  {
    name: "Astra",
    height: 9.1,
    width: 1.5,
    seeThrough: [1, 2, 3, 4, 4.5, 9.1],
  },
  {
    name: "Polo",
    height: 11,
    width: 1.6,
    seeThrough: [1, 2, 3, 4, 5.5, 11],
  },
  {
    name: "EVA",
    height: 11.5,
    width: 1,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "EVA3",
    height: 11.5,
    width: 1,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Estetic",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Emka",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
];
