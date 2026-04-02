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
import { IObjectForApi, IProduct, Payment } from "./types";
import { SuccessModal } from "./components/Models/SuccessModal";

const eventBroker = new EventEmitter();
const customerData = new CustomerData(eventBroker);
const shopingCart = new ShopingCart(eventBroker);
const apiBase = new Api(API_URL);
const api = new Communication(apiBase);
const catalogProducts = new CatalogProducts(eventBroker);

const basketTemplate = document.querySelector("#basket") as HTMLTemplateElement;
const modalElement = document.querySelector("#modal-container") as HTMLElement;
const headerElement = document.querySelector(".header") as HTMLElement;
const cardCatalogTemplate = document.querySelector("#card-catalog") as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector("#card-basket") as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector("#card-preview") as HTMLTemplateElement;
const formOrderTemplate = document.querySelector("#order") as HTMLTemplateElement;
const formContactsTemplate = document.querySelector("#contacts") as HTMLTemplateElement;
const successModalTemplate = document.querySelector("#success") as HTMLTemplateElement;

const basketView = new Basket(eventBroker, cloneTemplate(basketTemplate));
const modal = new Modal(eventBroker, modalElement);
const header = new Header(eventBroker, headerElement);
const gallery = new Gallery(document.documentElement);
const cardPreview = new CardPreview(eventBroker, cloneTemplate(cardPreviewTemplate));
const formOrder = new FormOrder(eventBroker, cloneTemplate(formOrderTemplate));
const formContacts = new FormContacts(eventBroker, cloneTemplate(formContactsTemplate));
const successModal = new SuccessModal(eventBroker, cloneTemplate(successModalTemplate));

function validateFormOrder(): { isValid: boolean; payment?: string; address?: string } {
  let isValid;
  const errors = customerData.validateData();
  if (errors.payment || errors.address) {
    isValid = false;
    const payment = errors.payment;
    const address = errors.address;
    return { isValid, payment, address };
  } else {
    isValid = true;
    return { isValid };
  }
}

function validateFormContacts(): { isValid: boolean; email?: string; phone?: string } {
  const data = customerData.validateData();
  const isValid = data.isValid;
  if (!isValid) {
    const email = data.email;
    const phone = data.phone;
    return { isValid, email, phone };
  }
  return { isValid };
}

function openModal(): void {
  modal.render().classList.add("modal_active");
}

function closeModal() {
  modal.render().classList.remove("modal_active");
}

api
  .getProducts()
  .then((res) => {
    catalogProducts.setCatalog(res.items);
  })
  .catch((err) => console.log(err));

eventBroker.on("basket:open", () => {
  modal.render({ content: basketView.render() });
  openModal();
});

eventBroker.on("modal:close", () => {
  closeModal();
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

eventBroker.on("catalog:changedCurrentProduct", () => {
  const product = catalogProducts.getCurrentProduct();
  if (product)
    if (!shopingCart.isInTheCart(product.id)) {
      const cardData = Object.assign(product);
      if (product.price) cardData.buttonText = "Купить";
      modal.render({ content: cardPreview.render(cardData) });
    } else {
      const cardData = Object.assign(product);
      if (product.price) cardData.buttonText = "Удалить из корзины";
      modal.render({ content: cardPreview.render(cardData) });
    }
  openModal();
});

eventBroker.on("basket:changedContent", () => {
  const count = shopingCart.getQuantity();
  header.render({ counter: count });
  const cardsBasket = shopingCart.getContents().map((item) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => eventBroker.emit("basket:deleteItem", item),
    });
    const cardBasketData = Object.assign(item);
    cardBasketData.index = shopingCart.getContents().indexOf(item) + 1;
    return card.render(item);
  });
  const total = shopingCart.getPriceProducts();
  basketView.render({
    content: cardsBasket,
    total: total,
    buttonState: total ? false : true,
  });
});

eventBroker.on("basket:deleteItem", (product: IProduct) => {
  shopingCart.deleteProduct(product);
});

eventBroker.on("basket:deleteItemFromPreview", () => {
  const product = catalogProducts.getCurrentProduct();
  if (product) shopingCart.deleteProduct(product);
  closeModal();
});

eventBroker.on("card:addToBasket", () => {
  const product = catalogProducts.getCurrentProduct();
  if (product && !shopingCart.isInTheCart(product.id)) {
    shopingCart.addProduct(product);
  }
  closeModal();
});

eventBroker.on("form: openOrder", () => {
  const validateForm = validateFormOrder();

  modal.render({
    content: formOrder.render({
      buttonContinueState: validateForm.isValid,
    }),
  });
});

eventBroker.on("form:selectPayment", (value: { payment: Payment }) => {
  customerData.setPayment(value.payment);
});

eventBroker.on("customerData: paymentOrAddressChanged", () => {
  const validateForm = validateFormOrder();
  let errorsMessage = "";
  if (validateForm.address || validateForm.payment) {
    if (validateForm.address) errorsMessage = validateForm.address;
    if (validateForm.payment)
      errorsMessage = errorsMessage ? errorsMessage + ", " + validateForm.payment : validateForm.payment;
  }
  modal.render({
    content: formOrder.render({
      buttonContinueState: validateForm.isValid,
      activeButton: customerData.getData().payment,
      textErrors: errorsMessage,
    }),
  });
});

eventBroker.on("form:changeAddress", (value: { address: string }) => {
  customerData.setAddress(value.address);
});

eventBroker.on("form: openContacts", () => {
  const validateForm = validateFormContacts();

  modal.render({
    content: formContacts.render({
      buttonState: validateForm.isValid,
    }),
  });
});

eventBroker.on("form:changeEmail", (value: { email: string }) => {
  customerData.setEmail(value.email);
});

eventBroker.on("form:changePhone", (value: { phone: string }) => {
  customerData.setPhone(value.phone);
});

eventBroker.on("customerData: emailOrPhoneChanged", () => {
  const validateForm = validateFormContacts();
  let errorsMessage = "";
  if (!validateForm.isValid) {
    if (validateForm.email) errorsMessage = validateForm.email;

    if (validateForm.phone)
      errorsMessage = errorsMessage ? errorsMessage + ", " + validateForm.phone : validateForm.phone;
  }
  modal.render({
    content: formContacts.render({
      buttonState: validateForm.isValid,
      textErrors: errorsMessage,
    }),
  });
});

eventBroker.on("form: startShopping", async () => {
  const data: IObjectForApi = {
    address: "",
    email: "",
    payment: "",
    phone: "",
    total: 0,
    items: [],
  };
  const dataCustomer = customerData.getData();
  const items = shopingCart.getContents();
  Object.assign(data, dataCustomer);
  data.total = shopingCart.getPriceProducts();
  data.items = items.map((item) => item.id);
  try {
    const purchaseResult: { id: string; total: number } = await api.postData(data);
    shopingCart.cleanCart();
    customerData.cleanData();
    modal.render({ content: successModal.render({ total: purchaseResult.total }) });
  } catch (err) {
    console.log(err);
  }
});
