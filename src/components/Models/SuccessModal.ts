import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface ISuccessModal {
  total: number;
}

export class SuccessModal extends Component<ISuccessModal> {
  protected totalElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.totalElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.successButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);

    //  разобраться с собработкой события
  }

  set total(value: number) {
    this.totalElement.textContent = String(value);

  }
}
