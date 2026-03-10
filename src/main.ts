import "./scss/styles.scss";

import { CustomerData } from "./components/Models/CustomerData";
import { CatalogProducts } from "./components/Models/CatalogProducts";
import { ShopingCart } from "./components/Models/ShopingCart";
import { apiProducts } from "./utils/data";
import { Communication } from "./components/Models/Сommunication";
import { IProduct } from "./types";

const products = new CatalogProducts();
products.setCatalog(apiProducts.items);
console.log(`Массив товаров из каталога: `, products.getCatalog());
console.log(
  "Найденный по id товар: ",
  products.getProductFromId("b06cde61-912f-4663-9751-09956c0eed67"),
);
products.setCurrentProduct(
  products.getProductFromId("b06cde61-912f-4663-9751-09956c0eed67") as IProduct,
);
console.log(`Выбранный товар: `, products.getCurrentProduct());

const cart = new ShopingCart();
cart.addProduct(
  products.getProductFromId("412bcf81-7e75-4e70-bdb9-d3c73c9803b7") as IProduct,
);
cart.addProduct(
  products.getProductFromId("854cef69-976d-4c2a-a18c-2aa45046c390") as IProduct,
);
console.log("Что в корзине: ", cart.getContents());
console.log("Стоимость товаров в корзине: ", cart.getPriceProducts());
console.log("Количество товаров в корзине: ", cart.getQuantity());
console.log(
  "В корзине ли товар? : ",
  cart.isInTheCart("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"),
);
cart.deleteProduct(
  products.getProductFromId("854cef69-976d-4c2a-a18c-2aa45046c390") as IProduct,
);
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

const api = new Communication();
const testProducts = new CatalogProducts();
async function init() {
  const res = await api.get();
  return res;
}

init().then(res => {
    testProducts.setCatalog(res);
    console.log(`Выводим полученные с сервера товары: `, testProducts.getCatalog());
  }).catch(console.error);


