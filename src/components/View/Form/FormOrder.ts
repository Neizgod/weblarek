import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IBuyer, IFormAction, Payment } from "../../../types";

type IFormOrder = {
  textErrors: string;
} & Payment &
  Pick<IBuyer, "address">;

export class FormOrder extends Form<IFormOrder> {
  protected paymentOnlineButton: HTMLButtonElement;
  protected paymentCashButton: HTMLButtonElement;
  protected addressElement: HTMLElement;

  constructor(container: HTMLElement, action?: IFormAction) {
    super(container);
    this.paymentOnlineButton = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
    this.paymentCashButton = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
    this.addressElement = ensureElement<HTMLElement>('.form__input[name="address"]', this.container);

    if (action && action.onClick) {
      this.paymentOnlineButton.addEventListener("click", action.onClick);
      this.paymentCashButton.addEventListener("click", action.onClick);
    }
  }
}
