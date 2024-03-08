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
};

export const topBarLinks: MenuLinks[] = [
  { name: "Projektai", link: "/", iconPath: "/icons/projects.svg" },
  {
    name: "Gamyba",
    link: "/gamyba",
    iconPath: "",
  },
  { name: "Montavimas", link: "/montavimas", iconPath: "" },
  { name: "Vartonas", link: "/vartonas", iconPath: "" },
  { name: "Archyvas", link: "/archyvas", iconPath: "" },
];

export const adminPanelLinks: MenuLinks[] = [
  { name: "Kainos", link: "/kainos", iconPath: "/icons/prices.svg" },
  { name: "Vartotojai", link: "/admin", iconPath: "/icons/users.svg" },
];
export const menuLinks: MenuLinks[] = [
  { name: "Projektai", link: "/", iconPath: "/icons/projects.svg" },
  {
    name: "Skaičiuoklė",
    link: "/skaiciuokle",
    iconPath: "/icons/calculations.svg",
  },
  { name: "Sąmata", link: "/samata", iconPath: "/icons/projects.svg" },
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
  poleMain: "Stulpas tvorai 60x40x3000, 2.0 mm",
  poleAlt: "Stulpas tvorai 60x40x2500 mm, 1.3mm",
  gatePoleMain: "Stulpas vartams 80x80x3000 mm, 2.0 mm",
  gatePoleAlt: "Stulpas vartams 100x100x3000 mm, 3.0 mm",
  border: "Tvoros pamatas 2500x200x50 mm",
  borderHolder: "Pamato laikiklis 200x50 mm",
  crossbar: "Skersinis tvorai 20x40 mm, l2.5 m",
  crossbarHolders: "Laikiklis skersinio 20x40mm, vidinis",
  rivets: "Kniedės 1000 vnt.",
  bolts: "Sąvisriegiai 1000 vnt.",
  bindings: "Apkaustai",
  segment103: "Segmentas tvorai, 2,5x1,03 m, 4mm",
  segment123: "Segmentas tvorai, 2,5x1,23 m, 4mm",
  segment153: "Segmentas tvorai, 2,5x1,53 m, 4mm",
  segment173: "Segmentas tvorai, 2,5x1,73 m, 4mm",
  segment203: "Segmentas tvorai, 2,5x2,03 m, 4mm",
  segmentHolders: "Apkaba segmentui 60x40 mm",
  gates: "Stumdomi kiemo vartai su montavimu",
  gates2: "Varstomi kiemo vartai su montavimu",
  gatesAuto: "Stumdomi kiemo vartai su automatika ir montavimu",
  gates2Auto: "Varstomi kiemo vartai su automatika ir montavimu",
  smallGates: "Kiemo varteliai su montavimu",
  polesWork: "Tvoros stulpo betonavimas",
  gatesPoleWork: "Vartų stulpo betonavimas",
  gateBnkette: "Vartų pamato betonavimas",
  poleAnchoringWork: "Ankeriuojamo stulpo Montavimas",
  bordersWork: "Pamatėlio montavimas",
  transport: "Transportas",
  fenceWork: "Tvoros montavimas",
  totalFencesWithBindings: "Tvoros montavimas su apkaustais",
  bindingWork: "Apkaustų montavimas",
  fenceboardWork: "Tvoralentės montavimas",
  crossbarWork: "Skersinio montavimas",
  segmentWork: "Segmento montavimas",
  anchoredPoleMain: "Ankeriuojamas stulpas tvorai 60x40x1500 mm, 2.0 mm",
  anchoredPoleAlt: "Ankeriuojamas stulpas tvorai 60x40x2000 mm, 2.0 mm",
  anchoredPolesWork: "Ankeriuojamo stulpo montavimas",
  anchoredGatePoleMain: "Ankeriuojamas stulpas vartams 80x80x1500 mm, 2.0 mm",
  anchoredGatePoleAlt: "Ankeriuojamas stulpas vartams 80x80x2000 mm, 2.0 mm",
  anchoredGatePolesWork: "Ankeriuojamo vartų stulpo montavimas",
  dileCork: "Tvoralentės kamštelis",
};

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
    name: "Dilė",
    height: 10.6,
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
    height: 11,
    width: 6,
    seeThrough: [0, 0, 1, 2, 5.5, 11],
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
  {
    name: "Segmentas",
    height: 0,
    width: 250,
    seeThrough: [0, 0, 0, 0, 0, 0],
  },
];
