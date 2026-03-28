import { IProduct } from "../../../types";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICardAction } from "../../../types";

type TCardPreview = Omit<IProduct, 'id'> & { buttonText: string };

export class CardPreview extends Card<TCardPreview> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.descriptionElement = ensureElement<HTMLImageElement>(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(".card__button", this.container);

    if (action && action.onClick) {
      this.container.addEventListener("click", action.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }

  set image(value: string) {
    this.imageElement.src = value;
  }

  set description(description: string) {
    this.descriptionElement.textContent = description;
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }
}
