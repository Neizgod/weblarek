import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShopingCart {
  protected _contents: IProduct[];

  constructor(protected events: IEvents) {
    this._contents = [];
  }

  getContents(): IProduct[] {
    return this._contents;
  }

  addProduct(product: IProduct): void {
    this._contents.push(product);
    this.events.emit("basket:changedContent");
  }

  deleteProduct(product: IProduct): void {
    const indexEl = this._contents.findIndex((item) => item.id === product.id);
    if (indexEl !== -1) this._contents.splice(indexEl, 1);

    this.events.emit("basket:changedContent");
  }

  cleanCart(): void {
    this._contents.splice(0);
    this.events.emit("basket:changedContent");
  }

  getPriceProducts(): number {
    return this._contents.reduce((accumulator, item) => (item.price ?? 0) + accumulator, 0);
  }

  getQuantity(): number {
    return this._contents.length;
  }

  isInTheCart(id: string): boolean {
    return this._contents.some((item) => item.id === id);
  }
}
