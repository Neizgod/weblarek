import { IBuyer, Payment } from "../../types";

export class CustomerData implements IBuyer {
  payment: Payment;
  email: string;
  phone: string;
  address: string;

  constructor() {
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
    this.payment = payment;
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

  validateData():
    | { address?: string; email?: string; phone?: string; payment?: string }
    | true {
    const errors = {} as {
      address?: string;
      email?: string;
      phone?: string;
      payment?: string;
    };

    if (this.address === "") errors.address = "Не заполнено поле адрес";
    if (this.email === "") errors.email = "Не заполнено поле email";
    if (this.phone === "") errors.phone = "Не указан телефон";
    if (this.payment === "") errors.payment = "Не выбран способ оплаты"

    return Object.keys(errors).length > 0 ? errors : true;
  }
}
