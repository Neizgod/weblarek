import "./scss/styles.scss";
import { CustomerData } from "./components/Models/CustomerData";
import { CatalogProducts } from "./components/Models/CatalogProducts";
import { ShopingCart } from "./components/Models/ShopingCart";
import { Communication } from "./components/Models/Сommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { CardCatalog } from "./components/View/Card/CardCatalog";
import { CardPreview } from "./components/View/Card/CardPreview";
import { CardBasket } from "./components/View/Card/CardBasket";
import { FormContacts } from "./components/View/Form/FormContacts";
import { FormOrder } from "./components/View/Form/FormOrder";
import { Basket } from "./components/View/Basket";
import { EventEmitter } from "./components/base/Events";
import { cloneTemplate } from "./utils/utils";
import { Modal } from "./components/View/Modal";
import { Header } from "./components/View/Header";
import { Gallery } from "./components/View/Gallery";
import { IProduct } from "./types";

const eventBroker = new EventEmitter();
const customerData = new CustomerData();
const shopingCart = new ShopingCart();
const apiBase = new Api(API_URL);
const api = new Communication(apiBase);
const catalogProducts = new CatalogProducts(eventBroker);

const basketTemplate = document.querySelector("#basket") as HTMLTemplateElement;
const modalElement = document.querySelector("#modal-container") as HTMLElement;
const headerElement = document.querySelector(".header") as HTMLElement;
const cardCatalogTemplate = document.querySelector("#card-catalog") as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector("#card-basket") as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector("#card-preview") as HTMLTemplateElement;

const basketView = new Basket(eventBroker, cloneTemplate(basketTemplate));
const modal = new Modal(eventBroker, modalElement);
const header = new Header(eventBroker, headerElement);
const gallery = new Gallery(document.documentElement);

api
  .getProducts()
  .then((res) => {
    catalogProducts.setCatalog(res.items);
  })
  .catch((err) => console.log(err));

eventBroker.on("modal:open", () => {
  modal.render().classList.add("modal_active");
});

eventBroker.on("basket:open", () => {
  modal.content = basketView.render();
  eventBroker.emit("modal:open");
});

eventBroker.on("modal:close", () => {
  modal.render().classList.remove("modal_active");
});

eventBroker.on("catalog:changed", () => {
  const cards = catalogProducts.getCatalog().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => eventBroker.emit("card:select", item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: cards });
});

eventBroker.on("card:select", (item: IProduct) => {
  catalogProducts.setCurrentProduct(item);
});

eventBroker.on("card:renderPreview", () => {
  const product = catalogProducts.getCurrentProduct();
  if (product) {
    const card = new CardPreview(eventBroker, cloneTemplate(cardPreviewTemplate));
    modal.render({ content: card.render(product) });
    modal.render().classList.add("modal_active");
  }
});

eventBroker.on("card:addToBasket&removeFromBasket", () => {
  const product = catalogProducts.getCurrentProduct();

  if (product && !shopingCart.isInTheCart(product.id)) {
    shopingCart.addProduct(product);
    const cardsBasket = shopingCart.getContents().map((item) => {
      const card = new CardBasket(cloneTemplate(cardBasketTemplate));
      const cardBasketData = Object.assign(item);
      cardBasketData.index = shopingCart.getContents().indexOf(item) + 1;
      return card.render(item);
    });

    header.render({ counter: shopingCart.getQuantity() });
    
    // TODO ИЗМЕНИТЬ ТЕКСТ В КНОПКЕ КАРТЫ ПРЕВЬЮ

    const total = shopingCart.getPriceProducts();
    basketView.render({ content: cardsBasket, total: total });

  }else {
    // TODO Обработать удаление из корзины
  }
});
