import { IProduct } from "../../../types";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICardAction } from "../../../types";
import { CDN_URL, categoryMap } from "../../../utils/constants";

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
    if(value in categoryMap) this.categoryElement.classList.add((categoryMap as any)[value])
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }
}
