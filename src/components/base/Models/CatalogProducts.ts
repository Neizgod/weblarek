import { IProduct } from "../../../types";

export class CatalogProducts {
  protected _catalog: IProduct[];
  protected _currentProduct: IProduct | null;

  constructor() {
    this._catalog = [];
    this._currentProduct = null;
  }

  setCatalog(products: IProduct[]): void {
    for (let i of products){
      this._catalog.push(i)
    }
  }

  getCatalog(): IProduct[] {
    return this._catalog;
  }

  getProductFromId(id: string): IProduct {
    const result = this._catalog.filter((item) => {
      if (item.id === id) return true;
    });
    if (!result) throw new Error(`Товар с id ${id} не найден`);
    return result[0];
  }

  setCurrentProduct(product: IProduct) {
    this._currentProduct = product;
  }

  getCurrentProduct(): IProduct | null {
    return this._currentProduct ? this._currentProduct : null;
  }
}
