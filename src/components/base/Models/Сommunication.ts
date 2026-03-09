import { IObjectForApi, IApi, IProduct } from "../../../types";
import { Api } from "../Api";
import { API_URL } from "../../../utils/constants";

export class Communication extends Api {
  constructor() {
    super(API_URL);
  }

  get<T extends object>() {
    return super.get<T>("/product/");
  }

  postData<T extends object>(data: IObjectForApi): Promise<T> {
    return super.post<T>("/order/", data as object);
  }
}
