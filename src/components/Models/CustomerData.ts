import { IBuyer, Payment } from "../../types";
import { IEvents } from "../base/Events";

export class CustomerData implements IBuyer {
  payment: Payment;
  email: string;
  phone: string;
  address: string;

  constructor(protected events: IEvents) {
    this.address = "";
    this.email = "";
    this.phone = "";
    this.payment = "";
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit("customerData: paymentOrAddressChanged");
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit("customerData: emailOrPhoneChanged");
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit("customerData: emailOrPhoneChanged");
  }

  setPayment(payment: Payment): void {
    this.payment = payment;
    this.events.emit("customerData: paymentOrAddressChanged");
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
    const errors = {} as {
      address?: string;
      email?: string;
      phone?: string;
      payment?: string;
    };

    if (this.address === "") errors.address = "Не заполнено поле адрес";
    if (this.email === "") errors.email = "Не заполнено поле email";
    if (this.phone === "") errors.phone = "Не указан телефон";
    if (this.payment === "") errors.payment = "Не выбран способ оплаты";

    const isValid = Object.keys(errors).length === 0;

    return { isValid, ...errors };
  }
}
