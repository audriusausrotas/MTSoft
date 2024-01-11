import type { Product } from "~/data/interfaces";

export default function getPriceItem(name: string) {
  const products = useProductsStore().products;

  const productList: Product[] = products.filter((productItem) =>
    productItem.name.includes(name)
  );

  return productList[0];
}
