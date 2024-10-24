export default function getPriceItem(name: string) {
  const useBackup = useBackupStore();
  const products = useProductsStore();

  if (useBackup.backupExist) {
    let oldProduct: any;

    oldProduct = useBackup.results.find((item) => item.type === name);

    if (!oldProduct)
      oldProduct = useBackup.works.find((item) => item.name === name);

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
    return (
      products.products.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      ) ||
      products.products.find((product) => product.name.includes(name)) ||
      null
    );
  }
}
