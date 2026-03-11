import "./scss/styles.scss";

import { CustomerData } from "./components/Models/CustomerData";
import { CatalogProducts } from "./components/Models/CatalogProducts";
import { ShopingCart } from "./components/Models/ShopingCart";
import { apiProducts } from "./utils/data";
import { Communication } from "./components/Models/Сommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const products = new CatalogProducts();
products.setCatalog(apiProducts.items);
console.log(`Массив товаров из каталога: `, products.getCatalog());
console.log(
  "Найденный по id товар: ",
  products.getProductFromId("b06cde61-912f-4663-9751-09956c0eed67"),
);
const product1 = products.getProductFromId(
  "b06cde61-912f-4663-9751-09956c0eed67",
);
if (product1) products.setCurrentProduct(product1);
console.log(`Выбранный товар: `, products.getCurrentProduct());

const cart = new ShopingCart();
const product2 = products.getProductFromId(
  "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
);
const product3 = products.getProductFromId(
  "854cef69-976d-4c2a-a18c-2aa45046c390",
);
if (product2 && product3) {
  cart.addProduct(product2);
  cart.addProduct(product3);
}
console.log("Что в корзине: ", cart.getContents());
console.log("Стоимость товаров в корзине: ", cart.getPriceProducts());
console.log("Количество товаров в корзине: ", cart.getQuantity());
console.log(
  "В корзине ли товар? : ",
  cart.isInTheCart("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"),
);
if (product3) cart.deleteProduct(product3);
console.log("Что в корзине после удаления 1 элемента: ", cart.getContents());
cart.cleanCart();
console.log("Что в корзине после очистки: ", cart.getContents());

const customer = new CustomerData();
console.log(`Ошибки незаполненной формы: `, customer.validateData());
customer.setAddress("Город");
customer.setEmail("test@MediaList.ru");
console.log(`Ошибки частично заполненной формы: `, customer.validateData());
customer.setPhone("32049234");
customer.setPayment("cash");
console.log(
  `Пройдена ли проверка полностью заполненной формы: `,
  customer.validateData(),
);
console.log(`Данные заполненной формы: `, customer.getData());
customer.cleanData();
console.log(`Ошибки формы после очистки данных: `, customer.validateData());

const apiBase = new Api(API_URL);
const api = new Communication(apiBase);
const testProducts = new CatalogProducts();
api.getProducts()
  .then((res) => {
    testProducts.setCatalog(res.items);
    console.log(
      `Выводим полученные с сервера товары: `,
      testProducts.getCatalog(),
    );
  })
  .catch(console.error);
