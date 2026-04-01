import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class CatalogProducts {
  protected catalog: IProduct[];
  protected currentProduct: IProduct | null;

  constructor(protected events: IEvents) {
    this.catalog = [];
    this.currentProduct = null;
  }

  setCatalog(products: IProduct[]): void {
    const lastProducts = this.catalog;
    this.catalog = products;
    if (lastProducts !== products) this.events.emit("catalog:changed");
  }

  getCatalog(): IProduct[] {
    return this.catalog;
  }

  getProductFromId(id: string): IProduct | undefined {
    return this.catalog.find((item) => item.id === id);
  }

  setCurrentProduct(product: IProduct) {
    this.currentProduct = product;
    this.events.emit("card:changedCurrentProduct");
  }

  getCurrentProduct(): IProduct | null {
    return this.currentProduct;
  }
}
