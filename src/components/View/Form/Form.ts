import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IFormAction } from "../../../types/index";


export class Form<T> extends Component<T> {
  protected errorsElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, action?: IFormAction) {
    super(container);
    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.container);

    if (action && action.onClick) {
      this.buttonElement.addEventListener("click", action.onClick);
    }
  }

  set textErrors(error: string) {
    this.errorsElement.textContent = error;
  }
}
