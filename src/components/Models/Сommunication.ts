import { IObjectForApi, IApi, IProduct } from "../../types";

export class Communication {
  protected api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<{total: number; items: IProduct[]}> {
    const res = await this.api.get<{total: number; items: IProduct[]}>("/product/");

    return res;
  }

  async postData(data: IObjectForApi): Promise<{ id: string; total: number }> {
    const res = await this.api.post<{ id: string; total: number }>(
      "/order/",
      data,
    );

    return res;
  }
}
