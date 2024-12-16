import type {
  Client,
  Measure,
  Result,
  MenuLinks,
  FenceMeasure,
  Works,
} from "~/data/interfaces";

export const clientInitialValue: Client = {
  username: "",
  address: "",
  phone: "",
  email: "",
};

export const initialWorkData: Works = {
  id: "",
  name: "",
  quantity: 0,
  price: 0,
  cost: 0,
  totalCost: 0,
  totalPrice: 0,
  margin: 0,
  profit: 0,
  isNew: false,
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
  width: null,
};

export const navigationLinks: MenuLinks[] = [
  { name: "Projektai", link: "/", iconPath: "/icons/projects.svg" },
  { name: "Grafikas", link: "/grafikas", iconPath: "" },
  {
    name: "Gamyba",
    link: "/gamyba",
    iconPath: "",
  },
  { name: "Montavimas", link: "/montavimas", iconPath: "" },
  { name: "Vartai", link: "/vartai", iconPath: "" },
];

export const optionLinks: MenuLinks[] = [
  { name: "Kainos", link: "/kainos", iconPath: "/icons/prices.svg" },
  { name: "Vartotojai", link: "/vartotojai", iconPath: "/icons/users.svg" },
  { name: "Klientai", link: "/klientai", iconPath: "/icons/users.svg" },
  { name: "Nustatymai", link: "/nustatymai", iconPath: "/icons/users.svg" },
  { name: "Archyvas", link: "/archyvas/archyvas", iconPath: "" },
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
    bankette: "Taip",
    option: "Gaminami",
  },
  kampas: {
    exist: false,
    value: 90,
    aditional: "",
  },
  laiptas: {
    exist: false,
    value: 0,
    direction: "Aukštyn",
  },
});

export const fenceMeasures: FenceMeasure[] = [
  {
    name: "Daimond 60/90",
    height: 9,
    width: 6,
    seeThrough: [2, 3, 4, 5, 4.5, 9],
  },
  {
    name: "Daimond 40/105",
    height: 10.5,
    width: 4,
    seeThrough: [1.5, 2.5, 3.5, 4.5, 5.25, 10.5],
  },
  {
    name: "Plank",
    height: 11,
    width: 4,
    seeThrough: [1, 2, 3, 4, 5.5, 11],
  },
  {
    name: "Žaliuzi",
    height: 6.5,
    width: 6,
    seeThrough: [1.5, 2, 3, 4, 3.25, 6.5],
  },
  {
    name: "Dilė 105mm",
    height: 10.6,
    width: 2,
    seeThrough: [1, 2, 3, 4, 4.3, 8.6],
  },
  {
    name: "Dilė 135mm",
    height: 10.6,
    width: 2,
    seeThrough: [1, 2, 3, 4, 4.3, 8.6],
  },
  {
    name: "Dilė 190mm",
    height: 10.6,
    width: 2,
    seeThrough: [1, 2, 3, 4, 4.3, 8.6],
  },
  {
    name: "Eglė",
    height: 11,
    width: 6,
    seeThrough: [0, 0, 1, 2, 5.5, 11],
  },
  {
    name: "Tvoralentė Alba",
    height: 10.9,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.45, 10.9],
  },
  {
    name: "Tvoralentė Standard",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Tvoralentė Sigma",
    height: 11.8,
    width: 2.3,
    seeThrough: [1, 2, 3, 4, 5.9, 11.8],
  },
  {
    name: "Tvoralentė Astra",
    height: 9.1,
    width: 1.5,
    seeThrough: [1, 2, 3, 4, 4.5, 9.1],
  },
  {
    name: "Tvoralentė Polo",
    height: 11,
    width: 1.6,
    seeThrough: [1, 2, 3, 4, 5.5, 11],
  },
  {
    name: "Tvoralentė EVA",
    height: 11.5,
    width: 1,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Tvoralentė EVA3",
    height: 11.5,
    width: 1,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Tvoralentė Estetic",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Tvoralentė Emka",
    height: 11.5,
    width: 1.8,
    seeThrough: [1, 2, 3, 4, 5.75, 11.5],
  },
  {
    name: "Segmentas 2,5x1,03 m, 4mm",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
  {
    name: "Segmentas 2,5x1,23 m, 4mm",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
  {
    name: "Segmentas 2,5x1,53 m, 4mm",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
  {
    name: "Segmentas 2,5x1,73 m, 4mm",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
  {
    name: "Segmentas 2,5x2,03 m, 4mm",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
  {
    name: "Daimond 60/90 metras",
    height: 9,
    width: 6,
    seeThrough: [2, 3, 4, 5, 4.5, 9],
  },
  {
    name: "Daimond 60/120 metras",
    height: 12,
    width: 6,
    seeThrough: [2, 3, 4, 5, 4.5, 9],
  },
  {
    name: "Daimond 40/105 metras",
    height: 10.5,
    width: 4,
    seeThrough: [1.5, 2.5, 3.5, 4.5, 5.25, 10.5],
  },
  {
    name: "Plank 40/110 metras",
    height: 11,
    width: 4,
    seeThrough: [1, 2, 3, 4, 5.5, 11],
  },
  {
    name: "Žaliuzi 60/65 metras",
    height: 6.5,
    width: 6,
    seeThrough: [2, 3, 4, 5, 4.5, 9],
  },
  {
    name: "Namelis 60/105 metras",
    height: 10.5,
    width: 6,
    seeThrough: [2, 3, 4, 5, 4.5, 9],
  },
];
