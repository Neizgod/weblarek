import { IProduct } from "../../types";

export class CatalogProducts {
  protected catalog: IProduct[];
  protected currentProduct: IProduct | null;

  constructor() {
    this.catalog = [];
    this.currentProduct = null;
  }

  setCatalog(products: IProduct[]): void {
    this.catalog = products;
  }

  getCatalog(): IProduct[] {
    return this.catalog;
  }

  getProductFromId(id: string): IProduct | undefined {
    const result = this.catalog.find((item) => {
      if (item.id === id) return true;
    });
    if (!result) return undefined;
    return result;
  }

  setCurrentProduct(product: IProduct) {
    this.currentProduct = product;
  }

  getCurrentProduct(): IProduct | null {
    return this.currentProduct;
  }
}
