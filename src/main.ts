import "./scss/styles.scss";

import { CustomerData } from "./components/base/Models/CustomerData";
import { CatalogProducts } from "./components/base/Models/CatalogProducts";
import { ShopingCart } from "./components/base/Models/ShopingCart";
import { apiProducts } from "./utils/data";
import { Communication } from "./components/base/Models/Сommunication";
import { IProduct } from "./types";

const Products = new CatalogProducts();
Products.setCatalog(apiProducts.items);
console.log(`Массив товаров из каталога: `, Products.getCatalog());
console.log("Найденный по id товар: ", Products.getProductFromId("b06cde61-912f-4663-9751-09956c0eed67"));
Products.setCurrentProduct(Products.getProductFromId("b06cde61-912f-4663-9751-09956c0eed67"));
console.log(`Выбранный товар: `, Products.getCurrentProduct());

const Cart = new ShopingCart();
Cart.addProduct(Products.getProductFromId("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
Cart.addProduct(Products.getProductFromId("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Что в корзине: ", Cart.getContents());
console.log("Стоимость товаров в корзине: ", Cart.getPriceProducts());
console.log("Количество товаров в корзине: ", Cart.getQuantity());
console.log("В корзине ли товар? : ", Cart.isInTheCart("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
Cart.deleteProduct(Products.getProductFromId("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Что в корзине после удаления: ", Cart.getContents());
Cart.cleanCart();
console.log("Что в корзине после очистки: ", Cart.getContents());

const Customer = new CustomerData();
console.log(`Ошибки незаполненной формы: `, Customer.validateData());
Customer.setAddress("Город");
Customer.setEmail("test@MediaList.ru");
console.log(`Ошибки частично заполненной формы: `, Customer.validateData());
Customer.setPhone("32049234");
Customer.setPayment("cash");
console.log(`Пройдена ли проверка полностью заполненной формы: `, Customer.validateData());
console.log(`Данный заполненной формы: `, Customer.getData());
Customer.cleanData();
console.log(`Ошибки формы после очистки данных: `, Customer.validateData());

const Api = new Communication();
const TestProducts = new CatalogProducts();
let res = await Api.get() as { items: IProduct[] };
TestProducts.setCatalog(res.items);
console.log(`Выводим полученные с сервера товары: `, TestProducts.getCatalog())
