import getPriceItem from "~/utils/getPriceItem";
import type { Result, Product } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";
import { verticals } from "~/data/selectFieldData";

export default function createResultElement(item: any) {
  const results = useResultsStore().results;
  const product: Product = getPriceItem(item.type);

  let newPrice: number = Number(product.price);
  let newCost: number = Number(product.cost);

  if (verticals.includes(item.type)) {
    newPrice = +((product.price * item.height) / 100).toFixed(2);
    newCost = +((product.cost * item.height) / 100).toFixed(2);
  }

  // change gate prices
  if (item.type.includes("vartai")) {
    if (item.width > 400) {
      newPrice += 200;
      newCost += 200;
    }
    if (item.width > 500) {
      newPrice += 120;
      newCost += 120;
    }
    if (item.width > 600) {
      newPrice += 200;
      newCost += 200;
    }
    if (item.width > 700) {
      newPrice += 200;
      newCost += 200;
    }
  }

  // change price on fence seeThrough
  if (item.seeThrough === "Vidutiniška") {
    newPrice = product.price - 3;
  }

  if (item.seeThrough === "Pramatoma") {
    newPrice = product.price - 5;
  }

  if (item.seeThrough === "25% Pramatomumas") {
    newPrice = product.price - 5;
  }

  if (item.seeThrough === "50% pramatomumas") {
    newPrice = product.price - 7;
  }

  // calculate total values
  const totalPrice = newPrice * item.quantity;
  const totalCost = product.cost * item.quantity;
  const profit = totalPrice - totalCost;
  const margin = (Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData: Result = {
    id: uuidv4(),
    type: item.type,
    quantity: item.quantity,
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
  };

  results.push(resultData);
}
