import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IBasket {
  content: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected containerBasket: HTMLElement;
  protected totalElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.containerBasket = ensureElement<HTMLElement>(".basket__list", this.container);
    this.totalElement = ensureElement<HTMLElement>(".basket__price", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>(".button basket__button", this.container);

    // Разобраться с обработчиком событий
  }

  set content(items: HTMLElement[]) {
    this.containerBasket.innerHTML = "";
    this.containerBasket.append(...items);
  }

  set total(value: number) {
    this.totalElement.textContent = String(value);
  }
}
