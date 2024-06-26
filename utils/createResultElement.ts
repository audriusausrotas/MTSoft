import getPriceItem from "~/utils/getPriceItem";
import type { Result, Product } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";
import { verticals } from "~/data/selectFieldData";

export default function createResultElement(item: any) {
  const results = useResultsStore();
  const useBackup = useBackupStore();
  const product: Product = getPriceItem(item.type);

  let newPrice: number = Number(product.price);
  let newCost: number = Number(product.cost);

  // change gate prices
  if (item.type.includes("vartai") && !useBackup.backupExist) {
    if (item.type.includes("segmentiniai")) {
      if (item.width > 400) {
        newPrice += 60;
        newCost += 60;
      }

      if (item.height > 140) {
        newPrice += 30;
        newCost += 30;
      }
      if (item.height > 165) {
        newPrice += 50;
        newCost += 50;
      }
    } else {
      if (item.width > 400) {
        newPrice += 200;
        newCost += 200;
      }
      if (item.width > 500) {
        newPrice += 120;
        newCost += 120;
      }
      if (item.width > 600) {
        newPrice += 300;
        newCost += 300;
      }
      if (item.width > 700) {
        newPrice += 400;
        newCost += 400;
      }
      if (item.width > 800) {
        newPrice += 300;
        newCost += 300;
      }
    }
  }

  if (item.type === "Kiemo varteliai segmentiniai" && !useBackup.backupExist) {
    if (item.height > 110) {
      newPrice += 20;
      newCost += 20;
    }
    if (item.height > 140) {
      newPrice += 20;
      newCost += 20;
    }
    if (item.height > 165) {
      newPrice += 20;
      newCost += 20;
    }
    if (item.height > 185) {
      newPrice += 20;
      newCost += 20;
    }
  }

  // change price on fence seeThrough
  if (!useBackup.backupExist) {
    if (item.seeThrough === "Aklina") {
      newPrice = +product.price + 3;
      newCost = +product.cost + 2.1;
    }

    if (item.seeThrough === "Vidutiniška") {
      newPrice = +product.price - 3;
      newCost = +product.cost - 2.1;
    }

    if (item.seeThrough === "Pramatoma") {
      newPrice = +product.price - 5;
      newCost = +product.cost - 4.2;
    }

    if (item.seeThrough === "25% Pramatomumas") {
      newPrice = +product.price - 5;
      newCost = +product.cost - 4.2;
    }

    if (item.seeThrough === "50% pramatomumas") {
      newPrice = +product.price - 7;
      newCost = +product.cost - 6.3;
    }
  }

  if (verticals.includes(item.type)) {
    newPrice = +((product.price * item.height) / 100).toFixed(2);
    newCost = +((product.cost * item.height) / 100).toFixed(2);
  }

  // calculate total values
  const totalPrice = +(newPrice * item.quantity).toFixed(2);
  const totalCost = +(newCost * item.quantity).toFixed(2);
  const profit = +(totalPrice - totalCost).toFixed(2);
  const margin = +(Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData: Result = {
    id: uuidv4(),
    type: item.type,
    quantity: +item.quantity.toFixed(2),
    color: item.color || "",
    height: item.height || 0,
    space: item.space || 0,
    twoSided: item.twoSided || "",
    direction: item.direction || "",
    seeThrough: item.seeThrough || "",
    price: newPrice || 0,
    totalPrice: totalPrice,
    cost: newCost || 0,
    totalCost: totalCost,
    profit: profit,
    margin: +margin,
    isNew: false,
    category: product.category,
    width: item.width || null,
  };

  results.results.push(resultData);
}
