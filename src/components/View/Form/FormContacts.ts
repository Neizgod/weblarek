import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IBuyer, IFormAction } from "../../../types";

type IFormContacts = {
  textErrors: string;
} & Pick<IBuyer, "email" | "phone">;

export class FormContacts extends Form<IFormContacts> {
  protected emailElement: HTMLElement;
  protected phoneElement: HTMLElement;

  constructor(container: HTMLElement, action?: IFormAction) {
    super(container);
    this.emailElement = ensureElement<HTMLElement>('.form__input[name="email"]', this.container);
    this.phoneElement = ensureElement<HTMLElement>('.form__input[name="phone"]', this.container);
  }
}
