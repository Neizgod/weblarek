import { IObjectForApi, IApi, IProduct } from "../../types";
import { Api } from "../base/Api";
import { API_URL } from "../../utils/constants";

export class Communication {
  protected api: Api;
  constructor() {
    this.api = new Api(API_URL);
  }

async get(): Promise<IProduct[]> {
  const res = await this.api.get("/product/");

  if (res && typeof res === 'object' && 'items' in res && Array.isArray(res.items)) {
    return res.items;
  }

  return [];
}

  async postData(data: IObjectForApi): Promise<{id: string, total: number}> {
    const res = await this.api.post("/order/", data as object);
    return res as {id: string, total: number}
  }
}
