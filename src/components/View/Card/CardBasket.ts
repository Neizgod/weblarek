import { IProduct } from "../../../types";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICardAction } from "../../../types";

type TCardBasket = Pick<IProduct, "title" | "price"> & { index: number };

export class CardBasket extends Card<TCardBasket> {
  protected indexElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

    if (action && action.onClick) {
      this.cardButton.addEventListener("click", action.onClick);
    }
  }

  set index(value: string) {
    this.indexElement.textContent = value;
  }
}
