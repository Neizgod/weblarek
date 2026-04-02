import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IBuyer } from "../../../types";
import { IEvents } from "../../base/Events";

type IFormContacts = {
  textErrors: string;
  buttonState: boolean;
} & Pick<IBuyer, "email" | "phone">;

export class FormContacts extends Form<IFormContacts> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.emailElement = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
    this.phoneElement = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

    this.emailElement.addEventListener("change", () => {
      this.events.emit("form:changeEmail", { email: this.emailElement.value });
    });

    this.phoneElement.addEventListener("change", () => {
      this.events.emit("form:changePhone", { phone: this.phoneElement.value });
    });

    this.buttonElement.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("form: startShopping");
    });
  }
  set buttonState(value: boolean) {
    this.buttonElement.disabled = !value;
  }
}
