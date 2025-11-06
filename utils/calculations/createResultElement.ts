import type { Result } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";
import getProductPrice from "./getProductPrice";
import getFencePrice from "./getFencePrice";

export default function createResultElement(item: any) {
  const retail = useCalculationsStore().retail;
  const units = useCalculationsStore().units;
  const results = useResultsStore();
  const backupStore = useBackupStore();
  const backupExist = backupStore.backupExist;
  const backup = backupStore.results.find(
    (i) =>
      i.name
        .replace(" Eco", "")
        .replace(" Premium", "")
        .toLowerCase()
        .trim() === item.name.toLowerCase().trim()
  );

  let product: any = getProductPrice(item.name);

  let nameUpdate = "";
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
      price = retail ? product.prices.priceRetail : product.prices.wholesale;
    }
  } else {
    product = getFencePrice(item.name);

    if (!product) return;

    const retailCheck = backup?.retail === retail || null;

    if (product?.category === "Tvora") {
      nameUpdate = item.manufacturer === "Ukraina" ? " Eco" : " Premium";

      const checkSeethrough = item.seeThrough === backup?.seeThrough || null;
      const checkManufacturer = backup?.name.includes(nameUpdate) || null;
      const checkUnits = units === backup?.units || null;
      const checkName =
        item.name
          .replace(" Eco", "")
          .replace(" Premium", "")
          .toLowerCase()
          .trim() ===
          backup?.name
            .replace(" Eco", "")
            .replace(" Premium", "")
            .toLowerCase()
            .trim() || null;

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
    name: item.name + nameUpdate,
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
    category: item.category || "",
    width: item.width || 0,
    delivered: false,
    ordered: false,
    retail,
    units,
  };

  results.results.push(resultData);
}

// change gate prices
// if (item.name.includes("vartai") && !backupStore.backupExist) {
//   if (item.name.includes("segmentiniai")) {
//     if (item.width > 400) {
//       newPrice += 60;
//       newCost += 60;
//     }

//     if (item.height > 140) {
//       newPrice += 30;
//       newCost += 30;
//     }
//     if (item.height > 165) {
//       newPrice += 50;
//       newCost += 50;
//     }
//   } else {
//     if (item.width > 400) {
//       newPrice += 200;
//       newCost += 200;
//     }
//     if (item.width > 500) {
//       newPrice += 120;
//       newCost += 120;
//     }
//     if (item.width > 600) {
//       newPrice += 300;
//       newCost += 300;
//     }
//     if (item.width > 700) {
//       newPrice += 400;
//       newCost += 400;
//     }
//     if (item.width > 800) {
//       newPrice += 300;
//       newCost += 300;
//     }
//   }
// }

// if (
//   item.name === "Kiemo varteliai segmentiniai" &&
//   !backupStore.backupExist
// ) {
//   if (item.height > 110) {
//     newPrice += 20;
//     newCost += 20;
//   }
//   if (item.height > 140) {
//     newPrice += 20;
//     newCost += 20;
//   }
//   if (item.height > 165) {
//     newPrice += 20;
//     newCost += 20;
//   }
//   if (item.height > 185) {
//     newPrice += 20;
//     newCost += 20;
//   }
// }
