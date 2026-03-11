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

  getProductFromId(id: string): IProduct | undefined{
    return this.catalog.find((item) => item.id === id);
  }

  setCurrentProduct(product: IProduct) {
    this.currentProduct = product;
  }

  getCurrentProduct(): IProduct | null {
    return this.currentProduct;
  }
}
