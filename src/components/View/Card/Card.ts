import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export class Card<T> extends Component<T> {
  protected priceElement: HTMLElement;
  protected titleElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
  }

  set title(title: string) {
    this.titleElement.textContent = title;
  }

  set price(price: number | null) {
    if (price) this.priceElement.textContent = String(price);
    this.priceElement.textContent = "Бесценно";
  }
}
