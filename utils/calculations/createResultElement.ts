import type { Result } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";
import getProductPrice from "./getProductPrice";
import getFencePrice from "./getFencePrice";

export default function createResultElement(item: any) {
  const calculationStore = useCalculationsStore();
  const retail = calculationStore.retail;
  const units = calculationStore.units;
  const results = useResultsStore();
  const backupStore = useBackupStore();
  const backupExist = backupStore.backupExist;
  const backup = backupStore.results.find(
    (i) => i.name.toLowerCase().trim() === item.name.toLowerCase().trim()
  );

  let product: any = getProductPrice(item.name);
  let cost = 0;
  let price = 0;

  if (product) {
    if (
      backupExist &&
      backup &&
      backup.retail === retail &&
      units === backup.units
    ) {
      cost = backup.cost;
      price = backup.price;
    } else {
      cost = product.prices.cost;
      price = retail
        ? product.prices.priceRetail
        : product.prices.priceWholesale;
    }
  } else {
    product = getFencePrice(item.name);

    if (!product) return;

    const retailCheck = backup?.retail === retail || null;

    if (product?.category === "Tvora") {
      const checkSeethrough = item.seeThrough === backup?.seeThrough || null;
      const checkManufacturer = backup?.manufacturer || null;
      const checkUnits = units === backup?.units || null;
      const checkName =
        item.name.toLowerCase().trim() === backup?.name.toLowerCase().trim() ||
        null;

      if (
        backupExist &&
        backup &&
        checkSeethrough &&
        checkManufacturer &&
        retailCheck &&
        checkName &&
        checkUnits
      ) {
        cost = backup.cost;
        price = backup.price;
      } else {
        const fenceRename = units
          ? String(item.seeThrough)
              .replace("š", "s")
              .replace("25% Pramatomumas", "pramatoma25")
              .replace("50% Pramatomumas", "pramatoma50")
              .toLowerCase()
          : "meter";

        const source =
          item.manufacturer === "Ukraina"
            ? product.prices.eco
            : product.prices.premium;

        const fenceData = source[fenceRename as keyof typeof source];

        cost = +fenceData.cost;
        price = retail ? +fenceData.priceRetail : +fenceData.priceWholesale;
      }
      // if fenceboard
    } else if (product.category === "Tvoralentė") {
      price = +(
        ((retail ? product.prices.priceRetail : product.prices.priceWholesale) *
          item.height) /
        100
      ).toFixed(2);
      cost = +((product.prices.cost * item.height) / 100).toFixed(2);

      // other parts
    } else {
      price = retail
        ? +product.prices.priceRetail
        : +product.prices.priceWholesale;
      cost = +product.prices.cost;
    }
  }

  const totalPrice = +(price * item.quantity).toFixed(2);
  const totalCost = +(cost * item.quantity).toFixed(2);
  const profit = +(totalPrice - totalCost).toFixed(2);
  const margin = +(Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData: Result = {
    id: uuidv4(),
    name: item.name,
    quantity: +item.quantity.toFixed(2),
    color: item.color || "",
    height: item.height || 0,
    space: item.space || 0,
    twoSided: item.twoSided || "",
    direction: item.direction || "",
    seeThrough: item.seeThrough || "",
    price,
    totalPrice: +totalPrice,
    cost,
    totalCost: +totalCost,
    profit: +profit,
    margin: +margin,
    category: product.category || "",
    width: item.width || 0,
    delivered: false,
    ordered: false,
    retail,
    units,
    material: item.material || "",
    manufacturer: item.manufacturer || "",
  };

  results.results.push(resultData);
}
