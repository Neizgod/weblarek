import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
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

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) this.events.emit('modal:close');
    })

    this.closeButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    })
  }

  set content(items: HTMLElement) {
    this.modalContainer.innerHTML = "";
    this.modalContainer.append(items);
  }
}
