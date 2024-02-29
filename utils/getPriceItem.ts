import type { Product } from "~/data/interfaces";

export default function getPriceItem(name: string) {
  const products = useProductsStore().products;

  console.log(name);

  const productList: Product[] = products.filter((productItem) =>
    productItem.name.includes(name)
  );

  console.log(productList);

  return productList[0];
}
