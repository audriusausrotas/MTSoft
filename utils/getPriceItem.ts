export default function getPriceItem(name: string) {
  const backupStore = useBackupStore();
  const products = useProductsStore();

  if (backupStore.backupExist) {
    let oldProduct: any;

    oldProduct = backupStore.results.find((item) => item.type === name);

    if (!oldProduct) oldProduct = backupStore.works.find((item) => item.name === name);

    if (!oldProduct) {
      return findProduct();
    } else {
      const returnProduct: any = {
        _id: oldProduct.id,
        name: oldProduct.type ? oldProduct.type : oldProduct.name,
        price: oldProduct.price,
        cost: oldProduct.cost,
        category: oldProduct.category,
        image: "",
      };
      return returnProduct;
    }
  } else {
    return findProduct();
  }

  function findProduct() {
    return products.products.find(
      (product) => product.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  }
}
