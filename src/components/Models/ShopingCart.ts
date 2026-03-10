import { IProduct } from "../../types";

export class ShopingCart {
  protected _contents: IProduct[];

  constructor() {
    this._contents = [];
  }

  getContents(): IProduct[] {
    return this._contents;
  }

  addProduct(product: IProduct): void {
    this._contents.push(product);
  }

  deleteProduct(product: IProduct): void | undefined {
    const indexEl = this._contents.findIndex((item) => item.id === product.id);
    if (indexEl === -1) return undefined
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
    return this._contents.some(item => item.id === id);
  }
}
