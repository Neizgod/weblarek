import { IProduct } from "../../../types";

export class ShopingCart {
  protected _contents: IProduct[];

  constructor() {
    this._contents = [];
  }

  getContents(): IProduct[] | null {
    if (this._contents.length === 0) return null;
    return this._contents;
  }

  addProduct(product: IProduct): void {
    this._contents.push(product);
  }

  deleteProduct(product: IProduct): void {
    const indexEl = this._contents.findIndex((item) => item.id === product.id);
    this._contents.splice(indexEl, 1);
  }

  cleanCart(): void {
    this._contents.splice(0);
  }

  getPriceProducts(): number {
    return this._contents.reduce(
      (accumulator, item) => (item.price ?? 0) + accumulator,
      0,
    );
  }

  getQuantity(): number {
    return this._contents.length;
  }

  isInTheCart(id: string): boolean {
    const res = this._contents.findIndex((item) => item.id === id);
    if (res === -1) return false;
    return true;
  }
}
