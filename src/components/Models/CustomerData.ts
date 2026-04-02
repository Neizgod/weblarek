import { IBuyer, Payment } from "../../types";
import { IEvents } from "../base/Events";

export class CustomerData implements IBuyer {
  payment: Payment;
  email: string;
  phone: string;
  address: string;

  constructor( protected events: IEvents) {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setPayment(payment: Payment): void {
    console.log('ESSS')
    this.payment = payment;
    this.events.emit('customerData: changed')
  }

  cleanData(): void {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
  }

  getData(): IBuyer {
    return {
      address: this.address,
      email: this.email,
      phone: this.phone,
      payment: this.payment,
    };
  }

  validateData(): { isValid: boolean; address?: string; email?: string; phone?: string; payment?: string } {
    const res = {} as {
      address?: string;
      email?: string;
      phone?: string;
      payment?: string;
      isValid: boolean;
    };

    if (this.address === "") res.address = "Не заполнено поле адрес";
    if (this.email === "") res.email = "Не заполнено поле email";
    if (this.phone === "") res.phone = "Не указан телефон";
    if (this.payment === "") res.payment = "Не выбран способ оплаты";

    Object.keys(res).length > 1 ? res.isValid = false : res.isValid = true;

    return res
  }
}
