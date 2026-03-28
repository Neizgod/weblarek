import { IProduct } from "../../../types";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICardAction } from "../../../types";

type TCardCatalog = Omit<IProduct, "id" | "description">;

export class CardCatalog extends Card<TCardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);

    if (action && action.onClick) {
      this.container.addEventListener("click", action.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title)
  }
}
