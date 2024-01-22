import type { FenceMeasures } from "~/data/interfaces";

export const fenceSide: string[] = ["priekis", "galas", "kairė", "dešinė"];
export const fenceMaterials: string[] = ["Matinė", "Blizgi", "IceCrystal"];
export const categories: string[] = [
  "tvoros",
  "stulpai",
  "borteliai",
  "skersiniai",
  "laikikliai",
  "vartai",
  "kita",
];
export const gateDirection: string[] = [
  "Vidus Kairė",
  "Vidus Dešinė",
  "Išorė Kairė",
  "Išorė Dešinė",
];
export const gateLock: string[] = ["Paprasta", "Elektromagnetinė"];
export const gateTypes: string[] = ["Stumdomi", "Varstomi"];
export const fenceColors: string[] = [
  "7016",
  "7024",
  "8019",
  "8017",
  "6020",
  "6005",
  "9005",
  "3009",
  "Kita",
];
export const fenceTypes: string[] = [
  "Daimond 60/90",
  "Daimond 40/105",
  "Alba",
  "Segmentas",
  "Plank",
  "Žaliuzi",
  "Eglė",
  "Dilė",
  "Dija",
  "Standard",
  "Sigma",
  "Astra",
  "Polo",
  "EVA",
  "EVA3",
  "Estetic",
  "Emka",
];

export const horizontals: string[] = [
  "Daimond 60/90",
  "Daimond 40/105",
  "Alba",
  "Plank",
  "Eglė",
  "Dilė",
  "Dija",
  "Standard",
  "Sigma",
  "Astra",
  "Polo",
  "EVA",
  "EVA3",
  "Estetic",
  "Emka",
];

export const verticals: string[] = [
  "Alba",
  "Dilė",
  "Dija",
  "Standard",
  "Sigma",
  "Astra",
  "Polo",
  "EVA",
  "EVA3",
  "Estetic",
  "Emka",
];

export const pramatomumas: string[] = [
  "Aklina",
  "Nepramatoma",
  "Vidutiniškai Pramatoma",
  "Pramatoma",
  "25% Pramatomumas",
  "50% pramatomumas",
];

export const fenceDirection: string[] = ["Vertikali", "Horizontali"];

export const services: string[] = [
  "Medžiagos, Montavimas",
  "Tik Medžiagos",
  "Tik Montavimas",
];

export const parts: string[] = [
  "Borteliai, Stulpai",
  "Tik Stulpai",
  "Tik Borteliai",
  "Be Bortelių Ir Stulpų",
];

export const twoSided: string[] = ["Taip", "Ne"];

export const fenceMeasures: FenceMeasures = {
  Daimond60: {
    height: 9,
    width: 6,
  },
  Daimond40: {
    height: 10.5,
    width: 4,
  },
  Plank: {
    height: 11,
    width: 4,
  },
  Žaliuzi: {
    height: 0,
    width: 0,
  },
  Dilė: {
    height: 8.6,
    width: 2,
  },
  Dija: {
    height: 10.9,
    width: 1.8,
  },
  Eglė: {
    height: 0,
    width: 0,
  },
  Alba: {
    height: 10.9,
    width: 1.8,
  },
  Standard: {
    height: 11.5,
    width: 1.8,
  },
  Sigma: {
    height: 11.8,
    width: 2.3,
  },
  Astra: {
    height: 9.1,
    width: 1.5,
  },
  Polo: {
    height: 11,
    width: 1.6,
  },
  Eva: {
    height: 11.5,
    width: 1,
  },
  Eva3: {
    height: 11.5,
    width: 1,
  },
  Estetic: {
    height: 11.5,
    width: 1.8,
  },
  Emka: {
    height: 11.5,
    width: 1.8,
  },
};
