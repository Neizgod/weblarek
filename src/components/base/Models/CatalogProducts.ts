import { IProduct } from "../../../types";

export class CatalogProducts {
  protected _catalog: IProduct[];
  protected _currentProduct: IProduct | null;

  constructor(products: IProduct[]) {
    this._catalog = products;
    this._currentProduct = null;
  }

  saveCatalog(products: IProduct[]): void {
    this._catalog = products;
  }

  get catalog(): IProduct[] {
    return this._catalog;
  }

  getCatalogFromId(id: string): IProduct {
    const result = this._catalog.filter((item) => {
      if (item.id === id) return true;
    });
    if (!result) throw new Error(`Товар с id ${id} не найден`);
    return result[0];
  }

  set currentProduct(product: IProduct) {
    this._currentProduct = product;
  }

  get currentProduct(): IProduct | null {
    return this._currentProduct ? this._currentProduct : null;
  }
}
