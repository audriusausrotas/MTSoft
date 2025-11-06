import type {
  Client,
  Measure,
  Result,
  MenuLinks,
  Works,
  Fence,
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
  done: false,
};

export const initialResultData: Result = {
  id: "",
  name: "",
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
  category: "",
  width: null,
  delivered: false,
  ordered: false,
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
  { name: "Sandėlys", link: "/sandelys", iconPath: "" },
  { name: "Užsakymai", link: "/uzsakymai", iconPath: "" },
  { name: "Vartai", link: "/vartai", iconPath: "" },
];

export const optionLinks: MenuLinks[] = [
  { name: "Pasiūlymai", link: "/pasiulymai", iconPath: "" },
  { name: "Kainos", link: "/kainos", iconPath: "/icons/prices.svg" },
  { name: "Vartotojai", link: "/vartotojai", iconPath: "/icons/users.svg" },
  { name: "Klientai", link: "/klientai", iconPath: "/icons/users.svg" },
  { name: "Tiekėjai", link: "/tiekejai", iconPath: "/icons/users.svg" },
  { name: "Nustatymai", link: "/nustatymai", iconPath: "/icons/users.svg" },
  { name: "Archyvas", link: "/archyvas/baigti", iconPath: "" },
];

export const createInitialMeasure = (): Measure => ({
  length: 0,
  height: 0,
  MeasureSpace: 0,
  elements: 0,
  gates: {
    exist: false,
    name: "Stumdomi",
    automatics: "Taip",
    comment: "",
    direction: "Nežinoma",
    lock: "Paprasta",
    bankette: "Taip",
    option: "Gaminami",
  },
  kampas: {
    exist: false,
    value: 90,
    comment: "",
  },
  laiptas: {
    exist: false,
    value: 0,
    direction: "Aukštyn",
  },
});
