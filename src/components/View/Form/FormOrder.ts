import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IBuyer, IFormAction, Payment } from "../../../types";
import { IEvents } from "../../base/Events";

type IFormOrder = {
  textErrors: string;
  buttonContinueState: boolean;
  activeButton: Payment;
  payment: Payment;
} & Pick<IBuyer, "address">;

export class FormOrder extends Form<IFormOrder> {
  protected paymentOnlineButton: HTMLButtonElement;
  protected paymentCashButton: HTMLButtonElement;
  protected addressElement: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.paymentOnlineButton = ensureElement<HTMLButtonElement>(
      '.button[name="card"]',
      this.container,
    );
    this.paymentCashButton = ensureElement<HTMLButtonElement>(
      '.button[name="cash"]',
      this.container,
    );
    this.addressElement = ensureElement<HTMLElement>(
      '.form__input[name="address"]',
      this.container,
    );

    this.paymentOnlineButton.addEventListener("click", () => {
      this.events.emit("form:selectPayment", { payment: "card" });
    });

    this.paymentCashButton.addEventListener("click", () => {
      this.events.emit("form:selectPayment", { payment: "cash" });
    });
  }

  set buttonContinueState(value: boolean) {
    this.buttonElement.disabled = !value;
  }

  set activeButton(value: Payment) {
    if (value === "card") {
      this.paymentOnlineButton.classList.add("button_alt-active");
      this.paymentCashButton.classList.remove("button_alt-active");
    }

    if (value === "cash") {
      this.paymentCashButton.classList.add("button_alt-active");
      this.paymentOnlineButton.classList.remove("button_alt-active");
    }
  }
}
