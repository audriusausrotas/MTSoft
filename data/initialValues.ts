import type {
  Client,
  Measure,
  Result,
  MenuLinks,
  Fence,
} from "~/data/interfaces";

export const clientInitialValue: Client = {
  username: "",
  address: "",
  phone: "",
  email: "",
};

export const initialMeasure: Measure = {
  length: null,
  height: null,
  MeasureSpace: null,
  gates: {
    exist: false,
    type: "Stumdomi",
    automatics: "Taip",
    aditional: "",
    direction: "Vidus Kairė",
    lock: "Paprasta",
  },

  elements: 0,
  kampas: {
    exist: false,
    value: "",
  },
  laiptas: {
    exist: false,
    value: "",
  },
};

export const initialFence: Fence = {
  id: "",
  side: "Priekis",
  type: "Daimond 60/90",
  color: "7016",
  material: "Matinė",
  seeThrough: "Nepramatoma",
  direction: "Horizontali",
  services: "Medžiagos, Montavimas",
  parts: "Borteliai, Stulpai",
  twoSided: "Ne",
  aditional: "",
  space: 3,
  elements: 0,
  totalLength: 0,
  totalSQ: 0,
  measures: [{ ...initialMeasure }],
};

export const initialResultData: Result = {
  id: "",
  name: "",
  quantity: 0,
  color: "",
  space: 0,
  price: 0,
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
