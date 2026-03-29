import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement[];
}

export class Modal extends Component<IModal> {
  protected modalContainer: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.modalContainer = ensureElement<HTMLElement>(".modal__content", this.container);
    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);

    //  разобраться с собработкой события
  }

  set content(items: HTMLElement[]) {
    this.modalContainer.innerHTML = "";
    this.modalContainer.append(...items);
  }
}
