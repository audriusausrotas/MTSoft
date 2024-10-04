export const laserInstructions = [
  {
    name: "Adresas",
    command: "ad.",
    example: "ad.Kauno,5,Marijampolė",
    aditional: "Žodžius atskiriame kableliais",
  },
  {
    name: "Kliento vardas",
    command: "kl.",
    example: "kl.jonas,jonaitis",
    aditional: "Žodžius atskiriame kableliais",
  },
  {
    name: "El. paštas",
    command: "",
    example: "moderni@tvora.lt",
    aditional: "turi turėti @",
  },
  { name: "Telefonas", command: "tel.", example: "tel.012345678", aditional: "pradėti su 0" },
  {
    name: "Sukurti tvorą",
    command: "p k d g priekis galas desine kaire",
    example: "p",
    aditional: "galima su lietuviškomis raidėmis ",
  },
  {
    name: "Tvoros spalva",
    command: "ral.",
    example: "ral.8017",
    aditional: "įveda parašytą spalvos kodą",
  },
  {
    name: "Bendras aukštis",
    command: "ba.",
    example: "ba.1.20",
    aditional: "nustato bendrą tvoros aukštį",
  },
  {
    name: "Tvoros tipas",
    command: "tt.",
    example: "tt.60x60",
    aditional:
      "60x90, 60x90v, 40x105, 60x120, alba, segmentas, plank, zaliuzi, egle, dile, dija, standard, sigma, astra, polo, eva, eva3, estetic, emka. Standartas 60x90, galima su lietuviškomis raidėmis, 60x90v - vertikalus rombas",
  },
  {
    name: "Pramatomumas",
    command: "pr.",
    example: "pr.vidutiniska",
    aditional:
      "aklina, nepramatoma, vidutiniska, pramatoma, 25, 50. standartas nepramatoma, galima su lietuviškomis raidėmis",
  },
  { name: "Apkaustai", command: "apk.", example: "apk.ne", aditional: "taip, ne. Standartas taip" },
  {
    name: "Tvoros kryptis",
    command: "horizontali, vertikali",
    example: "vertikali",
    aditional: "nurodyta tvoros kryptis",
  },
  {
    name: "Ankeriuojami stulpai",
    command: "ankeriuojami",
    example: "ankeriuojami",
    aditional: "nustato tvorai ankeriuojamus stulpus",
  },
  {
    name: "Medžiagos",
    command: "stulpai, borteliai, tvora",
    example: "tvora",
    aditional:
      "standartas su borteliais ir stulpais. Stulpai - tik stulpai, borteliai - tik borteliai, tvora - be bortelių ir stulpų",
  },
  {
    name: "Darbai",
    command: "darbai, medziagos",
    example: "medziagos",
    aditional:
      "standartas medžiagos ir darbai. Darbai - tik darbai, medziagos - tik medžiagos. Galima su lietuviškomis raidėmis",
  },
  {
    name: "tvoralentės dvipusės",
    command: "dvipuse",
    example: "dvipuse",
    aditional: "standartas Ne. Tinka ir lietuviškos raidės",
  },
  {
    name: "Įterpti laiptą",
    command: "la. lz.",
    example: "lz.12",
    aditional:
      "la. - laiptas aukštyn ir laipto aukštis. lz. - laiptas žemyn ir laipto aukštis. Matmenį visada rašyti centimetrais",
  },
  {
    name: "Vartai",
    command: "v. v.Xa v.Xb v.Xe v.Xs v.Xv",
    example: "v.500ba",
    aditional:
      "Standartas stumdomi vartai su automatika ir bankete, varteliai su paprasta spyna. v. - vartai ir vartų ilgis. Po vartų ilgio rašome papildomus vartų duomenis. a - be automatikos, b - be banketės, e - su elektromagnetine spyna, s - vartai segmentiniai, v - varstomi vartai",
  },
  {
    name: "Ilgis",
    command: "1.123",
    example: "2.51",
    aditional: "paprasti skaiciai pagal pasirinktą mato vienetą",
  },
  {
    name: "Aukštis",
    command: "a.",
    example: "a.1.60",
    aditional: "Tarpo aukštis pagal pasirinktą mato vienetą. Svarbu: Turi eiti po tarpo matmens.",
  },
  {
    name: "Išskaičiuoti iš ilgio",
    command: "i.",
    example: "i.45.3",
    aditional: "bendras tvoros ilgis",
  },
];
