import { IProduct } from "../../../types";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { IEvents } from "../../base/Events";

type TCardPreview = Omit<IProduct, "id"> & { buttonText: "Удалить из корзины" | "Купить" };

export class CardPreview extends Card<TCardPreview> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.descriptionElement = ensureElement<HTMLImageElement>(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(".card__button", this.container);

  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = "";
    this.categoryElement.classList.add("card__category");
    if (value in categoryMap) this.categoryElement.classList.add((categoryMap as any)[value]);
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }

  set description(description: string) {
    this.descriptionElement.textContent = description;
  }

  set buttonText(value: "Удалить из корзины" | "Купить") {
    if (value === "Удалить из корзины") this.cardButton.onclick = () => this.events.emit("basket:deleteItemFromPreview")
    if (value === "Купить") this.cardButton.onclick = () => this.events.emit("card:addToBasket")
    this.cardButton.textContent = value;
  }

  set price(price: number | null) {
    if (price) {
      this.priceElement.textContent = String(price) + " синапсов";
      this.cardButton.disabled = false;
      return;
    }
    this.priceElement.textContent = "Бесценно";
    this.cardButton.textContent = 'Недоступно'
    this.cardButton.disabled = true;
  }
}
