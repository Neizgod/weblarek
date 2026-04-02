import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IBuyer, Payment } from "../../../types";
import { IEvents } from "../../base/Events";

type IFormOrder = {
  buttonState: boolean;
  activeButton: Payment | null;
  payment: Payment;
  textErrors: string;
} & Pick<IBuyer, "address">;

export class FormOrder extends Form<IFormOrder> {
  protected paymentOnlineButton: HTMLButtonElement;
  protected paymentCashButton: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.paymentOnlineButton = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
    this.paymentCashButton = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
    this.addressElement = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);

    this.paymentOnlineButton.addEventListener("click", () => {
      this.events.emit("form:selectPayment", { payment: "card" });
    });

    this.paymentCashButton.addEventListener("click", () => {
      this.events.emit("form:selectPayment", { payment: "cash" });
    });

    this.addressElement.addEventListener("input", () =>
      this.events.emit("form:changeAddress", { address: this.addressElement.value }),
    );

    this.buttonElement.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("form: openContacts");
    });
  }

  set buttonContinueState(value: boolean) {
    this.buttonElement.disabled = !value;
  }

  set activeButton(value: Payment | null) {
    if (value === "card") {
      this.paymentOnlineButton.classList.add("button_alt-active");
      this.paymentCashButton.classList.remove("button_alt-active");
      return;
    }

    if (value === "cash") {
      this.paymentCashButton.classList.add("button_alt-active");
      this.paymentOnlineButton.classList.remove("button_alt-active");
      return;
    }
  }
  cleanData() {
    this.paymentCashButton.classList.remove("button_alt-active");
    this.paymentOnlineButton.classList.remove("button_alt-active");
    this.addressElement.value = "";
  }
}
