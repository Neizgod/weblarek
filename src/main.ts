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

const customerData = new CustomerData();
const shopingCart = new ShopingCart();
const apiBase = new Api(API_URL);
const api = new Communication(apiBase);
const catalogProducts = new CatalogProducts();

api
  .getProducts()
  .then((res) => {
    catalogProducts.setCatalog(res.items);
  })
  .catch((err) => console.log(err));

const eventBroker = new EventEmitter();
eventBroker.on('modal:open', () => {
  modal.render().classList.add('modal_active')
})
eventBroker.on("basket:open", () => {
  modal.content = basket.render()
  eventBroker.emit('modal:open')
});


const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const modalElement = document.querySelector('#modal-container') as HTMLElement;
const headerElement = document.querySelector(".header") as HTMLElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement


const basket = new Basket(eventBroker, cloneTemplate(basketTemplate));
const modal = new Modal(eventBroker, modalElement)
const header = new Header(eventBroker, headerElement)

const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate))

basket.content = [cardBasket.render()]




const template1 = document.querySelector("#basket") as HTMLTemplateElement;
const clone = template1.content.cloneNode(true) as HTMLElement;
